import { createHighlighter } from "shiki"
import LandingPageClient from "./LandingPageClient"

// --- Static Code Snippets for Shiki to highlight on Server ---

const heroCode = `import { InteractiveCard, CardBody, CardItem } from "@kanso/ui"

export default function CardDemo() {
  return (
    <InteractiveCard animated glowColor="280 80 70">
      <CardBody className="p-6">
        <CardItem translateZ={50} className="text-xl font-bold text-white">
          Zen Interaction
        </CardItem>
        <CardItem translateZ={30} className="text-zinc-400 mt-2">
          3D tilt, cursor spotlight, and edge border glow.
        </CardItem>
      </CardBody>
    </InteractiveCard>
  )
}`

const showcaseCodes = {
  buttons: `import { RealismButton } from "@/components/kanso/realism-button"
import { KeyboardButton } from "@/components/kanso/keyboard-button"
import { GlowLineButton } from "@/components/kanso/glow-line-button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <RealismButton variantColor="cyan">Cyan Glow</RealismButton>
      <KeyboardButton variantColor="dark">cmd</KeyboardButton>
      <GlowLineButton glowColor="rose">Rose Glow</GlowLineButton>
    </div>
  )
}`,
  cards: `import { LiquidMetalCard } from "@/components/kanso/liquid-metal-card"

export default function CardDemo() {
  return (
    <LiquidMetalCard
      title="Liquid Metal"
      subtitle="Interactive"
      description="WebGL shader reflections on a copy-paste React container card."
      className="max-w-sm"
    />
  )
}`,
  dialogs: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open Modal</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>This will permanently delete the selected project.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button variant="default">Delete</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  inputs: `import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function InputDemo() {
  return (
    <div className="flex w-full max-w-sm gap-2">
      <Input type="email" placeholder="name@domain.com" />
      <Button variant="default">Subscribe</Button>
    </div>
  )
}`,
  command: `import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command"

export default function CommandDemo() {
  return (
    <Command className="border border-zinc-200 dark:border-zinc-800">
      <CommandInput placeholder="Search settings..." />
      <CommandList>
        <CommandGroup heading="Settings">
          <CommandItem>Profile Config</CommandItem>
          <CommandItem>API Management</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
  pricing: `import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PriceCard() {
  return (
    <Card className="w-[300px] border-zinc-800 bg-zinc-950 p-6">
      <CardHeader>
        <div className="text-xs font-semibold text-zinc-500 uppercase">Pro</div>
        <CardTitle className="text-2xl mt-1">$19 <span className="text-sm font-normal text-zinc-500">/ mo</span></CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 py-4 text-zinc-400">
        <div>• Unlimited projects</div>
        <div>• Premium support</div>
        <Button className="w-full mt-4">Upgrade</Button>
      </CardContent>
    </Card>
  )
}`,
  halftone: `import { HalftoneImage, HalftoneGrid } from "@kanso/ui"

export default function HalftoneDemo() {
  return (
    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
      <HalftoneGrid
        dotRadius={1.5}
        dotSpacing={14}
        gradientFrom="rgba(168, 85, 247, 0.35)"
        gradientTo="rgba(180, 151, 207, 0.25)"
        glowColor="#120F17"
        className="absolute inset-0"
      />
      <div className="relative size-44 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white">
        <HalftoneImage
          src="/avatar.jpg"
          dotSpacing={6}
          contrast={1.3}
          inkColor="currentColor"
          paperColor="transparent"
        />
      </div>
    </div>
  )
}`,
  magicRings: `import { MagicRings } from "@/components/kanso/magic-rings"

export default function MagicRingsDemo() {
  return (
    <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center p-6">
      <MagicRings
        color="#fc42ff"
        colorTwo="#42fcff"
        speed={1}
        ringCount={6}
        followMouse={true}
      />
      <span className="relative z-10 text-white font-mono text-xs">Hover & Click to Burst</span>
    </div>
  )
}`,
  antigravity: `import { Antigravity } from "@/components/kanso/antigravity"

export default function AntigravityDemo() {
  return (
    <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950">
      <Antigravity
        count={200}
        color="#FF9FFC"
        particleShape="capsule"
        magnetRadius={10}
      />
    </div>
  )
}`
}

const dxCode = `import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="flex gap-4 p-8">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`

export default async function Home() {
  // Create Shiki highlighter
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx"],
  })

  // Pre-highlight hero code
  const heroHtml = highlighter.codeToHtml(heroCode, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  // Pre-highlight showcase codes
  const showcaseHtmls = {
    buttons: highlighter.codeToHtml(showcaseCodes.buttons, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    cards: highlighter.codeToHtml(showcaseCodes.cards, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    dialogs: highlighter.codeToHtml(showcaseCodes.dialogs, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    inputs: highlighter.codeToHtml(showcaseCodes.inputs, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    command: highlighter.codeToHtml(showcaseCodes.command, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    pricing: highlighter.codeToHtml(showcaseCodes.pricing, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    halftone: highlighter.codeToHtml(showcaseCodes.halftone, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    magicRings: highlighter.codeToHtml(showcaseCodes.magicRings, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
    antigravity: highlighter.codeToHtml(showcaseCodes.antigravity, { lang: "tsx", themes: { light: "github-light", dark: "github-dark" } }),
  }

  // Pre-highlight dx code
  const dxHtml = highlighter.codeToHtml(dxCode, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })

  // Clean up highlighter resources
  highlighter.dispose()

  return (
    <LandingPageClient
      heroHtml={heroHtml}
      heroRaw={heroCode}
      showcaseHtmls={showcaseHtmls}
      showcaseRaws={showcaseCodes}
      dxHtml={dxHtml}
      dxRaw={dxCode}
    />
  )
}
