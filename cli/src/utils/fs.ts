import fs from 'fs';
import path from 'path';

export function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function writeComponentFile(
  cwd: string,
  filePath: string,
  content: string
) {
  const fullPath = path.join(cwd, filePath);
  ensureDirectoryExists(path.dirname(fullPath));
  fs.writeFileSync(fullPath, content, 'utf-8');
  return fullPath;
}

export function readComponentsJson(cwd: string) {
  const p = path.join(cwd, 'components.json');
  if (!fs.existsSync(p)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
