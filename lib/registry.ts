/**
 * Kanso UI — Component Registry
 *
 * Central registry that defines all Kanso-branded components with metadata.
 * This powers the documentation pages, API routes, and future CLI tooling.
 *
 * Each entry contains everything needed to:
 * - Render the documentation page (title, description, props)
 * - Generate installation instructions (dependencies)
 * - Serve raw source via API (filePath)
 * - Categorize and search (category, tags)
 */

export interface RegistryComponentProp {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

export interface RegistryComponent {
  /** Unique kebab-case identifier (used in URLs and CLI) */
  name: string
  /** Display title */
  title: string
  /** One-line description */
  description: string
  /** Component category for grouping */
  category: "effects" | "buttons" | "layout" | "typography" | "feedback" | "data-display"
  /** npm dependencies required */
  dependencies: string[]
  /** Internal Kanso files this component depends on */
  internalDeps: string[]
  /** Path to component source file (relative to project root) */
  filePath: string
  /** Searchable tags */
  tags: string[]
  /** Component props documentation */
  props: RegistryComponentProp[]
}

/**
 * All registered Kanso components.
 *
 * To add a new component:
 * 1. Create the component in `components/kanso/`
 * 2. Add an entry here with all required metadata
 * 3. Add a demo case in `components/docs/component-demos.tsx`
 * 4. The docs page at `/docs/components/[name]` auto-generates
 */
export const registry: RegistryComponent[] = [
  {
    name: "button",
    title: "Button",
    description:
      "A versatile, minimalist button component with support for multiple aesthetic variants, sizes, and states.",
    category: "buttons",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/button.tsx",
    tags: ["button", "variants", "primary", "secondary", "outline", "ghost", "interactive"],
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "outline" | "ghost" | "link"',
        default: '"primary"',
        description: "The visual style variant of the button.",
      },
      {
        name: "color",
        type: '"zinc" | "blue" | "emerald" | "violet" | "amber" | "rose"',
        default: '"zinc"',
        description: "The color theme of the button across its variants.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        default: '"default"',
        description: "The height and padding scale of the button.",
      },
      {
        name: "inactive",
        type: "boolean",
        default: "false",
        description: "When true, disables interactions and styles the button as inactive.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The content (text, label, or icons) inside the button.",
        required: true,
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply custom overrides.",
      },
    ],
  },
  {
    name: "magnetic-button",
    title: "Magnetic Button",
    description:
      "A button that magnetically follows the cursor on hover using spring physics.",
    category: "buttons",
    dependencies: ["framer-motion"],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/magnetic-button.tsx",
    tags: ["button", "hover", "animation", "magnetic", "interactive"],
    props: [
      {
        name: "variant",
        type: '"default" | "outline"',
        default: '"default"',
        description: "The visual style variant of the button.",
      },
      {
        name: "magneticStrength",
        type: "number",
        default: "0.3",
        description: "Strength of the magnetic pull effect (0 to 1).",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content to render inside the button.",
        required: true,
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply.",
      },
    ],
  },
  {
    name: "shimmer-border",
    title: "Shimmer Border",
    description:
      "A container with a subtle animated shimmer effect running along its border.",
    category: "effects",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/shimmer-border.tsx",
    tags: ["border", "shimmer", "animation", "card", "glow", "css"],
    props: [
      {
        name: "borderRadius",
        type: "number",
        default: "12",
        description: "Border radius in pixels.",
      },
      {
        name: "shimmerColor",
        type: "string",
        default: '"rgba(255, 255, 255, 0.15)"',
        description: "Color of the shimmer highlight.",
      },
      {
        name: "shimmerSize",
        type: "number",
        default: "200",
        description: "Width of the shimmer highlight in pixels.",
      },
      {
        name: "duration",
        type: "number",
        default: "3",
        description: "Animation cycle duration in seconds.",
      },
      {
        name: "borderWidth",
        type: "number",
        default: "1.5",
        description: "Width of the shimmer border in pixels.",
      },
      {
        name: "background",
        type: "string",
        description: "Background color of the inner content area.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content to render inside the bordered container.",
        required: true,
      },
    ],
  },
  {
    name: "text-reveal",
    title: "Text Reveal",
    description:
      "Text that reveals character by character with a blur effect when scrolled into view.",
    category: "typography",
    dependencies: ["framer-motion"],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/text-reveal.tsx",
    tags: ["text", "reveal", "scroll", "animation", "typography", "stagger"],
    props: [
      {
        name: "text",
        type: "string",
        description: "The text string to reveal.",
        required: true,
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description: "Delay before animation starts in seconds.",
      },
      {
        name: "staggerDelay",
        type: "number",
        default: "0.03",
        description: "Delay between each character reveal in seconds.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes for styling the text.",
      },
    ],
  },
]

/**
 * Get a component by its registry name.
 */
export function getComponent(name: string): RegistryComponent | undefined {
  return registry.find((c) => c.name === name)
}

/**
 * Get all components in a given category.
 */
export function getComponentsByCategory(
  category: RegistryComponent["category"]
): RegistryComponent[] {
  return registry.filter((c) => c.category === category)
}

/**
 * Get all unique categories present in the registry.
 */
export function getCategories(): RegistryComponent["category"][] {
  return [...new Set(registry.map((c) => c.category))]
}
