#!/usr/bin/env node

// Generates one Docusaurus MDX page per file in the repo's examples/ directory,
// embedding the actual source in a syntax-highlighted code block plus a link to
// the source on GitHub. Output is regenerated on every build and gitignored, so
// the docs stay in sync with the examples automatically — no curated fixtures.

import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const examplesDir = resolve(__dirname, '../../examples');
const outDir = resolve(__dirname, '../docs/examples');

// Only document real, code-bearing example files.
const LANG_BY_EXT = {
    '.ts': 'typescript',
    '.js': 'javascript',
    '.yaml': 'yaml',
    '.yml': 'yaml',
};

const repository = process.env.GITHUB_REPOSITORY ?? 'kubernetes-client/javascript';
const ref = process.env.GITHUB_SHA ?? 'master';

if (!existsSync(examplesDir)) {
    console.error(`examples/ not found at ${examplesDir}`);
    process.exit(1);
}

// Recursively collect example source files.
function walk(dir) {
    const entries = [];
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) {
            entries.push(...walk(full));
        } else if (LANG_BY_EXT[extname(name)]) {
            entries.push(full);
        }
    }
    return entries;
}

// Turn a path like "typescript/watch/watch-example.ts" into a readable title.
function toTitle(relPath) {
    return relPath
        .replace(/\.[^.]+$/, '')
        .split(/[\\/]/)
        .join(' / ')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Escape YAML frontmatter string values.
function yamlString(value) {
    return `'${value.replace(/'/g, "''")}'`;
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const files = walk(examplesDir).sort();
let count = 0;

for (const file of files) {
    const relPath = relative(examplesDir, file).split(sep).join('/');
    const lang = LANG_BY_EXT[extname(file)];
    const source = readFileSync(file, 'utf8').replace(/\s+$/, '');
    const title = toTitle(relPath);
    const githubUrl = `https://github.com/${repository}/blob/${ref}/examples/${relPath}`;

    const outFile = join(outDir, relPath.replace(/[\\/]/g, '__').replace(/\.[^.]+$/, '') + '.mdx');

    const page = `---
title: ${yamlString(title)}
description: ${yamlString(`Example: examples/${relPath}`)}
---

# ${title}

Source: [\`examples/${relPath}\`](${githubUrl})

\`\`\`${lang} title="examples/${relPath}"
${source}
\`\`\`
`;

    writeFileSync(outFile, page);
    count++;
}

// Category metadata for the sidebar.
writeFileSync(
    join(outDir, '_category_.json'),
    JSON.stringify(
        {
            label: 'Examples',
            position: 3,
            link: {
                type: 'generated-index',
                description: 'Runnable examples from the kubernetes-client/javascript repository.',
            },
        },
        null,
        2,
    ) + '\n',
);

console.log(`✓ Generated ${count} example pages into ${outDir}`);
