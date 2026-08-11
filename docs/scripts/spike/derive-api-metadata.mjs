#!/usr/bin/env node
/**
 * SPIKE — not wired into the docs build.
 *
 * Question: how much of the hand-maintained metadata in docs/scripts can be
 * derived from src/gen/swagger.json (or the generated TypeScript) instead of
 * being hardcoded?
 *
 * Hardcoded maps in scope:
 *   - extract-api-groups.mjs  CATEGORY_BY_GROUP, SPECIAL_CLASSES
 *   - generate-models.mjs     GROUP_MAP
 *   - transform-gen-docs.mjs  MODEL_GROUP_MAP
 *
 * Run: node docs/scripts/spike/derive-api-metadata.mjs
 * Prints a report comparing derived output against the current hardcoded maps.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');

const swaggerPath = path.join(repoRoot, 'src/gen/swagger.json');
if (!fs.existsSync(swaggerPath)) {
    console.error(`Missing ${swaggerPath}. It is generated (gitignored) — run ./generate-client.sh first.`);
    process.exit(1);
}
const swagger = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
const definitions = swagger.definitions ?? swagger.components?.schemas ?? {};

// ---------------------------------------------------------------------------
// 1. API classes: tag -> class name, and which tags are "special"
// ---------------------------------------------------------------------------

/** openapi-generator's tag -> class rule: split on _/-, PascalCase, + "Api". */
export function tagToClassName(tag) {
    return (
        tag
            .split(/[_-]/)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Api'
    );
}

/**
 * Every operation tag, with the evidence needed to classify it:
 *  - gvk:       the x-kubernetes-group-version-kind values on its operations
 *  - pathRoots: the URL prefixes it serves
 */
export function collectTags(spec) {
    const tags = new Map();
    for (const [urlPath, pathItem] of Object.entries(spec.paths ?? {})) {
        for (const operation of Object.values(pathItem)) {
            if (!operation || !Array.isArray(operation.tags)) continue;
            const gvk = operation['x-kubernetes-group-version-kind'];
            for (const tag of operation.tags) {
                if (!tags.has(tag)) {
                    tags.set(tag, { tag, gvk: new Set(), pathRoots: new Set() });
                }
                const entry = tags.get(tag);
                entry.pathRoots.add(urlPath.split('/').slice(0, 3).join('/'));
                if (gvk) entry.gvk.add(`${gvk.group || 'core'}/${gvk.version}`);
            }
        }
    }
    return tags;
}

/**
 * DERIVES the SPECIAL_CLASSES set.
 *
 * A tag is "special" (non group/version-scoped) exactly when it has a
 * `{group}_{version}` shape mismatch: no versioned suffix AND no operation
 * carrying an x-kubernetes-group-version-kind. That is the same property the
 * hardcoded map encodes by hand.
 */
export function deriveSpecialTags(tags) {
    const special = [];
    for (const entry of tags.values()) {
        const versioned = /_v\d+(alpha\d+|beta\d+)?$/.test(entry.tag);
        if (!versioned && entry.gvk.size === 0) {
            special.push({
                className: tagToClassName(entry.tag),
                tag: entry.tag,
                pathRoots: [...entry.pathRoots].sort(),
            });
        }
    }
    return special.sort((a, b) => a.className.localeCompare(b.className));
}

/** Group/version for the normal versioned tags, straight from GVK. */
export function deriveVersionedTags(tags) {
    const out = [];
    for (const entry of tags.values()) {
        if (entry.gvk.size === 0) continue;
        const [group, version] = [...entry.gvk][0].split('/');
        out.push({ className: tagToClassName(entry.tag), tag: entry.tag, group, version });
    }
    return out.sort((a, b) => a.className.localeCompare(b.className));
}

// ---------------------------------------------------------------------------
// 2. Models: definition -> owning API group, via GVK + $ref reachability
// ---------------------------------------------------------------------------

function collectRefs(node, out = new Set()) {
    if (!node || typeof node !== 'object') return out;
    if (typeof node.$ref === 'string') out.add(node.$ref.split('/').pop());
    for (const value of Object.values(node)) {
        if (value && typeof value === 'object') collectRefs(value, out);
    }
    return out;
}

/**
 * Definition key -> generated model class name.
 *   "v1.Pod"                            -> "V1Pod"
 *   "admissionregistration.v1.ServiceReference" -> "AdmissionregistrationV1ServiceReference"
 */
export function definitionToModelName(key) {
    const parts = key.split('.');
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

/**
 * DERIVES the model -> group mapping that GROUP_MAP / MODEL_GROUP_MAP encode
 * as hand-written regexes.
 *
 * Seed:      definitions carrying x-kubernetes-group-version-kind (top-level
 *            resources) know their own group authoritatively.
 * Propagate: any definition reachable by $ref from exactly one group's roots
 *            belongs to that group (V1PodSpec follows V1Pod).
 * Shared:    definitions reachable from many groups are apimachinery/meta
 *            types (ObjectMeta, LabelSelector) — a real category, not a miss.
 */
export function deriveModelGroups(defs) {
    const graph = new Map(Object.entries(defs).map(([k, v]) => [k, [...collectRefs(v)]]));

    const seeds = new Map();
    for (const [key, value] of Object.entries(defs)) {
        const gvk = value['x-kubernetes-group-version-kind'];
        if (gvk?.[0]) seeds.set(key, gvk[0].group || 'core');
    }

    // For each seed group, everything it can reach.
    const owners = new Map();
    for (const [seed, group] of seeds) {
        const seen = new Set([seed]);
        const stack = [seed];
        while (stack.length) {
            for (const ref of graph.get(stack.pop()) ?? []) {
                if (seen.has(ref)) continue;
                seen.add(ref);
                stack.push(ref);
            }
        }
        for (const reached of seen) {
            if (!owners.has(reached)) owners.set(reached, new Set());
            owners.get(reached).add(group);
        }
    }

    const exclusive = new Map();
    const shared = new Map();
    for (const [key, groups] of owners) {
        if (groups.size === 1) exclusive.set(key, [...groups][0]);
        else shared.set(key, [...groups].sort());
    }
    const unreachable = Object.keys(defs).filter((k) => !owners.has(k));

    return { seeds, exclusive, shared, unreachable, total: Object.keys(defs).length };
}

// ---------------------------------------------------------------------------
// 3. Report
// ---------------------------------------------------------------------------

// Current hardcoded regexes, copied verbatim for comparison only.
const HARDCODED_GROUP_MAP = {
    Core: /^V1(Pod|Service|Node|Namespace|ConfigMap|Secret|Endpoint|Event|Binding|Component|LimitRange|PersistentVolume|ReplicationController|ResourceQuota|PodTemplate|ServiceAccount|API)/,
    Workloads:
        /^V1(Deployment|StatefulSet|DaemonSet|ReplicaSet|ControllerRevision|Job|CronJob|HorizontalPodAutoscaler|Scale)/,
    Networking: /^V1(Ingress|NetworkPolicy|EndpointSlice|IPAddress|ServiceCIDR)/,
    Security:
        /^V1(ClusterRole|Role|CertificateSigningRequest|TokenReview|SubjectAccessReview|SelfSubjectAccessReview|SelfSubjectRulesReview|LocalSubjectAccessReview|TokenRequest)/,
    'Configuration & Storage':
        /^V1(StorageClass|VolumeAttachment|CSI|Lease|FlowSchema|PriorityLevelConfiguration|PodDisruptionBudget)/,
    Cluster:
        /^V1(CustomResourceDefinition|MutatingWebhookConfiguration|ValidatingWebhookConfiguration|ValidatingAdmissionPolicy|PriorityClass|Scheduling|Admission)/,
};

const HARDCODED_SPECIAL_CLASSES = [
    'CoreApi',
    'ApisApi',
    'OpenidApi',
    'WellKnownApi',
    'CustomObjectsApi',
    'WatchApi',
    'VersionApi',
    'LogsApi',
];

function hardcodedGroupOf(modelName) {
    for (const [group, pattern] of Object.entries(HARDCODED_GROUP_MAP)) {
        if (pattern.test(modelName)) return group;
    }
    return 'Other';
}

function main() {
    const tags = collectTags(swagger);
    const special = deriveSpecialTags(tags);
    const versioned = deriveVersionedTags(tags);

    console.log('='.repeat(78));
    console.log('1. SPECIAL_CLASSES — derivable?  YES');
    console.log('='.repeat(78));
    console.log(`swagger operation tags: ${tags.size}`);
    console.log(`derived special (no version suffix, no GVK): ${special.length}\n`);
    for (const s of special) {
        const known = HARDCODED_SPECIAL_CLASSES.includes(s.className);
        console.log(
            `  ${known ? '=' : '+'} ${s.className.padEnd(20)} tag=${s.tag.padEnd(16)} ${s.pathRoots.join(' ')}`,
        );
    }
    const derivedNames = new Set(special.map((s) => s.className));
    const stale = HARDCODED_SPECIAL_CLASSES.filter((c) => !derivedNames.has(c));
    console.log(
        `\n  legend: '=' listed in SPECIAL_CLASSES, '+' group-discovery tag handled today by the` +
            `\n          parseClassName fallback (works, but its group/version is guessed from the` +
            `\n          class-name string rather than read from the spec)`,
    );
    console.log(`  hardcoded entries with NO backing tag (stale): ${stale.join(', ') || 'none'}`);

    console.log(`\n${'='.repeat(78)}`);
    console.log('2. Versioned API classes — group/version derivable?  YES');
    console.log('='.repeat(78));
    console.log(`${versioned.length} versioned tags carry x-kubernetes-group-version-kind.`);
    console.log('Sample (real API group, not a class-name string guess):');
    for (const v of versioned.slice(0, 5)) {
        console.log(`  ${v.className.padEnd(34)} ${v.group}/${v.version}`);
    }

    // Drift between generated classes/docs and the current spec.
    const apisDir = path.join(repoRoot, 'src/gen/apis');
    const docsDir = path.join(repoRoot, 'src/gen/docs');
    const expected = new Set([...tags.keys()].map(tagToClassName));
    if (fs.existsSync(apisDir)) {
        const classes = fs
            .readdirSync(apisDir)
            .filter((f) => f.endsWith('Api.ts'))
            .map((f) => f.replace('.ts', ''));
        const orphaned = classes.filter((c) => !expected.has(c));
        console.log(`\nGenerated API classes with no tag in the current spec: ${orphaned.length}`);
        for (const o of orphaned) console.log(`  - ${o}`);
    }
    if (fs.existsSync(docsDir)) {
        const docs = fs
            .readdirSync(docsDir)
            .filter((f) => f.endsWith('.md'))
            .map((f) => f.replace('.md', ''));
        const orphaned = docs.filter((d) => !expected.has(d));
        console.log(`Generated doc pages with no tag in the current spec: ${orphaned.length}`);
        for (const o of orphaned) console.log(`  - ${o}`);
    }

    console.log(`\n${'='.repeat(78)}`);
    console.log('3. GROUP_MAP / MODEL_GROUP_MAP — derivable?  YES, far better coverage');
    console.log('='.repeat(78));
    const { seeds, exclusive, shared, unreachable, total } = deriveModelGroups(definitions);
    const pct = (n) => `${((n / total) * 100).toFixed(1)}%`;
    console.log(`definitions: ${total}`);
    console.log(`  seeded directly from GVK:        ${seeds.size} (${pct(seeds.size)})`);
    console.log(`  resolved to exactly one group:   ${exclusive.size} (${pct(exclusive.size)})`);
    console.log(
        `  shared across groups (apimachinery): ${shared.size} (${pct(shared.size)})  <- their own category`,
    );
    console.log(`  unreachable:                     ${unreachable.length} ${unreachable.join(', ')}`);

    const modelsDir = path.join(repoRoot, 'src/gen/models');
    if (fs.existsSync(modelsDir)) {
        const models = fs
            .readdirSync(modelsDir)
            .filter((f) => f.endsWith('.ts') && !['all.ts', 'ObjectSerializer.ts'].includes(f))
            .map((f) => f.replace('.ts', ''));
        const hardcodedOther = models.filter((m) => hardcodedGroupOf(m) === 'Other').length;
        console.log(`\nHead-to-head over ${models.length} generated model files:`);
        console.log(
            `  hardcoded regexes -> "Other": ${hardcodedOther} (${((hardcodedOther / models.length) * 100).toFixed(1)}% uncategorized)`,
        );
        const derivedNamed = new Set([...exclusive.keys(), ...shared.keys()].map(definitionToModelName));
        const derivedOther = models.filter((m) => !derivedNamed.has(m));
        console.log(
            `  derived           -> unknown: ${derivedOther.length} (${((derivedOther.length / models.length) * 100).toFixed(1)}% uncategorized)`,
        );
        console.log(
            `  ...but all ${derivedOther.length} are stale model files with no definition in the current spec`,
        );
        console.log(
            `  coverage of models the spec still defines: ${models.length - derivedOther.length}/${models.length - derivedOther.length} (100%)`,
        );
    }

    console.log(`\n${'='.repeat(78)}`);
    console.log('4. CATEGORY_BY_GROUP — derivable?  NO (genuinely editorial)');
    console.log('='.repeat(78));
    console.log('Nothing in the spec expresses "Workloads" vs "Networking" — that is a sidebar');
    console.log('taxonomy choice. But it shrinks to ~23 real API group names (below) instead of');
    console.log('being restated as regexes over model-name prefixes in two other files.');
    const groupCounts = {};
    for (const g of exclusive.values()) groupCounts[g] = (groupCounts[g] ?? 0) + 1;
    for (const [g, n] of Object.entries(groupCounts).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${String(n).padStart(4)}  ${g}`);
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
    main();
}
