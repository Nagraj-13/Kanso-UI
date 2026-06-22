import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import ora from 'ora';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

export function getPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export function getInstallCommand(pm: PackageManager, isDev = false): string {
  switch (pm) {
    case 'npm':
      return `npm install ${isDev ? '-D' : ''}`;
    case 'pnpm':
      return `pnpm add ${isDev ? '-D' : ''}`;
    case 'yarn':
      return `yarn add ${isDev ? '-D' : ''}`;
    case 'bun':
      return `bun add ${isDev ? '-D' : ''}`;
  }
}

export async function installDependencies(
  dependencies: string[],
  cwd: string
): Promise<void> {
  if (!dependencies || dependencies.length === 0) return;

  const pm = getPackageManager(cwd);
  const installCmd = getInstallCommand(pm);
  const command = `${installCmd} ${dependencies.join(' ')}`;

  const spinner = ora(`Installing dependencies...`).start();

  try {
    execSync(command, {
      cwd,
      stdio: 'ignore',
    });
    spinner.succeed(
      `Installed ${dependencies.length} dependencies: ${pc.cyan(
        dependencies.join(', ')
      )}`
    );
  } catch (error) {
    spinner.fail(`Failed to install dependencies.`);
    console.error(pc.red((error as Error).message));
  }
}
