'use client';

import * as React from 'react';
import {
  SparklesIcon,
  Code2Icon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  CheckIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '@/components/ui/command';

import { RealismButton } from '@/components/kanso/realism-button';
import { KeyboardButton } from '@/components/kanso/keyboard-button';
import { GlowLineButton } from '@/components/kanso/glow-line-button';
import { LiquidMetalCard } from '@/components/kanso/liquid-metal-card';
import { HalftoneGrid } from '@/components/kanso/halftone-grid';
import { HalftoneImage } from '@/components/kanso/halftone-image';
import { MagicRings } from '@/components/kanso/magic-rings';
import { Antigravity } from '@/components/kanso/antigravity';
import { CodeBlock } from '@/components/docs/code-block';
import { SectionDivider } from '@/components/landing/editorial-grid';

interface ComponentShowcaseProps {
  showcaseHtmls: Record<string, string>;
  showcaseRaws: Record<string, string>;
}

export function ComponentShowcase({
  showcaseHtmls,
  showcaseRaws,
}: ComponentShowcaseProps) {
  const [selectedShowcase, setSelectedShowcase] = React.useState<
    | 'buttons'
    | 'cards'
    | 'dialogs'
    | 'inputs'
    | 'command'
    | 'pricing'
    | 'halftone'
    | 'magic-rings'
    | 'antigravity'
  >('buttons');
  const [activeSandboxTab, setActiveSandboxTab] = React.useState<
    'preview' | 'code'
  >('preview');

  return (
    <section
      id="showcase"
      className="border-t border-b border-dashed border-border  dark:bg-zinc-950 relative"
    >
      <SectionDivider />
      <div className="mx-auto max-w-7xl border-l border-r border-dashed border-border px-6 py-28 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white">
            Component Showcase
          </h2>
          <p className="max-w-xl text-base text-zinc-500 dark:text-zinc-400">
            Inspect and interact with premium components. See the exact code
            that builds them.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-12 w-full min-w-0">
          {/* Left selector menu styled as IDE workspace */}
          <div className="lg:col-span-3 w-full flex flex-col gap-4">
            <div className="flex flex-col border border-border bg-card dark:bg-card/45 rounded-2xl overflow-hidden shadow-xs">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 dark:bg-muted/15 px-4 py-3 font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-wider select-none">
                <span>workspace</span>
                <span className="text-[9px] text-zinc-400 font-medium">
                  9 files
                </span>
              </div>
              <div className="flex flex-col gap-1 p-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest select-none">
                  <span>components</span>
                </div>
                {(
                  [
                    { id: 'buttons', label: 'Buttons.tsx' },
                    { id: 'cards', label: 'Cards.tsx' },
                    { id: 'halftone', label: 'Halftone.tsx' },
                    { id: 'magic-rings', label: 'MagicRings.tsx' },
                    { id: 'antigravity', label: 'Antigravity.tsx' },
                    { id: 'dialogs', label: 'Dialogs.tsx' },
                    { id: 'inputs', label: 'Inputs.tsx' },
                    { id: 'command', label: 'CommandMenu.tsx' },
                    { id: 'pricing', label: 'PricingCards.tsx' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedShowcase(item.id);
                      setActiveSandboxTab('preview');
                    }}
                    className={cn(
                      'flex items-center gap-2 justify-start px-3 py-2 text-xs rounded-md font-mono transition-all shrink-0 cursor-pointer select-none border-l-2 text-left w-full',
                      selectedShowcase === item.id
                        ? 'bg-muted text-foreground border-primary font-semibold'
                        : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                    )}
                  >
                    <span
                      className={cn(
                        'size-1.5 rounded-full shrink-0',
                        selectedShowcase === item.id
                          ? 'bg-violet-500'
                          : 'bg-zinc-400/60 dark:bg-zinc-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Modern Unified Editor & Preview Sandbox window */}
          <div className="lg:col-span-9 w-full min-w-0 border border-border bg-card dark:bg-card/45 rounded-2xl overflow-hidden shadow-md flex flex-col">
            {/* Window Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 dark:bg-muted/15 px-4 py-2 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                {/* Mac dots */}
                <div className="flex items-center gap-1.5 select-none shrink-0">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-yellow-400/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                </div>
                {/* Tab Selectors */}
                <div className="flex items-center gap-1 border-l border-border pl-4 shrink-0">
                  <button
                    onClick={() => setActiveSandboxTab('preview')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all select-none',
                      activeSandboxTab === 'preview'
                        ? 'bg-background text-foreground shadow-xs border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/45'
                    )}
                  >
                    <SparklesIcon className="size-3 text-violet-500" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => setActiveSandboxTab('code')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all select-none',
                      activeSandboxTab === 'code'
                        ? 'bg-background text-foreground shadow-xs border border-border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/45'
                    )}
                  >
                    <Code2Icon className="size-3 text-blue-500" />
                    <span>Code</span>
                  </button>
                </div>
              </div>
              {/* Active filename */}
              <span className="font-mono text-[10px] text-zinc-400 bg-background/50 dark:bg-zinc-900/50 px-2 py-0.5 rounded border border-border/40 select-all shrink-0">
                {selectedShowcase === 'buttons'
                  ? 'ButtonDemo.tsx'
                  : selectedShowcase === 'cards'
                    ? 'CardDemo.tsx'
                    : selectedShowcase === 'halftone'
                      ? 'HalftoneDemo.tsx'
                      : selectedShowcase === 'magic-rings'
                        ? 'MagicRingsDemo.tsx'
                        : selectedShowcase === 'antigravity'
                          ? 'AntigravityDemo.tsx'
                          : selectedShowcase === 'dialogs'
                            ? 'DialogDemo.tsx'
                            : selectedShowcase === 'inputs'
                              ? 'InputDemo.tsx'
                              : selectedShowcase === 'command'
                                ? 'CommandDemo.tsx'
                                : 'PriceCard.tsx'}
              </span>
            </div>

            {/* Window Content */}
            <div className="w-full bg-background dark:bg-zinc-950/45 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
              {activeSandboxTab === 'preview' ? (
                <div className="flex w-full h-full items-center justify-center p-6 sm:p-12 overflow-hidden">
                  {/* Live Preview Elements */}
                  {selectedShowcase === 'buttons' && (
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      <RealismButton variantColor="cyan">
                        Cyan Glow
                      </RealismButton>
                      <KeyboardButton variantColor="dark">cmd</KeyboardButton>
                      <GlowLineButton glowColor="rose">
                        Rose Glow
                      </GlowLineButton>
                    </div>
                  )}

                  {selectedShowcase === 'cards' && (
                    <div className="w-full max-w-[360px]">
                      <LiquidMetalCard
                        title="Liquid Metal"
                        subtitle="Interactive"
                        description="WebGL shader reflections on a copy-paste React container card."
                        className="w-full"
                      />
                    </div>
                  )}

                  {selectedShowcase === 'dialogs' && (
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button variant="outline">Open Confirm Dialog</Button>
                        }
                      />
                      <DialogContent className="border border-zinc-200 dark:border-zinc-800">
                        <DialogHeader>
                          <DialogTitle>Reset API Key</DialogTitle>
                          <DialogDescription>
                            This will immediately revoke access for your current
                            key. This operation is permanent and irreversible.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-6">
                          <DialogClose
                            render={<Button variant="ghost">Cancel</Button>}
                          />
                          <DialogClose
                            render={
                              <Button variant="default">Confirm Reset</Button>
                            }
                          />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  {selectedShowcase === 'inputs' && (
                    <div className="flex w-full max-w-[360px] flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                          Create Secret Key
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="sk_live_..."
                            className="font-mono"
                          />
                          <Button variant="default">Generate</Button>
                        </div>
                        <p className="text-xs text-zinc-500">
                          Provide an identifier for this API key.
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedShowcase === 'command' && (
                    <div className="w-full max-w-[420px] rounded-xl border border-zinc-200 bg-white p-2 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60">
                      <Command className="bg-transparent">
                        <CommandInput placeholder="Type a search command..." />
                        <CommandList className="max-h-[200px] mt-2">
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Suggestions">
                            <CommandItem>
                              <SearchIcon className="size-4 mr-2 opacity-50" />
                              Search Documentation
                            </CommandItem>
                            <CommandItem>
                              <SettingsIcon className="size-4 mr-2 opacity-50" />
                              System Preferences
                              <CommandShortcut>⌘,</CommandShortcut>
                            </CommandItem>
                          </CommandGroup>
                          <CommandSeparator className="my-2" />
                          <CommandGroup heading="Developer Settings">
                            <CommandItem>
                              <UserIcon className="size-4 mr-2 opacity-50" />
                              Manage API Accounts
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </div>
                  )}

                  {selectedShowcase === 'pricing' && (
                    <div className="flex flex-wrap items-stretch justify-center gap-6 w-full">
                      {/* Hobby tier */}
                      <Card className="flex flex-col justify-between w-full max-w-[280px] border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/30">
                        <div>
                          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Hobby
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight text-zinc-950 mt-1 dark:text-white">
                            $0{' '}
                            <span className="text-sm font-normal text-zinc-500">
                              / mo
                            </span>
                          </h3>
                          <p className="text-xs text-zinc-500 mt-2">
                            Essential components to build small, personal apps.
                          </p>
                          <div className="space-y-2 mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                              <CheckIcon className="size-4 text-zinc-800 dark:text-zinc-300" />
                              <span>Basic Components</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="size-4 text-zinc-800 dark:text-zinc-300" />
                              <span>Community Support</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full mt-8">
                          Get Started
                        </Button>
                      </Card>

                      {/* Pro tier */}
                      <Card className="flex flex-col justify-between w-full max-w-[280px] border border-zinc-900 bg-zinc-950 p-6 shadow-lg dark:border-zinc-800">
                        <div>
                          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Professional
                          </div>
                          <h3 className="text-2xl font-bold tracking-tight text-white mt-1">
                            $19{' '}
                            <span className="text-sm font-normal text-zinc-500">
                              / mo
                            </span>
                          </h3>
                          <p className="text-xs text-zinc-400 mt-2">
                            Advanced layouts and premium layout abstractions.
                          </p>
                          <div className="space-y-2 mt-6 text-sm text-zinc-400">
                            <div className="flex items-center gap-2">
                              <CheckIcon className="size-4 text-zinc-100" />
                              <span>All 50+ Components</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="size-4 text-zinc-100" />
                              <span>Figma Design Files</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="size-4 text-zinc-100" />
                              <span>Priority Slack Channel</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-8 bg-white text-zinc-950 hover:bg-zinc-200 border-none">
                          Upgrade
                        </Button>
                      </Card>
                    </div>
                  )}

                  {selectedShowcase === 'halftone' && (
                    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden">
                      <HalftoneGrid
                        dotRadius={1.5}
                        dotSpacing={14}
                        gradientFrom="rgba(168, 85, 247, 0.35)"
                        gradientTo="rgba(180, 151, 207, 0.25)"
                        glowColor="#120F17"
                        className="absolute inset-0"
                      />
                      <div className="relative size-44 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-md">
                        <HalftoneImage
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300"
                          dotSpacing={6}
                          contrast={1.3}
                          inkColor="currentColor"
                          paperColor="transparent"
                          className="size-full"
                          alt="Halftone showcase preview"
                        />
                      </div>
                    </div>
                  )}

                  {selectedShowcase === 'magic-rings' && (
                    <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 flex items-center justify-center p-6 border border-zinc-800">
                      <MagicRings
                        color="#fc42ff"
                        colorTwo="#42fcff"
                        speed={1}
                        ringCount={6}
                        followMouse={true}
                        clickBurst={true}
                      />
                      <span className="relative z-10 text-white font-mono text-xs select-none bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
                        Hover & Click to Burst
                      </span>
                    </div>
                  )}

                  {selectedShowcase === 'antigravity' && (
                    <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                      <Antigravity
                        count={200}
                        color="#FF9FFC"
                        particleShape="capsule"
                        magnetRadius={10}
                        autoAnimate={true}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full p-4 overflow-auto max-h-[420px] bg-zinc-950 text-zinc-100 font-mono text-xs text-left">
                  <CodeBlock
                    html={
                      showcaseHtmls[
                        selectedShowcase === 'magic-rings'
                          ? 'magicRings'
                          : selectedShowcase
                      ]
                    }
                    rawCode={
                      showcaseRaws[
                        selectedShowcase === 'magic-rings'
                          ? 'magicRings'
                          : selectedShowcase
                      ]
                    }
                    filename={
                      selectedShowcase === 'buttons'
                        ? 'ButtonDemo.tsx'
                        : selectedShowcase === 'cards'
                          ? 'CardDemo.tsx'
                          : selectedShowcase === 'halftone'
                            ? 'HalftoneDemo.tsx'
                            : selectedShowcase === 'magic-rings'
                              ? 'MagicRingsDemo.tsx'
                              : selectedShowcase === 'antigravity'
                                ? 'AntigravityDemo.tsx'
                                : selectedShowcase === 'dialogs'
                                  ? 'DialogDemo.tsx'
                                  : selectedShowcase === 'inputs'
                                    ? 'InputDemo.tsx'
                                    : selectedShowcase === 'command'
                                      ? 'CommandDemo.tsx'
                                      : 'PriceCard.tsx'
                    }
                    showLineNumbers={true}
                    collapsible={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
