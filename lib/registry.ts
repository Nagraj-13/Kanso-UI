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
  category: "effects" | "buttons" | "cards" | "layout" | "typography" | "feedback" | "data-display"
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
  /** Usage snippet showing how to import and use the component */
  usage?: string
  /** Custom CSS required to be added in globals.css (optional) */
  cssCode?: string
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
    usage: `import { Button } from "@/components/kanso/button"

export default function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary" color="blue">Secondary Blue</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`,
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
    usage: `import { MagneticButton } from "@/components/kanso/magnetic-button"

export default function MagneticButtonDemo() {
  return (
    <div className="flex gap-4">
      <MagneticButton>Hover Me</MagneticButton>
      <MagneticButton variant="outline" magneticStrength={0.4}>
        Custom Strength
      </MagneticButton>
    </div>
  )
}`,
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
    name: "realism-button",
    title: "Realism Button",
    description:
      "A glossy glassmorphism button featuring dynamic, glowing color blur blobs.",
    category: "buttons",
    dependencies: [],
    internalDeps: ["lib/utils", "components/ui/button"],
    filePath: "components/kanso/realism-button.tsx",
    tags: ["button", "glossy", "glassmorphism", "glow", "gradient", "realism"],
    usage: `import { RealismButton } from "@/components/kanso/realism-button"

export default function RealismButtonDemo() {
  return (
    <div className="flex gap-6">
      <RealismButton variantColor="cyan">Cyan Glow</RealismButton>
      <RealismButton variantColor="rose">Rose Glow</RealismButton>
    </div>
  )
}`,
    props: [
      {
        name: "variantColor",
        type: '"cyan" | "rose" | "emerald" | "violet"',
        default: '"cyan"',
        description: "The color theme of the glowing background blobs.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The label text or content inside the button.",
        required: true,
      },
    ],
  },
  {
    name: "keyboard-button",
    title: "Keyboard Button",
    description:
      "A tactile 3D keyboard keycap style button with realistic shadows and perspective active press physics.",
    category: "buttons",
    dependencies: [],
    internalDeps: ["lib/utils", "components/ui/button"],
    filePath: "components/kanso/keyboard-button.tsx",
    tags: ["button", "keyboard", "keycap", "3d", "tactile", "shadow"],
    usage: `import { KeyboardButton } from "@/components/kanso/keyboard-button"

export default function KeyboardButtonDemo() {
  return (
    <div className="flex gap-4">
      <KeyboardButton variantColor="dark">cmd</KeyboardButton>
      <KeyboardButton variantColor="blue">enter</KeyboardButton>
    </div>
  )
}`,
    props: [
      {
        name: "variantColor",
        type: '"dark" | "light" | "blue"',
        default: '"dark"',
        description: "The keycap color variation.",
      },
      {
        name: "icon",
        type: "React.ReactNode",
        description: "An optional symbol or key icon displayed at the top left of the keycap.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The uppercase text label of the keycap action.",
        required: true,
      },
    ],
  },
  {
    name: "glow-line-button",
    title: "Glow Line Button",
    description:
      "A sleek dark button with a radial gradient background and a glowing border outline on hover.",
    category: "buttons",
    dependencies: [],
    internalDeps: ["lib/utils", "components/ui/button"],
    filePath: "components/kanso/glow-line-button.tsx",
    tags: ["button", "glow", "dark", "outline", "line", "minimal"],
    usage: `import { GlowLineButton } from "@/components/kanso/glow-line-button"

export default function GlowLineButtonDemo() {
  return (
    <div className="flex gap-4">
      <GlowLineButton glowColor="blue">Blue Glow</GlowLineButton>
      <GlowLineButton glowColor="rose">Rose Glow</GlowLineButton>
    </div>
  )
}`,
    props: [
      {
        name: "glowColor",
        type: '"white" | "blue" | "emerald" | "violet" | "rose" | string',
        default: '"white"',
        description: "The color of the bottom glow line. Supports color presets or custom values (hex/rgb).",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The text label inside the button.",
        required: true,
      },
    ],
  },
  {
    name: "github-button",
    title: "GitHub Button",
    description:
      "A set of premium GitHub-focused action buttons with glow lines, keyframe animations, and tooltip overlays.",
    category: "buttons",
    dependencies: [],
    internalDeps: ["lib/utils", "components/ui/button"],
    filePath: "components/kanso/github-button.tsx",
    tags: ["button", "github", "social", "glow", "gradient", "tooltip", "animated"],
    usage: `import { GithubButton } from "@/components/kanso/github-button"

export default function GithubButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <GithubButton variantDesign="classic" href="https://github.com/Nagraj-13/Kanso-UI" />
      <GithubButton variantDesign="rainbow" href="https://github.com/Nagraj-13/Kanso-UI" />
      <GithubButton variantDesign="glow" href="https://github.com/Nagraj-13/Kanso-UI" glowColor="violet" />
    </div>
  )
}`,
    cssCode: `/* Add to app/globals.css */
@theme inline {
  --animate-rainbow: rainbow 3s linear infinite;
  --animate-glow-translate: border-glow-translate 6s ease-in-out infinite alternate;
  --animate-glow-translate-right: border-glow-translate-right 6s ease-in-out infinite alternate;
  --animate-glow-scale: border-glow-scale 6s ease-in-out infinite alternate;
  --animate-star-shine: star-shine 6s ease-in-out infinite alternate;

  @keyframes rainbow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes border-glow-translate {
    0% { transform: translate(-30%, -30%); }
    100% { transform: translate(30%, 30%); }
  }
  @keyframes border-glow-translate-right {
    0% { transform: translate(30%, 30%); }
    100% { transform: translate(-30%, -30%); }
  }
  @keyframes border-glow-scale {
    0% { transform: scale(0.8) translate(-50%, -50%); }
    100% { transform: scale(1.2) translate(-50%, -50%); }
  }
  @keyframes star-shine {
    0% { transform: scale(0.9) translate(-50%, -50%); opacity: 0.2; }
    100% { transform: scale(1.3) translate(-50%, -50%); opacity: 0.5; }
  }
}

.animate-rainbow-button {
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(#fff 50%, rgba(255, 255, 255, 0.6) 80%, rgba(0, 0, 0, 0)),
    linear-gradient(90deg, hsl(0, 100%, 63%), hsl(90, 100%, 63%), hsl(210, 100%, 63%), hsl(195, 100%, 63%), hsl(270, 100%, 63%)) !important;
  background-size: 100% 100%, 100% 100%, 200% 100% !important;
  background-clip: padding-box, border-box, border-box !important;
  background-origin: border-box !important;
  border: calc(0.08 * 1rem) solid transparent !important;
}

.dark .animate-rainbow-button {
  background-image: linear-gradient(#121213, #121213),
    linear-gradient(#121213 50%, rgba(18, 18, 19, 0.6) 80%, rgba(18, 18, 19, 0)),
    linear-gradient(90deg, hsl(0, 100%, 63%), hsl(90, 100%, 63%), hsl(210, 100%, 63%), hsl(195, 100%, 63%), hsl(270, 100%, 63%)) !important;
}`,
    props: [
      {
        name: "variantDesign",
        type: '"classic" | "rainbow" | "tooltip" | "glow"',
        default: '"classic"',
        description: "The visual style variation of the GitHub button.",
      },
      {
        name: "stars",
        type: "number | string",
        default: "11",
        description: "The repository star count displayed on the button.",
      },
      {
        name: "href",
        type: "string",
        description: "The target repository or profile URL.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The label text displayed inside the button (e.g. Star on GitHub).",
      },
      {
        name: "glowColor",
        type: "string",
        description: "Custom glow color (preset name or CSS color/gradient) for the glow variant.",
      },
    ],
  },
  {
    name: "shimmer-border",
    title: "Shimmer Border",
    description:
      "A container with a subtle animated shimmer effect running along its border.",
    category: "cards",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/shimmer-border.tsx",
    tags: ["border", "shimmer", "animation", "card", "glow", "css"],
    usage: `import { ShimmerBorder } from "@/components/kanso/shimmer-border"

export default function ShimmerBorderDemo() {
  return (
    <ShimmerBorder shimmerColor="rgba(255, 255, 255, 0.15)" borderRadius={12}>
      <div className="p-6">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Kanso UI</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Minimalist container.</p>
      </div>
    </ShimmerBorder>
  )
}`,
    cssCode: `/* Add to app/globals.css */
@keyframes shimmer-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`,
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
        default: '"rgba(255, 255, 255, 0.2)"',
        description: "Color of the shimmer highlight.",
      },
      {
        name: "shimmerSize",
        type: "number",
        default: "25",
        description: "Width of the shimmer conic gradient sweep as a percentage of the perimeter circle (10 to 50).",
      },
      {
        name: "duration",
        type: "number",
        default: "3.5",
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
    usage: `import { TextReveal } from "@/components/kanso/text-reveal"

export default function TextRevealDemo() {
  return (
    <TextReveal 
      text="Simplicity, Engineered." 
      className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100" 
    />
  )
}`,
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
  {
    name: "spotlight-section",
    title: "Spotlight Section",
    description:
      "A layout container featuring top and bottom gradient divider lines with ambient radial spotlights.",
    category: "effects",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/spotlight-section.tsx",
    tags: ["layout", "divider", "spotlight", "glow", "gradient", "separator"],
    usage: `import { SpotlightSection, SpotSeparator } from "@/components/kanso/spotlight-section"

export default function SpotlightSectionDemo() {
  return (
    <div className="w-full flex flex-col gap-12">
      <SpotlightSection title="Spotlight Title" spotlightColor="violet">
        <div className="py-8 text-center text-zinc-500">
          Your section content goes here.
        </div>
      </SpotlightSection>

      <SpotSeparator color="violet" width="50%" />
    </div>
  )
}`,
    props: [
      {
        name: "title",
        type: "string",
        description: "The header title displayed in the center of the top spotlight boundary.",
      },
      {
        name: "spotlightColor",
        type: '"white" | "blue" | "emerald" | "violet" | "rose" | string',
        default: '"white"',
        description: "The color theme of the spotlights and line accents. Supports preset names or custom CSS colors.",
      },
      {
        name: "intensity",
        type: '"subtle" | "medium" | "high"',
        default: '"medium"',
        description: "Controls the background spotlight glow opacity scale.",
      },
      {
        name: "variant",
        type: '"both" | "top-only" | "bottom-only"',
        default: '"both"',
        description: "Positions and renders either top, bottom, or both divider spotlight sections.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "The inner content to render within the spotlight margins.",
        required: true,
      },
    ],
  },
  {
    name: "border-glow",
    title: "Border Glow",
    description: "A premium card container featuring a dynamic, hover-sensitive conic mesh gradient border and multi-layered glow shadows tracking the mouse pointer.",
    category: "cards",
    dependencies: ["framer-motion"],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/border-glow.tsx",
    tags: ["card", "border", "glow", "mesh-gradient", "animation", "hover", "interactive"],
    usage: `import { BorderGlow } from "@/components/kanso/border-glow"

export default function BorderGlowDemo() {
  return (
    <BorderGlow animated glowColor="280 80 70">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">Glow Card</h3>
        <p className="text-zinc-400">Hover or sweep on mount.</p>
      </div>
    </BorderGlow>
  )
}`,
    props: [
      {
        name: "edgeSensitivity",
        type: "number",
        default: "30",
        description: "Sensitivity limit for edge proximity detection (0 to 100). Determines when the glow starts fading in.",
      },
      {
        name: "glowColor",
        type: "string",
        default: '"40 80 80"',
        description: "Space-separated HSL values for the outer box shadow glow (e.g. '280 80 70').",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: '"#120F17"',
        description: "Solid background color of the card body.",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "28",
        description: "Card border radius in pixels.",
      },
      {
        name: "glowRadius",
        type: "number",
        default: "40",
        description: "Spread radius of the outer shadow glow in pixels.",
      },
      {
        name: "glowIntensity",
        type: "number",
        default: "1.0",
        description: "Opacity intensity scale for the outer box shadow glow.",
      },
      {
        name: "coneSpread",
        type: "number",
        default: "25",
        description: "Angle spread of the conic gradient mask in degrees.",
      },
      {
        name: "animated",
        type: "boolean",
        default: "false",
        description: "Triggers a full 360-degree border sweep and glow fade-in animation on mount.",
      },
      {
        name: "colors",
        type: "string[]",
        default: '["#c084fc", "#f472b6", "#38bdf8"]',
        description: "Custom colors list to generate the background mesh gradient.",
      },
      {
        name: "fillOpacity",
        type: "number",
        default: "0.5",
        description: "Opacity level of the inner card mesh gradient (0 to 1).",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content to render inside the card.",
        required: true,
      },
    ],
  },
  {
    name: "spotlight-card",
    title: "Spotlight Card",
    description: "A layout container with a subtle ambient spotlight that follows the cursor on hover.",
    category: "cards",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/spotlight-card.tsx",
    tags: ["card", "spotlight", "hover", "interactive", "minimalist", "ambient"],
    usage: `import { SpotlightCard } from "@/components/kanso/spotlight-card"

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)">
      <div className="p-6">
        <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">Interactive Spot</h3>
        <p className="text-zinc-500">Move your cursor over this card.</p>
      </div>
    </SpotlightCard>
  )
}`,
    props: [
      {
        name: "spotlightColor",
        type: "string",
        description: "Custom spotlight radial gradient color. Defaults automatically based on theme.",
      },
      {
        name: "spotlightSize",
        type: "number",
        default: "300",
        description: "The width/height radius of the radial gradient spotlight in pixels.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content to render inside the spotlight container.",
        required: true,
      },
    ],
  },
  {
    name: "three-d-card",
    title: "3D Card",
    description: "An interactive 3D perspective layout system that tilts toward the cursor and elevates layered children elements along the Z-axis.",
    category: "cards",
    dependencies: [],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/three-d-card.tsx",
    tags: ["card", "3d", "perspective", "tilt", "hover", "elevate", "interactive"],
    usage: `import { CardContainer, CardBody, CardItem } from "@/components/kanso/three-d-card"

export default function ThreeDCardDemo() {
  return (
    <CardContainer>
      <CardBody className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <CardItem translateZ={20} className="text-xl font-bold text-zinc-900 dark:text-white">
          Tactile 3D Card
        </CardItem>
        <CardItem translateZ={40} className="mt-2 text-zinc-500">
          This element floats further out than others.
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}`,
    props: [
      {
        name: "containerClassName",
        type: "string",
        description: "Additional CSS classes for the outermost perspective container.",
      },
      {
        name: "tiltSensitivity",
        type: "number",
        default: "25",
        description: "How much the card tilts when hovered (lower values tilt more).",
      },
      {
        name: "translateX",
        type: "number | string",
        default: "0",
        description: "Distance (pixels or css units) to translate CardItem along X-axis on hover.",
      },
      {
        name: "translateY",
        type: "number | string",
        default: "0",
        description: "Distance (pixels or css units) to translate CardItem along Y-axis on hover.",
      },
      {
        name: "translateZ",
        type: "number | string",
        default: "0",
        description: "Distance (pixels or css units) to elevate CardItem along Z-axis on hover.",
      },
      {
        name: "rotateX",
        type: "number | string",
        default: "0",
        description: "Degrees of rotation of CardItem around X-axis on hover.",
      },
      {
        name: "rotateY",
        type: "number | string",
        default: "0",
        description: "Degrees of rotation of CardItem around Y-axis on hover.",
      },
      {
        name: "rotateZ",
        type: "number | string",
        default: "0",
        description: "Degrees of rotation of CardItem around Z-axis on hover.",
      },
    ],
  },
  {
    name: "interactive-card",
    title: "Interactive Card",
    description: "An all-in-one premium card component combining 3D perspective tilt, cursor spotlight, and edge conic mesh gradient border glows.",
    category: "cards",
    dependencies: ["framer-motion"],
    internalDeps: ["lib/utils"],
    filePath: "components/kanso/interactive-card.tsx",
    tags: ["card", "3d", "spotlight", "border", "glow", "mesh-gradient", "interactive"],
    usage: `import { InteractiveCard, CardBody, CardItem } from "@/components/kanso/interactive-card"

export default function InteractiveCardDemo() {
  return (
    <InteractiveCard animated glowColor="280 80 70">
      <CardBody className="p-6">
        <CardItem translateZ={40} className="text-lg font-bold text-white">
          All-in-one Card
        </CardItem>
        <CardItem translateZ={20} className="text-zinc-400 mt-2">
          Features 3D tilt, spotlight, and border glows.
        </CardItem>
      </CardBody>
    </InteractiveCard>
  )
}`,
    props: [
      {
        name: "edgeSensitivity",
        type: "number",
        default: "30",
        description: "Proximity limit for edge-bound border glow activation.",
      },
      {
        name: "glowColor",
        type: "string",
        default: '"40 80 80"',
        description: "HSL settings for outer box shadow overlays.",
      },
      {
        name: "backgroundColor",
        type: "string",
        default: '"#120F17"',
        description: "Main background color of card body.",
      },
      {
        name: "borderRadius",
        type: "number",
        default: "28",
        description: "Radius in pixels.",
      },
      {
        name: "glowRadius",
        type: "number",
        default: "40",
        description: "Shadow spread distance in pixels.",
      },
      {
        name: "glowIntensity",
        type: "number",
        default: "1.0",
        description: "Intensity of the shadow overlays.",
      },
      {
        name: "coneSpread",
        type: "number",
        default: "25",
        description: "Degrees width of conic glow masks.",
      },
      {
        name: "animated",
        type: "boolean",
        default: "false",
        description: "Whether to run a 360-degree sweep animation on mount.",
      },
      {
        name: "colors",
        type: "string[]",
        default: '["#c084fc", "#f472b6", "#38bdf8"]',
        description: "Mesh colors array.",
      },
      {
        name: "fillOpacity",
        type: "number",
        default: "0.5",
        description: "Opacity scale of inner mesh gradients.",
      },
      {
        name: "spotlightColor",
        type: "string",
        description: "Custom spotlight radial overlay color. Defaults automatically to dark/light templates.",
      },
      {
        name: "spotlightSize",
        type: "number",
        default: "300",
        description: "Radius width of spotlight circle overlays in pixels.",
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
