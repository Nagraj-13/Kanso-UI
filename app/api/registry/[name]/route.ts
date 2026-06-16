import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getComponent, registry } from '@/lib/registry';

interface RouteParams {
  params: Promise<{ name: string }>;
}

/**
 * GET /api/registry/[name]
 *
 * Returns the component metadata and raw source code as JSON.
 * This enables future CLI tooling (e.g. `npx kanso-ui add magnetic-button`).
 *
 * Response shape:
 * {
 *   name: string
 *   title: string
 *   description: string
 *   category: string
 *   dependencies: string[]
 *   internalDeps: string[]
 *   filePath: string
 *   source: string        // raw source code
 *   files: { path: string, content: string }[]
 * }
 */
export async function GET(_request: Request, { params }: RouteParams) {
  const { name } = await params;
  const component = getComponent(name);

  if (!component) {
    return NextResponse.json(
      {
        error: 'Component not found',
        available: registry.map((c) => c.name),
      },
      { status: 404 }
    );
  }

  // Read the source file
  const filePath = path.join(process.cwd(), component.filePath);
  let source = '';
  try {
    source = await fs.readFile(filePath, 'utf-8');
  } catch {
    return NextResponse.json(
      { error: 'Source file not found on server' },
      { status: 500 }
    );
  }

  // Read internal dependency files
  const files: { path: string; content: string }[] = [
    { path: component.filePath, content: source },
  ];

  for (const dep of component.internalDeps) {
    try {
      const depPath = path.join(process.cwd(), dep + '.ts');
      const depContent = await fs.readFile(depPath, 'utf-8');
      files.push({ path: dep + '.ts', content: depContent });
    } catch {
      // Skip missing dependency files
    }
  }

  return NextResponse.json({
    name: component.name,
    title: component.title,
    description: component.description,
    category: component.category,
    dependencies: component.dependencies,
    internalDeps: component.internalDeps,
    filePath: component.filePath,
    tags: component.tags,
    source,
    files,
  });
}
