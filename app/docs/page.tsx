//app/docs/page.tsx
import { redirect } from 'next/navigation';
import { registry } from '@/lib/registry';

/**
 * Docs index — redirects to the first component category in the registry.
 */
export default function DocsPage() {
  const first = registry[0];
  if (first) {
    redirect(`/docs/components/${first.category}`);
  }
  return null;
}
