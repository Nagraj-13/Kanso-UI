import fetch from 'node-fetch';

const REGISTRY_URL = 'https://kanso-ui.nr13.in/api/registry';

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
  internalDeps: string[];
  filePath: string;
  source: string;
  files: { path: string; content: string }[];
}

export async function fetchComponent(
  name: string
): Promise<RegistryItem | null> {
  try {
    const url = `${REGISTRY_URL}/${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch component from ${url}`);
    }

    const data = (await response.json()) as RegistryItem;
    return data;
  } catch (error) {
    throw new Error(`Error fetching component: ${(error as Error).message}`);
  }
}
