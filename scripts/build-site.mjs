import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, '_site');
const files = ['index.html', '404.html', 'icon.svg', 'site.webmanifest'];
const directories = ['assets'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  await cp(resolve(root, file), resolve(output, file), { force: true });
}

for (const directory of directories) {
  await cp(resolve(root, directory), resolve(output, directory), {
    recursive: true,
    force: true,
    dereference: true,
  });
}

process.stdout.write(`Built allowlisted static artifact at ${output}\n`);
