import * as React from 'react';
import { cn } from '@/lib/utils';

export function PageHeading({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-heading"
      className={cn('group/page-heading', className)}
      {...props}
    >
      {children}
      <div
        data-slot="page-heading-description-line"
        className="line-bottom hidden h-px group-has-data-[slot=page-heading-description]/page-heading:flex"
      />
    </div>
  );
}

export function PageHeadingTagline({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-heading-tagline"
      className={cn(
        'px-4 pb-2 font-sans text-sm/none font-medium tracking-wider text-muted-foreground uppercase',
        className
      )}
      {...props}
    />
  );
}

export function PageHeadingTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-heading-title"
      className={cn(
        'line-top line-bottom px-4',
        'font-sans text-4xl font-semibold tracking-tight text-balance text-foreground py-2',
        className
      )}
      {...props}
    />
  );
}

export function PageHeadingDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-heading-description"
      className={cn(
        'p-4 text-base text-balance text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}
