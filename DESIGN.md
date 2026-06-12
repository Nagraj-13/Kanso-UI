---
version: alpha
name: Kanso UI
description: Minimal, premium design system for a React component library inspired by Kanso (simplicity, clarity, essentialism).
colors:
  background: "#FFFFFF"
  foreground: "#0F1115"
  surface: "#F6F7F9"
  surface-2: "#ECEFF3"
  border: "#D7DCE3"
  muted: "#6B7280"
  muted-strong: "#3B4252"
  accent: "#111827"
  accent-soft: "#E5E7EB"
  ring: "#A1A1AA"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  h1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0"
  body-sm:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button:
    radius: "{rounded.md}"
    height: "44px"
    paddingX: "18px"
    fontWeight: 600
    primaryBackground: "{colors.foreground}"
    primaryForeground: "{colors.background}"
    secondaryBackground: "{colors.surface}"
    secondaryForeground: "{colors.foreground}"
  card:
    radius: "{rounded.lg}"
    background: "{colors.surface}"
    border: "{colors.border}"
    shadow: "0 1px 2px rgba(15, 17, 21, 0.04)"
  input:
    radius: "{rounded.md}"
    height: "44px"
    background: "{colors.background}"
    border: "{colors.border}"
    focusRing: "{colors.ring}"
  badge:
    radius: "999px"
    background: "{colors.surface-2}"
    foreground: "{colors.muted-strong}"
---

# Kanso UI Design.md

## Overview

Kanso UI is a premium, modern, minimalist design system for a React component library.

The visual language is inspired by Kanso: simplicity, essentialism, and the removal of unnecessary detail. The result should feel calm, elegant, intelligent, and highly usable.

The experience should resemble the best qualities of contemporary developer brands: precise layout, strong typography, subtle motion, and a highly refined monochrome palette.

## Design Principles

- Simplicity over decoration
- Clarity over density
- Composition over ornament
- Whitespace as structure
- Typography as the primary visual system
- Motion as feedback, not spectacle
- Accessibility as a default, not an add-on

When in doubt, remove elements rather than add them.

## Visual Direction

The UI should feel:

- Premium
- Minimal
- Editorial
- Modern
- Calm
- Confident
- Developer-first

The brand should avoid any appearance of loud marketing, playful clutter, neon gradients, or decorative complexity.

## Color System

Use a restrained monochrome palette.

- Backgrounds should be white or soft neutral gray.
- Text should be near-black or charcoal.
- Borders should be light gray and understated.
- Interactive states should rely on subtle contrast shifts, not saturated color.
- If an accent is necessary, use a soft gray or deep charcoal tone.

The palette should always feel balanced and quiet.

## Typography

Typography is one of the core signatures of Kanso UI.

Use a modern sans-serif family with a clean geometric feel and excellent readability.

Rules:

- Headings should be bold, tight, and confident.
- Body text should remain highly legible and comfortable at standard reading sizes.
- Labels and metadata should use small caps or uppercase tracking sparingly.
- Avoid overly condensed or overly expressive typefaces.
- Avoid novelty fonts.

Headlines should create hierarchy through size and spacing, not embellishment.

## Layout and Spacing

Spacing should create a sense of calm and precision.

- Use generous whitespace around major sections.
- Use a clear grid.
- Keep content aligned and rhythmical.
- Avoid dense clusters of UI.
- Prefer fewer elements with better spacing over many crowded elements.

Sections should breathe. The page should feel intentionally composed, not packed.

## Shape and Depth

Kanso UI should use soft geometry.

- Rounded corners should be moderate, not cartoonish.
- Cards should have subtle borders and gentle depth.
- Shadows should be minimal and realistic.
- Surfaces should remain flat or lightly elevated.
- Use separation through spacing and borders first, shadow second.

The overall effect should be refined and timeless.

## Motion

Motion should feel elegant and purposeful.

- Animations should be subtle and fast.
- Transitions should be smooth and brief.
- Hover states should feel responsive but restrained.
- Entry animations should support hierarchy, not distract from content.
- Never use excessive bounce, overshoot, or novelty effects.

Motion should make the interface feel polished, not busy.

## Components

### Buttons

Buttons should be simple, clean, and highly usable.

- Primary buttons use strong contrast.
- Secondary buttons use quiet surfaces and borders.
- Hover states should be subtle.
- Button text should be concise.

### Cards

Cards should look lightweight, organized, and premium.

- Use soft borders and light surface variation.
- Include enough padding for comfortable scanning.
- Keep content hierarchy obvious.
- Avoid busy internal decoration.

### Inputs

Inputs should feel calm and precise.

- Clear borders
- Strong focus states
- Comfortable padding
- Minimal placeholder noise
- No heavy glow or decorative effects

### Navigation

Navigation should be easy to scan and almost invisible in its sophistication.

- Clear active states
- Strong spacing
- Clean typography
- Minimal chrome

### Showcase Blocks

Showcase blocks should look like real product surfaces, not generic marketing mockups.

- Present components in believable states
- Keep previews interactive when possible
- Use realistic labels and controls
- Avoid fake complexity

## Logo Direction

The logo should hint at NR while staying centered on the Kanso brand.

The mark should feel:

- Minimal
- Geometric
- Abstract
- Clean
- Timeless

Preferred character:

- A subtle monogram
- A balanced black/white/gray mark
- No decorative flourishes
- No overly literal iconography

## Tone of Voice

All copy should sound:

- Clear
- Confident
- Modern
- Brief
- Useful

Avoid hype, buzzwords, and overexplaining.

## Do

- Use whitespace generously
- Keep the palette monochrome
- Make everything feel deliberate
- Preserve accessibility
- Prioritize readability
- Use subtle animation
- Keep UI consistent across pages

## Don't

- Do not use neon colors
- Do not use heavy glass effects
- Do not use overly decorative gradients
- Do not clutter layouts
- Do not use playful or cartoonish visuals
- Do not over-animate
- Do not add unnecessary visual noise

## Agent Instructions

When generating or modifying UI for Kanso UI:

1. Respect the monochrome visual system.
2. Keep sections spacious and balanced.
3. Use premium typography and restrained motion.
4. Prefer elegant simplicity over feature density.
5. Ensure components feel production-ready and reusable.
6. Keep the design consistent with a modern design system brand.

If a choice is unclear, default to the most minimal and refined option.

## Landing Page Direction

A Kanso UI landing page should include:

- A premium hero section
- A refined component preview area
- Feature cards with strong spacing
- A developer experience section with code snippets
- A component showcase area
- A strong final call to action

The page should feel like a serious design system product: elegant, minimal, and highly functional.
