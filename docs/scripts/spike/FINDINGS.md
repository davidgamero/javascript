# Investigation: deriving docs API metadata from the spec

**Status:** investigation only. Nothing here is wired into the docs build. The
spike lives at `docs/scripts/spike/derive-api-metadata.mjs`; run it with
`node docs/scripts/spike/derive-api-metadata.mjs` (needs `src/gen/swagger.json`,
which is generated and gitignored — run `./generate-client.sh` first).

## Question

`docs/scripts` carries several hand-maintained maps. Can they be derived from
`src/gen/swagger.json` or the generated TypeScript instead?

| Map                 | File                         | Shape                                  |
| ------------------- | ---------------------------- | -------------------------------------- |
| `SPECIAL_CLASSES`   | `extract-api-groups.mjs:81`  | 8 class names → group/version/category |
| `CATEGORY_BY_GROUP` | `extract-api-groups.mjs:19`  | 21 group tokens → display category     |
| `GROUP_MAP`         | `generate-models.mjs:153`    | 6 categories → regex over model names  |
| `MODEL_GROUP_MAP`   | `transform-gen-docs.mjs:432` | same 6 regexes, keyed by slug          |

## Answers

| Map                             | Derivable?                         | Basis                                                                |
| ------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| `SPECIAL_CLASSES`               | **Yes**                            | tags with no version suffix and no `x-kubernetes-group-version-kind` |
| `GROUP_MAP` / `MODEL_GROUP_MAP` | **Yes**, with much better coverage | GVK seeds + `$ref` reachability                                      |
| Class → group/version           | **Yes**                            | `x-kubernetes-group-version-kind` on operations                      |
| `CATEGORY_BY_GROUP`             | **No** — genuinely editorial       | but its input shrinks to ~23 real group names                        |

---

## 1. `SPECIAL_CLASSES` is derivable

The spec tags every operation `<group>` or `<group>_<version>`. openapi-generator
turns a tag into a class by splitting on `_`/`-`, PascalCasing, and appending
`Api` — which is exactly why `custom_objects` → `CustomObjectsApi` and
`WellKnown` → `WellKnownApi`, the two cases the current `parseClassName`
lowercase-first-letter rule cannot produce. That is the whole reason those
entries had to be hardcoded.

A tag is "special" precisely when it has **no version suffix and no operation
carrying a GVK**. Applying that rule reproduces 7 of the 8 hardcoded entries
(`CoreApi`, `ApisApi`, `OpenidApi`, `WellKnownApi`, `CustomObjectsApi`,
`VersionApi`, `LogsApi`) with their real path roots.

**`WatchApi` is stale.** It has no backing tag and no `src/gen/docs/WatchApi.md`.
It has been dead for at least as long as this spec revision.

## 2. Group/version should come from GVK, not the class name

36 versioned tags carry `x-kubernetes-group-version-kind`, giving the _real_
API group:

```
AdmissionregistrationV1Api   ->  admissionregistration.k8s.io/v1
RbacAuthorizationV1Api       ->  rbac.authorization.k8s.io/v1
```

The current code reverse-engineers `RbacAuthorization` from the class-name
string, which yields the swagger _token_, not the API group. The comment at
`extract-api-groups.mjs:96` already calls the tag "authoritative"; GVK is
strictly better, and it is what a user actually needs to write a manifest.

### Free side effect: drift detection

Comparing tags against what is committed under `src/gen` surfaces staleness the
current pipeline never reports:

- **8 generated API classes** have no tag in the current spec
  (`AuthenticationV1alpha1Api`, `FlowcontrolApiserverV1beta3Api`,
  `NetworkingV1alpha1Api`, `ResourceV1alpha2Api`, `SchedulingV1alpha1Api`,
  `StorageV1alpha1Api`, `StoragemigrationV1alpha1Api`,
  `AuthenticationV1beta1Api`).
- **1 doc page** (`SchedulingV1alpha1Api.md`) documents a removed API.
- **155 model files** have no definition in the spec.

## 3. Model → group beats the regexes by a wide margin

The two regex maps categorise by model-name prefix. Over 912 generated model
files, **629 (69%) fall through to `Other`** — the maps only ever matched `V1`
prefixes, so every `V1beta1*` / `V1alpha1*` / `V2*` type is uncategorised by
construction.

Derivation instead:

1. **Seed** — 193 definitions carry a GVK and know their own group.
2. **Propagate** — walk `$ref` edges. A definition reachable from exactly one
   group's roots belongs to that group (`V1PodSpec` follows `V1Pod`). This
   resolves **621 definitions (81.8%)**.
3. **Shared** — 137 definitions are reachable from many groups. These are
   apimachinery/meta types (`ObjectMeta` from 23 groups, `ManagedFieldsEntry`
   23, `OwnerReference` 23, `ListMeta` 21, `LabelSelector` 9). They are not a
   failure of the method; they are a real category the current taxonomy lacks.
4. **Unreachable** — exactly one: `version.Info`, which belongs to the `version`
   tag and is covered by §1.

Coverage of models the spec still defines: **756/756 (100%)**, vs 31% for the
regexes. The 156 "unknown" are the stale files from §2, not misses.

## 4. `CATEGORY_BY_GROUP` is genuinely editorial — keep it

Nothing in the spec expresses "Workloads" vs "Networking". That is a sidebar
taxonomy decision and should stay hand-maintained; the existing comment at
`extract-api-groups.mjs:10-14` is correct.

What changes is its _input_. Today the same taxonomy is restated three times —
once as group tokens (`CATEGORY_BY_GROUP`) and twice as regexes over model-name
prefixes (`GROUP_MAP`, `MODEL_GROUP_MAP`, byte-identical patterns in two files).
Derivation collapses that to a single ~23-entry map keyed by real API group
name, applied to both APIs and models:

```
resource.k8s.io, core, admissionregistration.k8s.io, networking.k8s.io,
autoscaling, apps, storage.k8s.io, flowcontrol.apiserver.k8s.io,
scheduling.k8s.io, apiextensions.k8s.io, batch, authorization.k8s.io,
certificates.k8s.io, rbac.authorization.k8s.io, authentication.k8s.io,
coordination.k8s.io, discovery.k8s.io, apiregistration.k8s.io,
internal.apiserver.k8s.io, policy, storagemigration.k8s.io, node.k8s.io,
events.k8s.io
```

A new API group then produces one "unassigned group" warning instead of silently
scattering dozens of model pages into `Other`.

## 5. Prerequisite: `extract-api-groups.mjs` is half-dead

Worth settling before any refactor. The docs build runs only:

```
prebuild: node scripts/transform-gen-docs.mjs && node scripts/generate-models.mjs
```

`transform-gen-docs.mjs` imports **only** `CATEGORY_ORDER` and
`CATEGORY_SLUG_BY_NAME` from `extract-api-groups.mjs`. Nothing imports
`buildApiGroupMap`, and nothing reads `docs/scripts/api-group-map.json` — the
committed artefact has no consumer. So `SPECIAL_CLASSES`, `CATEGORY_BY_GROUP`,
and the whole tag-validation path are currently dead code, and their warnings
never print during a build.

That means the actual categorisation in the shipped sidebar comes from the
regex maps, i.e. the 69%-`Other` path.

## Suggested sequencing

1. Decide whether `extract-api-groups.mjs` / `api-group-map.json` should be
   revived or deleted. Everything else depends on this.
2. If revived: derive `SPECIAL_CLASSES` (§1) and switch group/version to GVK
   (§2). Small, self-contained, removes the stale `WatchApi`.
3. Replace both regex maps with the reachability derivation (§3), keeping one
   hand-maintained `CATEGORY_BY_GROUP` keyed by real group name (§4).
4. Add a "Common / Metadata" category for the 137 shared apimachinery types.
5. Promote the drift checks from §2 into a build warning.

## Open questions

- Is `src/gen/swagger.json` guaranteed present at docs-build time? It is
  gitignored, so CI ordering relative to `generate-client.sh` needs confirming.
  If not, the derivation could be run at generation time and its output
  committed — which is what `api-group-map.json` presumably intended.
- Should stale generated files (8 APIs, 1 doc, 155 models) be pruned, or is
  keeping removed-API docs deliberate for users on older clusters?
- `$ref` reachability is a heuristic for sub-objects. It is exact for the 193
  GVK-bearing roots; the 621 propagated ones assume "referenced by exactly one
  group ⇒ owned by it", which held cleanly here but is worth a regression test.
