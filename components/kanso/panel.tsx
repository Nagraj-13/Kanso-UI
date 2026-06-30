import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PanelProps extends React.ComponentProps<'section'> {
  /** Opt-out of the bottom hairline border */
  noLineBottom?: boolean;
  /** Add top hairline border */
  lineTop?: boolean;
}

export function Panel({
  className,
  noLineBottom = false,
  lineTop = false,
  ...props
}: PanelProps) {
  return (
    <section
      data-slot="panel"
      className={cn(
        'panel',
        !noLineBottom && 'line-bottom',
        lineTop && 'line-top',
        className
      )}
      {...props}
    />
  );
}

export interface PanelHeaderProps extends React.ComponentProps<'header'> {
  /** Opt-out of the bottom hairline border */
  noLineBottom?: boolean;
}

export function PanelHeader({
  className,
  noLineBottom = false,
  ...props
}: PanelHeaderProps) {
  return (
    <header
      data-slot="panel-header"
      className={cn(
        'panel-header px-4',
        !noLineBottom && 'line-bottom',
        className
      )}
      {...props}
    />
  );
}

export type PanelTitleProps = React.ComponentProps<'h2'>;

export function PanelTitle({ className, ...props }: PanelTitleProps) {
  return (
    <h2
      data-slot="panel-title"
      className={cn(
        'panel-title font-sans text-xl md:text-2xl font-semibold tracking-tight text-balance',
        className
      )}
      {...props}
    />
  );
}

export type PanelDescriptionProps = React.ComponentProps<'p'>;

export function PanelDescription({
  className,
  ...props
}: PanelDescriptionProps) {
  return (
    <p
      data-slot="panel-description"
      className={cn(
        'mt-2 text-sm text-muted-foreground max-w-2xl text-balance',
        className
      )}
      {...props}
    />
  );
}

export type PanelContentProps = React.ComponentProps<'div'>;

export function PanelContent({ className, ...props }: PanelContentProps) {
  return (
    <div
      data-slot="panel-content"
      className={cn('panel-content p-4 md:p-6', className)}
      {...props}
    />
  );
}

export interface StripeDividerProps extends React.ComponentProps<'div'> {
  /** Keep vertical rails border-left/border-right running through the stripe */
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
        'stripe-divider line-bottom',
        withRails && 'border-x border-[var(--line)]',
        className
      )}
      {...props}
    />
  );
}
