import { access, readFile, readdir, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import process from 'node:process';

const root = resolve(process.argv[2] || resolve(import.meta.dirname, '..'));
const errors = [];
const requiredFiles = ['index.html', '404.html', 'icon.svg', 'site.webmanifest', 'assets/styles.css', 'assets/app.js'];

const fail = (message) => errors.push(message);
const exists = async (path) => access(path).then(() => true).catch(() => false);

for (const file of requiredFiles) {
  if (!(await exists(resolve(root, file)))) fail(`Missing required file: ${file}`);
}

if (!errors.length) {
  const index = await readFile(resolve(root, 'index.html'), 'utf8');
  const notFound = await readFile(resolve(root, '404.html'), 'utf8');
  const css = await readFile(resolve(root, 'assets/styles.css'), 'utf8');
  const js = await readFile(resolve(root, 'assets/app.js'), 'utf8');
  const manifestText = await readFile(resolve(root, 'site.webmanifest'), 'utf8');

  const checks = [
    [index.startsWith('<!doctype html>'), 'index.html must start with the HTML5 doctype'],
    [/<html\s+lang="[a-z-]+"/i.test(index), 'index.html must declare a document language'],
    [/<meta\s+charset="utf-8"/i.test(index), 'index.html must declare UTF-8'],
    [/name="viewport"/i.test(index), 'index.html must include a viewport meta tag'],
    [/name="description"\s+content="[^"]{30,}"/i.test(index), 'index.html must include a useful description'],
    [/Content-Security-Policy/i.test(index), 'index.html must include a Content Security Policy'],
    [/class="skip-link"\s+href="#main-content"/i.test(index), 'index.html must include a skip link'],
    [/<main\s+id="main-content"/i.test(index), 'index.html must expose the skip-link target'],
    [/:focus-visible/.test(css), 'CSS must define visible keyboard focus'],
    [/@media\s*\(prefers-reduced-motion:\s*reduce\)/.test(css), 'CSS must respect reduced-motion preferences'],
    [!/<script(?![^>]*\ssrc=)[^>]*>/i.test(index), 'Inline scripts are not allowed in index.html'],
    [!/<style[^>]*>/i.test(index), 'Inline styles are not allowed in index.html'],
    [!/(?:src|href)=["']https?:\/\//i.test(index), 'Remote page assets are not allowed'],
    [!/(?:javascript:|data:text\/html)/i.test(index), 'Unsafe URL schemes are not allowed'],
    [/<meta\s+name="robots"\s+content="noindex"/i.test(notFound), '404.html must be excluded from indexing'],
    [!/(eval\s*\(|new\s+Function\s*\()/i.test(js), 'Dynamic code execution is not allowed'],
  ];

  for (const [passed, message] of checks) if (!passed) fail(message);

  let manifest;
  try {
    manifest = JSON.parse(manifestText);
  } catch {
    fail('site.webmanifest must contain valid JSON');
  }
  if (manifest) {
    if (manifest.start_url !== './') fail('Manifest start_url must remain relative for project Pages');
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) fail('Manifest must declare an icon');
  }

  const ids = [...index.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) fail('index.html contains duplicate IDs');

  const localRefs = [...index.matchAll(/(?:src|href)="([^"#][^"]*)"/g)]
    .map((match) => match[1])
    .filter((ref) => !/^(?:mailto:|tel:)/.test(ref));
  for (const ref of localRefs) {
    const cleanRef = ref.split(/[?#]/, 1)[0];
    if (!cleanRef || cleanRef === './') continue;
    const file = resolve(root, cleanRef.replace(/^\//, ''));
    if (!(await exists(file))) fail(`Broken local reference in index.html: ${ref}`);
  }
}

const scanFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) await scanFiles(fullPath);
    else {
      const info = await stat(fullPath);
      if (info.size > 1_000_000) fail(`Unexpected file larger than 1 MB: ${fullPath.slice(root.length + 1)}`);
      if (['.pem', '.key', '.p12', '.pfx'].includes(extname(entry.name).toLowerCase())) {
        fail(`Private-key-like file is not allowed: ${fullPath.slice(root.length + 1)}`);
      }
    }
  }
};

if (await exists(root)) await scanFiles(root);

if (errors.length) {
  for (const error of errors) process.stderr.write(`ERROR: ${error}\n`);
  process.exit(1);
}

process.stdout.write(`Static site checks passed for ${root}\n`);
