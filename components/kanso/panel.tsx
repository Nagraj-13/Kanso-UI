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
      className={cn(
        'line-top line-bottom border-x border-[var(--line)]',
        className
      )}
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
      className={cn(
        'line-bottom px-4 has-data-[slot=panel-description]:*:data-[slot=panel-title]:line-bottom',
        className
      )}
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
      className={cn('p-4 md:p-6', className)}
      {...props}
    />
  );
}

export interface StripeDividerProps extends React.ComponentProps<'div'> {
  withRails?: boolean;
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
        withRails && 'border-x border-[var(--line)]',
        className
      )}
      {...props}
    >
      {withRails && (
        <>
          <div
            className="absolute top-[-4px] left-[-4px] z-20 flex size-[7px] border border-[var(--line)] bg-background"
            aria-hidden="true"
          />
          <div
            className="absolute top-[-4px] right-[-4px] z-20 flex size-[7px] border border-[var(--line)] bg-background"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[-4px] left-[-4px] z-20 flex size-[7px] border border-[var(--line)] bg-background"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[-4px] right-[-4px] z-20 flex size-[7px] border border-[var(--line)] bg-background"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
