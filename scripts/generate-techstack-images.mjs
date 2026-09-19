import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const imagesDir = path.join(rootDir, 'public', 'images');
const outputFile = path.join(rootDir, 'src', 'data', 'techstackImages.ts');

const allowedExtensions = new Set(['.webp']);

function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listImageFiles(fullPath));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (allowedExtensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

const imageFiles = [...new Set(listImageFiles(imagesDir))]
  .map((filePath) => path.relative(imagesDir, filePath).replace(/\\/g, '/'))
  .map((relativePath) => `/images/${relativePath}`)
  .sort();

const output = `export const techStackImageUrls = ${JSON.stringify(imageFiles, null, 2)} as const;\n`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, output, 'utf8');
