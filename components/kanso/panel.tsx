import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export function Panel({
  className,
  ...props
}: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="panel"
      className={cn(' border-x border-[var(--line)]', className)}
      {...props}
    />
  );
}

export function PanelHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="panel-header"
      className={cn('px-4 line-top line-bottom my-4 py-2', className)}
      {...props}
    />
  );
}

export interface PanelTitleProps extends React.ComponentProps<'h2'> {
  asChild?: boolean;
}

export function PanelTitle({
  className,
  asChild = false,
  ...props
}: PanelTitleProps) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      data-slot="panel-title"
      className={cn(
        'group/panel-title font-sans text-xl md:text-2xl font-semibold tracking-tight text-balance py-4',
        className
      )}
      {...props}
    />
  );
}

export function PanelTitleSup({
  className,
  ...props
}: React.ComponentProps<'sup'>) {
  return (
    <sup
      className={cn(
        'top-[-0.75em] ml-1 text-sm font-medium tracking-normal text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export function PanelDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-description"
      className={cn(
        'py-4 text-base text-balance text-muted-foreground max-w-2xl',
        className
      )}
      {...props}
    />
  );
}

export function PanelContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-body"
      className={cn('p-4 md:p-6 my-4 py-2 line-top line-bottom', className)}
      {...props}
    />
  );
}

export interface StripeDividerProps extends React.ComponentProps<'div'> {
  withRails?: boolean;
}

export function GapDivider({
  className,
  withRails = false,
  ...props
}: StripeDividerProps) {
  return (
    <div
      data-slot="gap-divider"
      className={cn(
        'relative h-5',
        withRails && 'border-x border-[var(--line)]',
        className
      )}
      {...props}
    >
      <div className="absolute top-0 left-[-100vw] w-[200vw] border-t border-[var(--line)] z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-[-100vw] w-[200vw] border-t border-[var(--line)] z-30 pointer-events-none" />
    </div>
  );
}

export function StripeDivider({
  className,
  withRails = true,
  ...props
}: StripeDividerProps) {
  return (
    <div
      data-slot="stripe-divider"
      className={cn(
        'stripe-divider line-bottom relative',
        withRails && 'border-x border-[var(--line)] ',
        className
      )}
      {...props}
    >
      {/* Explicit top line because .stripe-divider uses ::before for the striped background */}
      <div className="absolute top-0 left-[-100vw] w-[200vw] border-t border-[var(--line)] z-30 pointer-events-none" />
    </div>
  );
}

export function LineDivider({
  className,
  withRails = true,
  ...props
}: StripeDividerProps) {
  return (
    <div
      data-slot="stripe-divider"
      className={cn(
        ' line-bottom line-top relative',
        'border-x border-[var(--line)]',
        className
      )}
      {...props}
    ></div>
  );
}

export function VerticalLineDivider({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="vertical-line-divider"
      className={cn('w-px bg-[var(--line)] relative', className)}
      {...props}
    >
      <div className="absolute top-[-100vh] left-0 w-px h-[200vh] bg-[var(--line)] z-30 pointer-events-none" />
    </div>
  );
}
export interface VerticalGapDividerProps extends React.ComponentProps<'div'> {
  bleed?: boolean;
}

export function VerticalGapDivider({
  className,
  bleed = true,
  ...props
}: VerticalGapDividerProps) {
  return (
    <div
      data-slot="vertical-gap-divider"
      className={cn('w-5 relative', className)}
      {...props}
    >
      <div
        className={cn(
          'absolute left-0 w-[1px] border-l border-[var(--line)] z-30 pointer-events-none',
          bleed ? 'top-[-100vh] h-[200vh]' : 'top-0 bottom-0'
        )}
      />
      <div
        className={cn(
          'absolute right-0 w-[1px] border-r border-[var(--line)] z-30 pointer-events-none',
          bleed ? 'top-[-100vh] h-[200vh]' : 'top-0 bottom-0'
        )}
      />
    </div>
  );
}
