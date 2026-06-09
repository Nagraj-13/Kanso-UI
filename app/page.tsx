import { createHighlighter } from "shiki"
import LandingPageClient from "./LandingPageClient"

// --- Static Code Snippets for Shiki to highlight on Server ---

const heroCode = `import { Button } from "@kanso/ui"
import { ArrowRight } from "lucide-react"

export default function HeroDemo() {
  return (
    <Button variant="default" size="lg">
      Get Started
      <ArrowRight className="size-4" />
    </Button>
  )
}`

const showcaseCodes = {
  buttons: `import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Primary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`,
  cards: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardDemo() {
  return (
    <Card className="w-[360px] border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>Manage your developer keys and secrets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-zinc-500">No active keys generated.</div>
        <Button variant="outline" size="sm">Create Key</Button>
      </CardContent>
    </Card>
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
