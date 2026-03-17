#!/usr/bin/env node
/**
 * Workaround for Node v25 + Next.js 15 (app-router-only projects).
 * Next.js tries to require() several manifest files
 * before the dev bundler creates them. This script seeds the directory.
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const serverDir = path.join(projectRoot, '.next', 'server');

// Create directories if missing
if (!fs.existsSync(serverDir)) {
    fs.mkdirSync(serverDir, { recursive: true });
}

const serverManifests = {
    'middleware-manifest.json': { sortedMiddleware: [], middleware: {}, functions: {}, version: 3 },
    'pages-manifest.json': {},
    'next-font-manifest.json': { pages: {}, app: {} },
};

const rootManifests = {
    'routes-manifest.json': { 
        version: 3, 
        pages404: true, 
        caseSensitive: false, 
        basePath: "", 
        redirects: [], 
        headers: [], 
        dynamicRoutes: [], 
        staticRoutes: [], 
        dataRoutes: [], 
        rsc: { 
            header: "RSC", 
            varyHeader: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch", 
            contentTypeHeader: "text/x-component" 
        } 
    }
};

console.log("Pre-seeding Next.js manifests...");

for (const [name, content] of Object.entries(serverManifests)) {
    const fpath = path.join(serverDir, name);
    fs.writeFileSync(fpath, JSON.stringify(content, null, 2));
    console.log(`  ✓ Seeded .next/server/${name}`);
}

for (const [name, content] of Object.entries(rootManifests)) {
    const fpath = path.join(projectRoot, '.next', name);
    fs.writeFileSync(fpath, JSON.stringify(content, null, 2));
    console.log(`  ✓ Seeded .next/${name}`);
}
