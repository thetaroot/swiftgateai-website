#!/usr/bin/env node
/**
 * Workaround for Node v25 + Next.js 15 (app-router-only projects).
 * Next.js tries to require() .next/server/middleware-manifest.json 
 * before the dev bundler creates it. This script seeds the directory.
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const serverDir = path.join(projectRoot, '.next', 'server', 'pages');

if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir, { recursive: true });
}

const manifests = {
    'middleware-manifest.json': { sortedMiddleware: [], middleware: {}, functions: {}, version: 3 },
    'pages-manifest.json': {},
    'next-font-manifest.json': { pages: {}, app: {} },
};

for (const [name, content] of Object.entries(manifests)) {
    const fpath = path.join(projectRoot, '.next', 'server', name);
    if (!fs.existsSync(fpath)) {
        fs.writeFileSync(fpath, JSON.stringify(content));
        console.log(`  ✓ Seeded ${name}`);
    }
}
