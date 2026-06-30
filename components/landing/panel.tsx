import * as React from 'react';
import { cn } from '@/lib/utils';

type PanelProps = React.HTMLAttributes<HTMLElement>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <section
      data-slot="panel"
      className={cn(
        'screen-line-top screen-line-bottom border-x border-line relative bg-background',
        className
      )}
      {...props}
    />
  );
}

type PanelHeaderProps = React.HTMLAttributes<HTMLElement>;

export function PanelHeader({ className, ...props }: PanelHeaderProps) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        'screen-line-bottom px-6 md:px-8 py-6 flex flex-col items-start gap-1 relative z-10 bg-background',
        className
      )}
      {...props}
    />
  );
}

interface PanelTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function PanelTitle({
  as: Comp = 'h2',
  className,
  ...props
}: PanelTitleProps) {
  return (
    <Comp
      data-slot="panel-title"
      className={cn(
        'group/panel-title font-sans text-xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2',
        className
      )}
      {...props}
    />
  );
}

type PanelTitleSupProps = React.HTMLAttributes<HTMLSpanElement>;

export function PanelTitleSup({ className, ...props }: PanelTitleSupProps) {
  return (
    <span
      className={cn(
        'text-xs font-mono font-normal text-muted-foreground/60 select-none ml-1',
        className
      )}
      {...props}
    />
  );
}

type PanelDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function PanelDescription({
  className,
  ...props
}: PanelDescriptionProps) {
  return (
    <p
      data-slot="panel-description"
      className={cn(
        'text-sm text-muted-foreground leading-relaxed max-w-xl mt-1.5',
        className
      )}
      {...props}
    />
  );
}

type PanelContentProps = React.HTMLAttributes<HTMLDivElement>;

export function PanelContent({ className, ...props }: PanelContentProps) {
  return (
    <div
      data-slot="panel-content"
      className={cn('px-6 py-8 md:px-8 relative z-10 bg-background', className)}
      {...props}
    />
  );
}

export function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'stripe-divider h-8 w-full border-x border-line relative z-0',
        className
      )}
    />
  );
}
