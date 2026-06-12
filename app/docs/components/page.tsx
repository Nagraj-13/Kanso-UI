import { redirect } from "next/navigation"
import { registry } from "@/lib/registry"

/**
 * Components index — redirects to the first category in the registry.
 */
export default function ComponentsPage() {
  const first = registry[0]
  if (first) {
    redirect(`/docs/components/${first.category}`)
  }
  return null
}
