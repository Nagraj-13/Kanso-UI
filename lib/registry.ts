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
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export interface RegistryComponent {
  /** Unique kebab-case identifier (used in URLs and CLI) */
  name: string;
  /** Display title */
  title: string;
  /** One-line description */
  description: string;
  /** Component category for grouping */
  category:
    | 'effects'
    | 'buttons'
    | 'cards'
    | 'layout'
    | 'typography'
    | 'feedback'
    | 'data-display';
  /** npm dependencies required */
  dependencies: string[];
  /** Internal Kanso files this component depends on */
  internalDeps: string[];
  /** Path to component source file (relative to project root) */
  filePath: string;
  /** Searchable tags */
  tags: string[];
  /** Component props documentation */
  props: RegistryComponentProp[];
  /** Usage snippet showing how to import and use the component */
  usage?: string;
  /** Custom CSS required to be added in globals.css (optional) */
  cssCode?: string;
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
    name: 'blur-reveal-code',
    title: 'Blur Reveal Code',
    description:
      'An interactive, premium code element that reveals blurred digits sequentially as you glide your cursor over them.',
    category: 'typography',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/blur-reveal-code.tsx',
    tags: ['text', 'blur', 'reveal', 'interactive', 'hover', 'glide'],
    usage: `import { BlurRevealCode } from "@/components/kanso/blur-reveal-code"

export default function BlurRevealCodeDemo() {
  return (
    <BlurRevealCode 
      code="034872" 
      label="Glide To Reveal Secret Code" 
    />
  )
}`,
    props: [
      {
        name: 'code',
        type: 'string',
        default: '"034872"',
        description: 'The string of characters to display and reveal.',
      },
      {
        name: 'label',
        type: 'React.ReactNode',
        default: '"Glide To Reveal Secret Code"',
        description: 'The label rendered above the interactive digits.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply.',
      },
    ],
  },
  {
    name: 'noise-card',
    title: 'Noise Card',
    description:
      'A premium card component featuring customizable background themes, optimized animated noise overlays, and interactive hover spotlight effects.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/noise-card.tsx',
    tags: [
      'card',
      'noise',
      'grain',
      'spotlight',
      'hover',
      'interactive',
      'glow',
    ],
    usage: `import { NoiseCard } from "@/components/kanso/noise-card"

export default function NoiseCardDemo() {
  return (
    <NoiseCard theme="indigo" className="w-96 h-72">
      <div className="flex flex-col justify-between h-full">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Card Element</span>
          <h3 className="text-xl font-bold mt-1 text-white">Indigo Noise</h3>
        </div>
        <p className="text-sm text-zinc-400">
          A premium card component with optimized noise overlays and hover effects.
        </p>
      </div>
    </NoiseCard>
  )
}`,
    props: [
      {
        name: 'theme',
        type: '"kanso" | "indigo" | "sunset" | "light" | "glass" | "none"',
        default: '"kanso"',
        description:
          'The visual theme preset of the card background and borders.',
      },
      {
        name: 'width',
        type: 'string',
        default: '"w-full"',
        description: 'The width utility class or value of the card container.',
      },
      {
        name: 'height',
        type: 'string',
        default: '"h-auto"',
        description: 'The height utility class or value of the card container.',
      },
      {
        name: 'noiseOpacity',
        type: 'number',
        description:
          'The opacity of the noise overlay (0 to 1). Defaults to theme-specific presets.',
      },
      {
        name: 'grainSize',
        type: 'number',
        default: '1',
        description: 'Pixel size of the noise grains.',
      },
      {
        name: 'animated',
        type: 'boolean',
        default: 'true',
        description: 'Whether the noise pattern is animated.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'true',
        description:
          'Enables custom interactive mouse spotlight tracking and lift effects.',
      },
      {
        name: 'spotlightColor',
        type: 'string',
        description: 'Override for the hover spotlight color.',
      },
      {
        name: 'spotlightSize',
        type: 'number',
        default: '300',
        description:
          'The size/radius of the spotlight gradient circle in pixels.',
      },
      {
        name: 'bgColor',
        type: 'string',
        default: '"bg-[#0014FF]"',
        description:
          'Background color override, only used if theme is set to "none".',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply custom overrides.',
      },
    ],
  },
  {
    name: 'feature-grid-card',
    title: 'Feature Grid Card',
    description:
      'A sleek hover card revealing an illuminated grid background with animated tiles and glowing grid lines.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/feature-grid-card.tsx',
    tags: ['card', 'grid', 'hover', 'animation', 'tiles', 'interactive'],
    usage: `import { FeatureGridCard } from "@/components/kanso/feature-grid-card"
import { LayoutGrid } from "lucide-react"

export default function FeatureGridCardDemo() {
  return (
    <div className="max-w-xs mx-auto">
      <FeatureGridCard 
        icon={<LayoutGrid className="w-full h-full" />}
        title="Products"
        description="Standard chunk of Lorem Ipsum used since the 1500s is showed below for those interested."
      />
    </div>
  )
}`,
    cssCode: `/* Add to app/globals.css */
@keyframes kanso-tile {
  0%, 12.5%, 100% { opacity: 1; }
  25%, 82.5% { opacity: 0; }
}`,
    props: [
      {
        name: 'icon',
        type: 'React.ReactNode',
        description: 'Icon element rendered at the top of the card.',
      },
      {
        name: 'title',
        type: 'React.ReactNode',
        description: 'Main title of the card.',
        required: true,
      },
      {
        name: 'description',
        type: 'React.ReactNode',
        description: 'Description text below the title.',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes for the card container.',
      },
    ],
  },
  {
    name: 'button',
    title: 'Button',
    description:
      'A versatile, minimalist button component with support for multiple aesthetic variants, sizes, and states.',
    category: 'buttons',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/button.tsx',
    tags: [
      'button',
      'variants',
      'primary',
      'secondary',
      'outline',
      'ghost',
      'interactive',
    ],
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
        name: 'variant',
        type: '"primary" | "secondary" | "outline" | "ghost" | "link"',
        default: '"primary"',
        description: 'The visual style variant of the button.',
      },
      {
        name: 'color',
        type: '"zinc" | "blue" | "emerald" | "violet" | "amber" | "rose"',
        default: '"zinc"',
        description: 'The color theme of the button across its variants.',
      },
      {
        name: 'size',
        type: '"default" | "sm" | "lg" | "icon"',
        default: '"default"',
        description: 'The height and padding scale of the button.',
      },
      {
        name: 'inactive',
        type: 'boolean',
        default: 'false',
        description:
          'When true, disables interactions and styles the button as inactive.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The content (text, label, or icons) inside the button.',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply custom overrides.',
      },
    ],
  },
  {
    name: 'magnetic-button',
    title: 'Magnetic Button',
    description:
      'A button that magnetically follows the cursor on hover using spring physics.',
    category: 'buttons',
    dependencies: ['framer-motion'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/magnetic-button.tsx',
    tags: ['button', 'hover', 'animation', 'magnetic', 'interactive'],
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
        name: 'variant',
        type: '"default" | "outline"',
        default: '"default"',
        description: 'The visual style variant of the button.',
      },
      {
        name: 'magneticStrength',
        type: 'number',
        default: '0.3',
        description: 'Strength of the magnetic pull effect (0 to 1).',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to render inside the button.',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes to apply.',
      },
    ],
  },
  {
    name: 'realism-button',
    title: 'Realism Button',
    description:
      'A glossy glassmorphism button featuring dynamic, glowing color blur blobs.',
    category: 'buttons',
    dependencies: [],
    internalDeps: ['lib/utils', 'components/ui/button'],
    filePath: 'components/kanso/realism-button.tsx',
    tags: ['button', 'glossy', 'glassmorphism', 'glow', 'gradient', 'realism'],
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
        name: 'variantColor',
        type: '"cyan" | "rose" | "emerald" | "violet"',
        default: '"cyan"',
        description: 'The color theme of the glowing background blobs.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The label text or content inside the button.',
        required: true,
      },
    ],
  },
  {
    name: 'keyboard-button',
    title: 'Keyboard Button',
    description:
      'A tactile 3D keyboard keycap style button with realistic shadows and perspective active press physics.',
    category: 'buttons',
    dependencies: [],
    internalDeps: ['lib/utils', 'components/ui/button'],
    filePath: 'components/kanso/keyboard-button.tsx',
    tags: ['button', 'keyboard', 'keycap', '3d', 'tactile', 'shadow'],
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
        name: 'variantColor',
        type: '"dark" | "light" | "blue"',
        default: '"dark"',
        description: 'The keycap color variation.',
      },
      {
        name: 'icon',
        type: 'React.ReactNode',
        description:
          'An optional symbol or key icon displayed at the top left of the keycap.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The uppercase text label of the keycap action.',
        required: true,
      },
    ],
  },
  {
    name: 'glow-line-button',
    title: 'Glow Line Button',
    description:
      'A sleek dark button with a radial gradient background and a glowing border outline on hover.',
    category: 'buttons',
    dependencies: [],
    internalDeps: ['lib/utils', 'components/ui/button'],
    filePath: 'components/kanso/glow-line-button.tsx',
    tags: ['button', 'glow', 'dark', 'outline', 'line', 'minimal'],
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
        name: 'glowColor',
        type: '"white" | "blue" | "emerald" | "violet" | "rose" | string',
        default: '"white"',
        description:
          'The color of the bottom glow line. Supports color presets or custom values (hex/rgb).',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'The text label inside the button.',
        required: true,
      },
    ],
  },
  {
    name: 'github-button',
    title: 'GitHub Button',
    description:
      'A set of premium GitHub-focused action buttons with glow lines, keyframe animations, and tooltip overlays.',
    category: 'buttons',
    dependencies: [],
    internalDeps: ['lib/utils', 'components/ui/button'],
    filePath: 'components/kanso/github-button.tsx',
    tags: [
      'button',
      'github',
      'social',
      'glow',
      'gradient',
      'tooltip',
      'animated',
    ],
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
        name: 'variantDesign',
        type: '"classic" | "rainbow" | "tooltip" | "glow"',
        default: '"classic"',
        description: 'The visual style variation of the GitHub button.',
      },
      {
        name: 'stars',
        type: 'number | string',
        default: '11',
        description: 'The repository star count displayed on the button.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'The target repository or profile URL.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description:
          'The label text displayed inside the button (e.g. Star on GitHub).',
      },
      {
        name: 'glowColor',
        type: 'string',
        description:
          'Custom glow color (preset name or CSS color/gradient) for the glow variant.',
      },
    ],
  },
  {
    name: 'three-d-masonry-orbit',
    title: '3D Masonry Orbit',
    description:
      'An interactive 3D cylindrical gallery that orbits images in a masonry layout. Responds to mouse drags, scrolls, and raycasted hover-scaling.',
    category: 'data-display',
    dependencies: ['three', '@types/three'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/three-d-masonry-orbit.tsx',
    tags: [
      '3d',
      'gallery',
      'orbit',
      'masonry',
      'threejs',
      'hover',
      'interactive',
    ],
    usage: `import { ThreeDMasonryOrbit } from "@/components/kanso/three-d-masonry-orbit"

export default function ThreeDMasonryOrbitDemo() {
  return (
    <div className="w-full h-[600px] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-[#09090b]">
      <ThreeDMasonryOrbit height="100%" />
    </div>
  )
}`,
    props: [
      {
        name: 'images',
        type: 'string[]',
        description:
          'List of image URLs. If omitted, uses a curated list of anime/aesthetic images.',
      },
      {
        name: 'columns',
        type: 'number',
        default: '14',
        description: 'Number of columns around the circle.',
      },
      {
        name: 'rows',
        type: 'number',
        default: '3',
        description: 'Number of vertical tiers.',
      },
      {
        name: 'radius',
        type: 'number',
        default: '16',
        description: 'Orbit radius distance from the center.',
      },
      {
        name: 'autoRotationSpeed',
        type: 'number',
        default: '0.002',
        description: 'Base auto-rotation speed around the Y axis.',
      },
      {
        name: 'fogColor',
        type: 'string',
        default: '"#09090b"',
        description: 'Background/fog color.',
      },
      {
        name: 'fogDensity',
        type: 'number',
        default: '0.025',
        description: 'Fog density coefficient.',
      },
      {
        name: 'height',
        type: 'string | number',
        default: '"100vh"',
        description: 'Height of the viewport/canvas container.',
      },
      {
        name: 'hideUI',
        type: 'boolean',
        default: 'false',
        description: 'When true, hides the overlay title/desc text.',
      },
      {
        name: 'titleText',
        type: 'string',
        default: '"Gallery"',
        description: 'Custom overlay title text.',
      },
      {
        name: 'descText',
        type: 'string',
        default: '"Drag to explore • Hover to focus"',
        description: 'Custom overlay description text.',
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '0.15',
        description: 'Card border radius in 3D world units.',
      },
      {
        name: 'columnSpacing',
        type: 'number',
        default: '1.0',
        description: 'Column width/spacing multiplier factor.',
      },
    ],
  },
  {
    name: 'three-d-carousel',
    title: '3D Carousel',
    description:
      'A lightweight, high-performance 3D image carousel with physics-based drag inertia, autoplay spin, and cursor hover tilting.',
    category: 'data-display',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/three-d-carousel.tsx',
    tags: [
      '3d',
      'carousel',
      'gallery',
      'orbit',
      'drag',
      'inertia',
      'interactive',
    ],
    usage: `import { ThreeDCarousel } from "@/components/kanso/three-d-carousel"

export default function ThreeDCarouselDemo() {
  return (
    <div className="w-full h-[500px] overflow-hidden">
      <ThreeDCarousel />
    </div>
  )
}`,
    props: [
      {
        name: 'images',
        type: 'string[]',
        description: 'Array of custom image URLs to display in the carousel.',
      },
      {
        name: 'radius',
        type: 'number',
        default: '240',
        description: 'Outer orbit cylinder radius in pixels.',
      },
      {
        name: 'cardW',
        type: 'number',
        default: '180',
        description: 'Width of each card in pixels.',
      },
      {
        name: 'cardH',
        type: 'number',
        default: '240',
        description: 'Height of each card in pixels.',
      },
      {
        name: 'autoSpin',
        type: 'boolean',
        default: 'true',
        description: 'Whether the carousel auto-spins when idle.',
      },
    ],
  },
  {
    name: 'sphere-carousel',
    title: 'Sphere Carousel',
    description:
      'A premium 3D holographic sphere carousel distributing circular image cards evenly via Fibonacci points, featuring dual-axis drag inertia, autoplay spinning, and camera depth-of-field blur.',
    category: 'data-display',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/sphere-carousel.tsx',
    tags: [
      '3d',
      'carousel',
      'sphere',
      'orbit',
      'gallery',
      'drag',
      'inertia',
      'interactive',
    ],
    usage: `import { SphereCarousel } from "@/components/kanso/sphere-carousel"

export default function SphereCarouselDemo() {
  return (
    <div className="w-full h-[550px] overflow-hidden">
      <SphereCarousel />
    </div>
  )
}`,
    props: [
      {
        name: 'images',
        type: 'string[]',
        description: 'Array of image URLs to render inside the sphere.',
      },
      {
        name: 'radius',
        type: 'number',
        default: '200',
        description: 'Radius of the sphere in pixels.',
      },
      {
        name: 'cardSize',
        type: 'number',
        default: '100',
        description: 'Width and height of the circular cards in pixels.',
      },
      {
        name: 'autoSpin',
        type: 'boolean',
        default: 'true',
        description: 'Whether the sphere auto-spins when idle.',
      },
    ],
  },
  {
    name: 'three-d-photo-carousel',
    title: '3D Photo Carousel',
    description:
      'A responsive 3D cylindrical image carousel built with Framer Motion. Responds to drag rotation, handles image modal expansions, and supports custom spacing, border-radius, and keyboard interactions.',
    category: 'data-display',
    dependencies: ['framer-motion'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/three-d-photo-carousel.tsx',
    tags: [
      '3d',
      'carousel',
      'gallery',
      'orbit',
      'framer-motion',
      'drag',
      'interactive',
    ],
    usage: `import { ThreeDPhotoCarousel } from "@/components/kanso/three-d-photo-carousel"

export default function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/5 dark:bg-zinc-950/40">
      <ThreeDPhotoCarousel height="500px" />
    </div>
  )
}`,
    props: [
      {
        name: 'images',
        type: 'string[]',
        description:
          'Array of image URLs. If omitted, uses curated aesthetic anime/cyberpunk images.',
      },
      {
        name: 'spacing',
        type: 'number',
        default: '1.0',
        description:
          'Cylinder width multiplier scale factor. Controls column distance from center.',
      },
      {
        name: 'borderRadius',
        type: 'string',
        default: '"12px"',
        description: 'Border radius of the carousel cards.',
      },
      {
        name: 'cylinderWidth',
        type: 'number',
        default: '1800',
        description: 'Cylinder width at full desktop viewport.',
      },
      {
        name: 'height',
        type: 'string | number',
        default: '"500px"',
        description: 'Height of the carousel viewport.',
      },
      {
        name: 'autoRotationSpeed',
        type: 'number',
        default: '0',
        description:
          'Auto rotation speed (degrees per frame). Use 0 to disable.',
      },
      {
        name: 'hideOverlayUI',
        type: 'boolean',
        default: 'false',
        description: 'Hide the overlay caption UI in the enlarged modal.',
      },
    ],
  },
  {
    name: 'shimmer-border',
    title: 'Shimmer Border',
    description:
      'A container with a subtle animated shimmer effect running along its border.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/shimmer-border.tsx',
    tags: ['border', 'shimmer', 'animation', 'card', 'glow', 'css'],
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
        name: 'borderRadius',
        type: 'number',
        default: '12',
        description: 'Border radius in pixels.',
      },
      {
        name: 'shimmerColor',
        type: 'string',
        default: '"rgba(255, 255, 255, 0.2)"',
        description: 'Color of the shimmer highlight.',
      },
      {
        name: 'shimmerSize',
        type: 'number',
        default: '25',
        description:
          'Width of the shimmer conic gradient sweep as a percentage of the perimeter circle (10 to 50).',
      },
      {
        name: 'duration',
        type: 'number',
        default: '3.5',
        description: 'Animation cycle duration in seconds.',
      },
      {
        name: 'borderWidth',
        type: 'number',
        default: '1.5',
        description: 'Width of the shimmer border in pixels.',
      },
      {
        name: 'background',
        type: 'string',
        description: 'Background color of the inner content area.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to render inside the bordered container.',
        required: true,
      },
    ],
  },
  {
    name: 'text-reveal',
    title: 'Text Reveal',
    description:
      'Text that reveals character by character with a blur effect when scrolled into view.',
    category: 'typography',
    dependencies: ['framer-motion'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/text-reveal.tsx',
    tags: ['text', 'reveal', 'scroll', 'animation', 'typography', 'stagger'],
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
        name: 'text',
        type: 'string',
        description: 'The text string to reveal.',
        required: true,
      },
      {
        name: 'delay',
        type: 'number',
        default: '0',
        description: 'Delay before animation starts in seconds.',
      },
      {
        name: 'staggerDelay',
        type: 'number',
        default: '0.03',
        description: 'Delay between each character reveal in seconds.',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS classes for styling the text.',
      },
    ],
  },
  {
    name: 'spotlight-section',
    title: 'Spotlight Section',
    description:
      'A layout container featuring top and bottom gradient divider lines with ambient radial spotlights.',
    category: 'effects',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/spotlight-section.tsx',
    tags: ['layout', 'divider', 'spotlight', 'glow', 'gradient', 'separator'],
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
        name: 'title',
        type: 'string',
        description:
          'The header title displayed in the center of the top spotlight boundary.',
      },
      {
        name: 'spotlightColor',
        type: '"white" | "blue" | "emerald" | "violet" | "rose" | string',
        default: '"white"',
        description:
          'The color theme of the spotlights and line accents. Supports preset names or custom CSS colors.',
      },
      {
        name: 'intensity',
        type: '"subtle" | "medium" | "high"',
        default: '"medium"',
        description: 'Controls the background spotlight glow opacity scale.',
      },
      {
        name: 'variant',
        type: '"both" | "top-only" | "bottom-only"',
        default: '"both"',
        description:
          'Positions and renders either top, bottom, or both divider spotlight sections.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description:
          'The inner content to render within the spotlight margins.',
        required: true,
      },
    ],
  },
  {
    name: 'border-glow',
    title: 'Border Glow',
    description:
      'A premium card container featuring a dynamic, hover-sensitive conic mesh gradient border and multi-layered glow shadows tracking the mouse pointer.',
    category: 'cards',
    dependencies: ['framer-motion'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/border-glow.tsx',
    tags: [
      'card',
      'border',
      'glow',
      'mesh-gradient',
      'animation',
      'hover',
      'interactive',
    ],
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
        name: 'edgeSensitivity',
        type: 'number',
        default: '30',
        description:
          'Sensitivity limit for edge proximity detection (0 to 100). Determines when the glow starts fading in.',
      },
      {
        name: 'glowColor',
        type: 'string',
        default: '"40 80 80"',
        description:
          "Space-separated HSL values for the outer box shadow glow (e.g. '280 80 70').",
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: '"#120F17"',
        description: 'Solid background color of the card body.',
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '28',
        description: 'Card border radius in pixels.',
      },
      {
        name: 'glowRadius',
        type: 'number',
        default: '40',
        description: 'Spread radius of the outer shadow glow in pixels.',
      },
      {
        name: 'glowIntensity',
        type: 'number',
        default: '1.0',
        description: 'Opacity intensity scale for the outer box shadow glow.',
      },
      {
        name: 'coneSpread',
        type: 'number',
        default: '25',
        description: 'Angle spread of the conic gradient mask in degrees.',
      },
      {
        name: 'animated',
        type: 'boolean',
        default: 'false',
        description:
          'Triggers a full 360-degree border sweep and glow fade-in animation on mount.',
      },
      {
        name: 'colors',
        type: 'string[]',
        default: '["#c084fc", "#f472b6", "#38bdf8"]',
        description:
          'Custom colors list to generate the background mesh gradient.',
      },
      {
        name: 'fillOpacity',
        type: 'number',
        default: '0.5',
        description: 'Opacity level of the inner card mesh gradient (0 to 1).',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to render inside the card.',
        required: true,
      },
    ],
  },
  {
    name: 'spotlight-card',
    title: 'Spotlight Card',
    description:
      'A layout container with a subtle ambient spotlight that follows the cursor on hover.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/spotlight-card.tsx',
    tags: [
      'card',
      'spotlight',
      'hover',
      'interactive',
      'minimalist',
      'ambient',
    ],
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
        name: 'spotlightColor',
        type: 'string',
        description:
          'Custom spotlight radial gradient color. Defaults automatically based on theme.',
      },
      {
        name: 'spotlightSize',
        type: 'number',
        default: '300',
        description:
          'The width/height radius of the radial gradient spotlight in pixels.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to render inside the spotlight container.',
        required: true,
      },
    ],
  },
  {
    name: 'three-d-card',
    title: '3D Card',
    description:
      'An interactive 3D perspective layout system that tilts toward the cursor and elevates layered children elements along the Z-axis.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/three-d-card.tsx',
    tags: [
      'card',
      '3d',
      'perspective',
      'tilt',
      'hover',
      'elevate',
      'interactive',
    ],
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
        name: 'containerClassName',
        type: 'string',
        description:
          'Additional CSS classes for the outermost perspective container.',
      },
      {
        name: 'tiltSensitivity',
        type: 'number',
        default: '25',
        description:
          'How much the card tilts when hovered (lower values tilt more).',
      },
      {
        name: 'translateX',
        type: 'number | string',
        default: '0',
        description:
          'Distance (pixels or css units) to translate CardItem along X-axis on hover.',
      },
      {
        name: 'translateY',
        type: 'number | string',
        default: '0',
        description:
          'Distance (pixels or css units) to translate CardItem along Y-axis on hover.',
      },
      {
        name: 'translateZ',
        type: 'number | string',
        default: '0',
        description:
          'Distance (pixels or css units) to elevate CardItem along Z-axis on hover.',
      },
      {
        name: 'rotateX',
        type: 'number | string',
        default: '0',
        description: 'Degrees of rotation of CardItem around X-axis on hover.',
      },
      {
        name: 'rotateY',
        type: 'number | string',
        default: '0',
        description: 'Degrees of rotation of CardItem around Y-axis on hover.',
      },
      {
        name: 'rotateZ',
        type: 'number | string',
        default: '0',
        description: 'Degrees of rotation of CardItem around Z-axis on hover.',
      },
    ],
  },
  {
    name: 'interactive-card',
    title: 'Interactive Card',
    description:
      'An all-in-one premium card component combining 3D perspective tilt, cursor spotlight, and edge conic mesh gradient border glows.',
    category: 'cards',
    dependencies: ['framer-motion'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/interactive-card.tsx',
    tags: [
      'card',
      '3d',
      'spotlight',
      'border',
      'glow',
      'mesh-gradient',
      'interactive',
    ],
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
        name: 'edgeSensitivity',
        type: 'number',
        default: '30',
        description: 'Proximity limit for edge-bound border glow activation.',
      },
      {
        name: 'glowColor',
        type: 'string',
        default: '"40 80 80"',
        description: 'HSL settings for outer box shadow overlays.',
      },
      {
        name: 'backgroundColor',
        type: 'string',
        default: '"#120F17"',
        description: 'Main background color of card body.',
      },
      {
        name: 'borderRadius',
        type: 'number',
        default: '28',
        description: 'Radius in pixels.',
      },
      {
        name: 'glowRadius',
        type: 'number',
        default: '40',
        description: 'Shadow spread distance in pixels.',
      },
      {
        name: 'glowIntensity',
        type: 'number',
        default: '1.0',
        description: 'Intensity of the shadow overlays.',
      },
      {
        name: 'coneSpread',
        type: 'number',
        default: '25',
        description: 'Degrees width of conic glow masks.',
      },
      {
        name: 'animated',
        type: 'boolean',
        default: 'false',
        description: 'Whether to run a 360-degree sweep animation on mount.',
      },
      {
        name: 'colors',
        type: 'string[]',
        default: '["#c084fc", "#f472b6", "#38bdf8"]',
        description: 'Mesh colors array.',
      },
      {
        name: 'fillOpacity',
        type: 'number',
        default: '0.5',
        description: 'Opacity scale of inner mesh gradients.',
      },
      {
        name: 'spotlightColor',
        type: 'string',
        description:
          'Custom spotlight radial overlay color. Defaults automatically to dark/light templates.',
      },
      {
        name: 'spotlightSize',
        type: 'number',
        default: '300',
        description: 'Radius width of spotlight circle overlays in pixels.',
      },
    ],
  },
  {
    name: 'liquid-metal-card',
    title: 'Liquid Metal Card',
    description:
      'A premium minimalist card featuring a real-time, interactive WebGL liquid metal shader overlay.',
    category: 'cards',
    dependencies: ['@paper-design/shaders-react'],
    internalDeps: ['lib/utils', 'components/ui/button', 'components/ui/badge'],
    filePath: 'components/kanso/liquid-metal-card.tsx',
    tags: [
      'card',
      'shader',
      'webgl',
      'liquid-metal',
      'interactive',
      'animation',
    ],
    usage: `import { LiquidMetalCard } from "@/components/kanso/liquid-metal-card"

export default function LiquidMetalCardDemo() {
  return (
    <LiquidMetalCard
      title="Liquid Metal"
      subtitle="Interact"
      description="WebGL liquid metal shader effect running on a Kanso UI card container."
      className="max-w-sm"
    />
  )
}`,
    props: [
      {
        name: 'srTitle',
        type: 'string',
        default: '"Kanso UI"',
        description: 'Screen reader only title of the card.',
      },
      {
        name: 'title',
        type: 'React.ReactNode',
        default: 'Kanso UI',
        description: 'The primary header text of the card.',
      },
      {
        name: 'subtitle',
        type: 'React.ReactNode',
        default: 'Simplicity',
        description: 'Secondary header suffix or subtitle text.',
      },
      {
        name: 'description',
        type: 'React.ReactNode',
        description: 'The main description body copy text of the card.',
      },
      {
        name: 'showCta',
        type: 'boolean',
        default: 'true',
        description: 'Whether to render the action CTA button.',
      },
      {
        name: 'ctaProps',
        type: 'Partial<LiquidMetalCardCTAProps>',
        description:
          'Custom configuration props passed directly to the CTA button link.',
      },
      {
        name: 'showBadges',
        type: 'boolean',
        default: 'true',
        description: 'Whether to display the metadata tech stack badges row.',
      },
      {
        name: 'techStack',
        type: 'LiquidMetalCardTechItem[]',
        description:
          'Array of tech elements (name, version, icon) to show inside the badges row.',
      },
      {
        name: 'desktopShaderProps',
        type: 'Partial<LiquidMetalProps>',
        description: 'Shader custom parameters specifically for desktop sizes.',
      },
      {
        name: 'mobileShaderProps',
        type: 'Partial<LiquidMetalProps>',
        description: 'Shader custom parameters specifically for mobile sizes.',
      },
    ],
  },
  {
    name: 'halftone-image',
    title: 'Halftone Image',
    description:
      'Convert any image into a gorgeous, interactive halftone dither artwork with mouse hover distortion.',
    category: 'effects',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/halftone-image.tsx',
    tags: ['image', 'halftone', 'dither', 'canvas', 'hover', 'interactive'],
    usage: `import { HalftoneImage } from "@/components/kanso/halftone-image"

export default function HalftoneImageDemo() {
  return (
    <div className="w-[300px] h-[300px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
      <HalftoneImage
        src="/avatar.jpg"
        dotSpacing={7}
        contrast={1.3}
        inkColor="currentColor"
        paperColor="transparent"
      />
    </div>
  )
}`,
    props: [
      {
        name: 'src',
        type: 'string',
        required: true,
        description: 'The source image URL.',
      },
      {
        name: 'dotSpacing',
        type: 'number',
        default: '8',
        description:
          'The spacing between dots in pixels (density). Lower value = higher detail.',
      },
      {
        name: 'maxDotRadius',
        type: 'number',
        description: 'The maximum dot radius. Defaults to dotSpacing * 0.7.',
      },
      {
        name: 'inkColor',
        type: 'string',
        default: '"currentColor"',
        description:
          "Color of the halftone dots. If 'currentColor', it reads the text color of parent elements.",
      },
      {
        name: 'colors',
        type: 'string[]',
        description: 'Multiple colors for halftone dots to cycle through.',
      },
      {
        name: 'paperColor',
        type: 'string',
        default: '"transparent"',
        description:
          "Color of the background paper layer. If 'transparent', the original page background shows through.",
      },
      {
        name: 'contrast',
        type: 'number',
        default: '1.2',
        description:
          'Contrast adjustment factor (e.g. 1.0 = normal, 1.5 = high contrast).',
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description:
          'Brightness adjustment factor (e.g. 1.0 = normal, 1.2 = brighter).',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'true',
        description: 'Toggle interactive mouse hover warp effect.',
      },
      {
        name: 'hoverRadius',
        type: 'number',
        default: '100',
        description: 'The radius of mouse influence for distortion in pixels.',
      },
      {
        name: 'distortionStrength',
        type: 'number',
        default: '8',
        description: 'The strength of the warping push/pull distortion.',
      },
      {
        name: 'dotScaleStrength',
        type: 'number',
        default: '1.2',
        description:
          'Scale factor of the dots under the cursor (e.g., 0.5 to shrink, 1.5 to grow).',
      },
    ],
  },
  {
    name: 'halftone-grid',
    title: 'Halftone Grid',
    description:
      "An interactive, mouse-responsive dithered background grid that modulates dot sizes dynamically based on the cursor's proximity.",
    category: 'effects',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/halftone-grid.tsx',
    tags: ['grid', 'background', 'dots', 'ripple', 'hover', 'interactive'],
    usage: `import { HalftoneGrid } from "@/components/kanso/halftone-grid"

export default function HalftoneGridDemo() {
  return (
    <div className="w-full h-[300px] border border-zinc-200 dark:border-zinc-800 rounded-xl relative overflow-hidden bg-zinc-950">
      <HalftoneGrid
        dotRadius={1.5}
        dotSpacing={12}
        gradientFrom="rgba(168, 85, 247, 0.35)"
        gradientTo="rgba(180, 151, 207, 0.25)"
        glowColor="#120F17"
        sparkle={true}
      />
    </div>
  )
}`,
    props: [
      {
        name: 'dotRadius',
        type: 'number',
        default: '1.5',
        description: 'The base radius of individual dots in pixels.',
      },
      {
        name: 'dotSpacing',
        type: 'number',
        default: '14',
        description: 'The spacing between dots in pixels.',
      },
      {
        name: 'cursorRadius',
        type: 'number',
        default: '500',
        description: 'Radius in pixels where cursor displacement takes effect.',
      },
      {
        name: 'cursorForce',
        type: 'number',
        default: '0.1',
        description: 'Force of cursor interactions on dots.',
      },
      {
        name: 'bulgeOnly',
        type: 'boolean',
        default: 'true',
        description:
          'If true, dots bulge away from cursor. If false, dots orbit/flee cursor.',
      },
      {
        name: 'bulgeStrength',
        type: 'number',
        default: '67',
        description: 'Strength of the bulge push/pull factor.',
      },
      {
        name: 'glowRadius',
        type: 'number',
        default: '160',
        description: 'Radius in pixels of the SVG cursor spotlight glow.',
      },
      {
        name: 'sparkle',
        type: 'boolean',
        default: 'false',
        description:
          'Enables sparkling hash-based dot radius scaling variance.',
      },
      {
        name: 'waveAmplitude',
        type: 'number',
        default: '0',
        description: 'Sizing multiplier of active background waves.',
      },
      {
        name: 'gradientFrom',
        type: 'string',
        default: '"rgba(168, 85, 247, 0.35)"',
        description: 'Halftone dot layout linear gradient start color.',
      },
      {
        name: 'gradientTo',
        type: 'string',
        default: '"rgba(180, 151, 207, 0.25)"',
        description: 'Halftone dot layout linear gradient end color.',
      },
      {
        name: 'glowColor',
        type: 'string',
        default: '"#120F17"',
        description: 'Color of the SVG cursor radial spotlight glow.',
      },
      {
        name: 'colors',
        type: 'string[]',
        description:
          'Multiple colors for dither particles. Draws individual dots with distinct colors.',
      },
    ],
  },
  {
    name: 'magic-rings',
    title: 'Magic Rings',
    description:
      'An elegant, interactive shader component rendering nested expanding magic wave rings.',
    category: 'effects',
    dependencies: ['three'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/magic-rings.tsx',
    tags: ['shader', 'rings', 'interactive', 'canvas', 'waves', 'webgl'],
    usage: `import { MagicRings } from "@/components/kanso/magic-rings"

export default function MagicRingsDemo() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative bg-zinc-950">
      <MagicRings
        color="#fc42ff"
        colorTwo="#42fcff"
        speed={1}
        ringCount={6}
        followMouse={true}
        clickBurst={true}
      />
    </div>
  )
}`,
    props: [
      {
        name: 'color',
        type: 'string',
        default: '"#fc42ff"',
        description: 'Primary ring accent color.',
      },
      {
        name: 'colorTwo',
        type: 'string',
        default: '"#42fcff"',
        description: 'Secondary gradient ring color.',
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Animation speed multiplier.',
      },
      {
        name: 'ringCount',
        type: 'number',
        default: '6',
        description: 'Number of nested wave rings.',
      },
      {
        name: 'attenuation',
        type: 'number',
        default: '10',
        description: 'Attenuation rate of the shader fields.',
      },
      {
        name: 'lineThickness',
        type: 'number',
        default: '2',
        description: 'Line thickness coefficient.',
      },
      {
        name: 'baseRadius',
        type: 'number',
        default: '0.35',
        description: 'Starting radius ratio of the inner rings.',
      },
      {
        name: 'radiusStep',
        type: 'number',
        default: '0.1',
        description: 'Radius increment spacing per nested ring.',
      },
      {
        name: 'scaleRate',
        type: 'number',
        default: '0.1',
        description: 'Ring expansion rate factor.',
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1',
        description: 'Overall opacity modifier.',
      },
      {
        name: 'blur',
        type: 'number',
        default: '0',
        description: 'Blur filter strength applied in pixels.',
      },
      {
        name: 'noiseAmount',
        type: 'number',
        default: '0.1',
        description: 'Grain shader noise texture intensity.',
      },
      {
        name: 'rotation',
        type: 'number',
        default: '0',
        description: 'Default rotation angle offset in degrees.',
      },
      {
        name: 'ringGap',
        type: 'number',
        default: '1.5',
        description: 'Exponent gap space scaling multiplier.',
      },
      {
        name: 'fadeIn',
        type: 'number',
        default: '0.7',
        description: 'Fade in speed index.',
      },
      {
        name: 'fadeOut',
        type: 'number',
        default: '0.5',
        description: 'Fade out speed index.',
      },
      {
        name: 'followMouse',
        type: 'boolean',
        default: 'false',
        description:
          'Allows the center anchor offset to chase mouse coordinates.',
      },
      {
        name: 'mouseInfluence',
        type: 'number',
        default: '0.2',
        description:
          'The sensitivity factor of mouse influence on placement displacement.',
      },
      {
        name: 'hoverScale',
        type: 'number',
        default: '1.2',
        description: 'Maximum scale factor reached when hovering.',
      },
      {
        name: 'parallax',
        type: 'number',
        default: '0.05',
        description: 'Layered offset coefficient creating perspective depth.',
      },
      {
        name: 'clickBurst',
        type: 'boolean',
        default: 'false',
        description: 'Enables explosive expansion ripple on click events.',
      },
    ],
  },
  {
    name: 'antigravity',
    title: 'Antigravity Particles',
    description:
      'A gorgeous React Three Fiber canvas component rendering magnetic floating particles that orbit the mouse cursor on hover.',
    category: 'effects',
    dependencies: ['three', '@react-three/fiber'],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/antigravity.tsx',
    tags: [
      'particles',
      'magnet',
      'orbit',
      'wave',
      'interactive',
      'fiber',
      'webgl',
    ],
    usage: `import { Antigravity } from "@/components/kanso/antigravity"

export default function AntigravityDemo() {
  return (
    <div className="w-full h-[350px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden">
      <Antigravity
        count={250}
        magnetRadius={8}
        ringRadius={8}
        color="#c084fc"
        particleShape="capsule"
      />
    </div>
  )
}`,
    props: [
      {
        name: 'count',
        type: 'number',
        default: '300',
        description: 'Total number of instanced particles.',
      },
      {
        name: 'magnetRadius',
        type: 'number',
        default: '10',
        description:
          'Radius in viewport units where mouse coordinates attract particles.',
      },
      {
        name: 'ringRadius',
        type: 'number',
        default: '10',
        description: 'Orbit radius of particles around target mouse point.',
      },
      {
        name: 'waveSpeed',
        type: 'number',
        default: '0.4',
        description: 'Speed coefficient of orbit wave ripples.',
      },
      {
        name: 'waveAmplitude',
        type: 'number',
        default: '1',
        description: 'Sizing variance amplitude of wave sweeps.',
      },
      {
        name: 'particleSize',
        type: 'number',
        default: '2',
        description: 'Scale base of each particle mesh.',
      },
      {
        name: 'lerpSpeed',
        type: 'number',
        default: '0.1',
        description: 'Interpolation factor for movement smoothness.',
      },
      {
        name: 'color',
        type: 'string',
        default: '"#FF9FFC"',
        description: 'Color of the particles material.',
      },
      {
        name: 'colors',
        type: 'string[]',
        description:
          'Multiple colors array. Cycles through colors for individual particles.',
      },
      {
        name: 'autoAnimate',
        type: 'boolean',
        default: 'false',
        description:
          'Triggers automated sine paths animation when mouse is inactive.',
      },
      {
        name: 'particleVariance',
        type: 'number',
        default: '1',
        description: 'Sizing variance coefficient.',
      },
      {
        name: 'rotationSpeed',
        type: 'number',
        default: '0',
        description: 'Spin rotation speed offset of particle ring.',
      },
      {
        name: 'depthFactor',
        type: 'number',
        default: '1',
        description: 'Intensity of particle movement along the Z deep axis.',
      },
      {
        name: 'pulseSpeed',
        type: 'number',
        default: '3',
        description: 'Sizing pulse animation speed.',
      },
      {
        name: 'particleShape',
        type: '"capsule" | "sphere" | "box" | "tetrahedron"',
        default: '"capsule"',
        description: 'Geometry shape mesh instanced for particles.',
      },
      {
        name: 'fieldStrength',
        type: 'number',
        default: '10',
        description: 'Orbit path compactness coefficient.',
      },
    ],
  },
  {
    name: 'glow-card',
    title: 'Glow Card',
    description:
      'A premium, modern card container with a highly-fidelity bottom-up radial gradient glow, corner crop marks, and smooth hover state transitions.',
    category: 'cards',
    dependencies: [],
    internalDeps: ['lib/utils'],
    filePath: 'components/kanso/glow-card.tsx',
    tags: ['card', 'glow', 'gradient', 'minimal', 'hover', 'crop-marks'],
    usage: `import { GlowCard } from "@/components/kanso/glow-card"

export default function GlowCardDemo() {
  return (
    <GlowCard className="max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">Real time location tracking</span>
        <h3 className="text-xl font-bold text-white leading-tight">Advanced tracking system, locate all assets instantly.</h3>
      </div>
    </GlowCard>
  )
}`,
    props: [
      {
        name: 'showCropMarks',
        type: 'boolean',
        default: 'true',
        description:
          'Toggles blueprint-style tiny corner crop marks inside the card.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'true',
        description:
          'Enables interactive scaling and bloom gradient shift on hover.',
      },
      {
        name: 'children',
        type: 'React.ReactNode',
        description: 'Content to render inside the card.',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional class names to apply to the card container.',
      },
    ],
  },
];

/**
 * Get a component by its registry name.
 */
export function getComponent(name: string): RegistryComponent | undefined {
  return registry.find((c) => c.name === name);
}

/**
 * Get all components in a given category.
 */
export function getComponentsByCategory(
  category: RegistryComponent['category']
): RegistryComponent[] {
  return registry.filter((c) => c.category === category);
}

/**
 * Get all unique categories present in the registry.
 */
export function getCategories(): RegistryComponent['category'][] {
  return [...new Set(registry.map((c) => c.category))];
}
