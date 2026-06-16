'use client';

import * as React from 'react';
import type { SVGProps } from 'react';
import { LiquidMetal } from '@paper-design/shaders-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const MemoizedLiquidMetal = React.memo(LiquidMetal);

type LiquidMetalProps = React.ComponentProps<typeof LiquidMetal>;
type LiquidMetalIcon = React.ComponentType<SVGProps<SVGSVGElement>>;

export interface LiquidMetalCardTechItem {
  name: string;
  version?: string;
  icon?: LiquidMetalIcon;
}

export interface LiquidMetalCardCTAProps {
  label: React.ReactNode;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  buttonClassName?: string;
}

/** LiquidMetal shader props that can be passed at the root for convenience */
export type LiquidMetalCardShaderOverrides = Partial<
  Pick<
    LiquidMetalProps,
    | 'width'
    | 'height'
    | 'image'
    | 'colorBack'
    | 'colorTint'
    | 'shape'
    | 'repetition'
    | 'softness'
    | 'shiftRed'
    | 'shiftBlue'
    | 'distortion'
    | 'contour'
    | 'angle'
    | 'speed'
    | 'frame'
    | 'scale'
    | 'rotation'
    | 'offsetX'
    | 'offsetY'
    | 'fit'
    | 'originX'
    | 'originY'
    | 'minPixelRatio'
    | 'maxPixelCount'
  >
>;

export interface LiquidMetalCardRootProps
  extends
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'>,
    LiquidMetalCardShaderOverrides {
  srTitle?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  showCta?: boolean;
  ctaProps?: Partial<LiquidMetalCardCTAProps>;
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode;
  showBadges?: boolean;
  techStack?: LiquidMetalCardTechItem[];
  renderBadge?: (
    tech: LiquidMetalCardTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode;
  desktopShaderProps?: Partial<LiquidMetalProps>;
  mobileShaderProps?: Partial<LiquidMetalProps>;
}

export interface LiquidMetalCardHeadingProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headingClassName?: string;
}

export interface LiquidMetalCardDescriptionProps extends React.ComponentPropsWithoutRef<'div'> {
  description?: React.ReactNode;
  descriptionClassName?: string;
}

export interface LiquidMetalCardActionsProps extends React.ComponentPropsWithoutRef<'div'> {
  showCta?: boolean;
  ctaProps?: Partial<LiquidMetalCardCTAProps>;
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode;
}

export interface LiquidMetalCardBadgesProps extends React.ComponentPropsWithoutRef<'div'> {
  showBadges?: boolean;
  techStack?: LiquidMetalCardTechItem[];
  renderBadge?: (
    tech: LiquidMetalCardTechItem,
    index: number,
    defaultBadge: React.ReactNode
  ) => React.ReactNode;
}

export interface LiquidMetalCardVisualProps extends React.ComponentPropsWithoutRef<'div'> {
  desktopShaderProps?: Partial<LiquidMetalProps>;
  desktopClassName?: string;
}

export interface LiquidMetalCardMobileVisualProps extends React.ComponentPropsWithoutRef<'div'> {
  mobileShaderProps?: Partial<LiquidMetalProps>;
}

export interface LiquidMetalCardProps extends LiquidMetalCardRootProps {
  containerClassName?: string;
  contentClassName?: string;
  headingWrapClassName?: string;
  headingClassName?: string;
  descriptionWrapClassName?: string;
  descriptionClassName?: string;
  ctaWrapClassName?: string;
  badgesWrapClassName?: string;
  visualClassName?: string;
  mobileVisualClassName?: string;
}

interface LiquidMetalCardContextValue {
  srTitle: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  description: React.ReactNode;
  showCta: boolean;
  mergedCtaProps: LiquidMetalCardCTAProps;
  renderCta?: (defaultCta: React.ReactNode) => React.ReactNode;
  showBadges: boolean;
  techStack: LiquidMetalCardTechItem[];
  renderBadge?: LiquidMetalCardBadgesProps['renderBadge'];
  mergedDesktopShaderProps: Partial<LiquidMetalProps>;
  mergedMobileShaderProps: Partial<LiquidMetalProps>;
}

const defaultDesktopShaderProps: Partial<LiquidMetalProps> = {
  width: 400,
  height: 200,
  image: '/Kansologo.png',
  colorBack: '#ffffff00',
  colorTint: '#2c5d72',
  shape: undefined,
  repetition: 6,
  softness: 0.8,
  shiftRed: 1,
  shiftBlue: -1,
  distortion: 0.4,
  contour: 0.4,
  angle: 0,
  speed: 1,
  scale: 0.6,
  fit: 'contain',
};

const defaultMobileShaderProps: Partial<LiquidMetalProps> = {
  image: '/Kansologo.png',
  colorBack: '#ffffff00',
  colorTint: '#2c5d72',
  shape: undefined,
  repetition: 6,
  softness: 0.8,
  shiftRed: 1,
  shiftBlue: -1,
  distortion: 0.4,
  contour: 0.4,
  angle: 0,
  speed: 1,
  scale: 0.68,
  fit: 'contain',
  style: { height: '100%', width: '100%' },
};

const defaultCtaProps: LiquidMetalCardCTAProps = {
  label: 'Explore Kanso UI',
  href: 'https://github.com/Nagraj-13/Kanso-UI',
  target: '_blank',
  rel: 'noopener noreferrer',
};

const defaultDescription = (
  <>Minimalist React component library and design system inspired by Kanso.</>
);

const defaultTechStack: LiquidMetalCardTechItem[] = [
  {
    name: 'Next.js',
    version: 'v16',
    icon: NextjsIcon,
  },
  {
    name: 'Base UI',
    version: 'v1.5',
    icon: BaseUIIcon,
  },
];

const LiquidMetalCardContext = React.createContext<
  LiquidMetalCardContextValue | undefined
>(undefined);

function useLiquidMetalCardContext() {
  const context = React.useContext(LiquidMetalCardContext);
  if (!context) {
    throw new Error(
      'LiquidMetalCard components must be used within LiquidMetalCardRoot'
    );
  }
  return context;
}

export function useLiquidMetalCard() {
  return useLiquidMetalCardContext();
}

export const LiquidMetalCardRoot = React.forwardRef<
  HTMLDivElement,
  LiquidMetalCardRootProps
>(({ className, children, srTitle = 'Kanso UI', title = <span className="">
      Kanso UI
    </span>, subtitle = 'Simplicity', description = defaultDescription, showCta = true, ctaProps, renderCta, showBadges = true, techStack = defaultTechStack, renderBadge, desktopShaderProps, mobileShaderProps, width, height, image, colorBack, colorTint, shape, repetition, softness, shiftRed, shiftBlue, distortion, contour, angle, speed, frame, scale, rotation, offsetX, offsetY, fit, originX, originY, minPixelRatio, maxPixelCount, ...props }, ref) => {
  const mergedCtaProps = React.useMemo(
    () => ({
      ...defaultCtaProps,
      ...ctaProps,
    }),
    [ctaProps]
  );

  const shaderOverrides = React.useMemo((): Partial<LiquidMetalProps> => {
    const overrides: Partial<LiquidMetalProps> = {};
    if (width !== undefined) overrides.width = width;
    if (height !== undefined) overrides.height = height;
    if (image !== undefined) overrides.image = image;
    if (colorBack !== undefined) overrides.colorBack = colorBack;
    if (colorTint !== undefined) overrides.colorTint = colorTint;
    if (shape !== undefined) overrides.shape = shape;
    if (repetition !== undefined) overrides.repetition = repetition;
    if (softness !== undefined) overrides.softness = softness;
    if (shiftRed !== undefined) overrides.shiftRed = shiftRed;
    if (shiftBlue !== undefined) overrides.shiftBlue = shiftBlue;
    if (distortion !== undefined) overrides.distortion = distortion;
    if (contour !== undefined) overrides.contour = contour;
    if (angle !== undefined) overrides.angle = angle;
    if (speed !== undefined) overrides.speed = speed;
    if (frame !== undefined) overrides.frame = frame;
    if (scale !== undefined) overrides.scale = scale;
    if (rotation !== undefined) overrides.rotation = rotation;
    if (offsetX !== undefined) overrides.offsetX = overrides.offsetX;
    if (offsetY !== undefined) overrides.offsetY = offsetY;
    if (fit !== undefined) overrides.fit = fit;
    if (originX !== undefined) overrides.originX = originX;
    if (originY !== undefined) overrides.originY = originY;
    if (minPixelRatio !== undefined) overrides.minPixelRatio = minPixelRatio;
    if (maxPixelCount !== undefined) overrides.maxPixelCount = maxPixelCount;
    return overrides;
  }, [
    width,
    height,
    image,
    colorBack,
    colorTint,
    shape,
    repetition,
    softness,
    shiftRed,
    shiftBlue,
    distortion,
    contour,
    angle,
    speed,
    frame,
    scale,
    rotation,
    offsetX,
    offsetY,
    fit,
    originX,
    originY,
    minPixelRatio,
    maxPixelCount,
  ]);

  const mergedDesktopShaderProps = React.useMemo(
    () => ({
      ...defaultDesktopShaderProps,
      ...shaderOverrides,
      ...desktopShaderProps,
    }),
    [shaderOverrides, desktopShaderProps]
  );

  const mergedMobileShaderProps = React.useMemo(
    () => ({
      ...defaultMobileShaderProps,
      ...shaderOverrides,
      ...mobileShaderProps,
      style: {
        ...(defaultMobileShaderProps.style as React.CSSProperties),
        ...(mobileShaderProps?.style as React.CSSProperties | undefined),
      },
    }),
    [shaderOverrides, mobileShaderProps]
  );

  const contextValue = React.useMemo<LiquidMetalCardContextValue>(
    () => ({
      srTitle,
      title,
      subtitle,
      description,
      showCta,
      mergedCtaProps,
      renderCta,
      showBadges,
      techStack,
      renderBadge,
      mergedDesktopShaderProps,
      mergedMobileShaderProps,
    }),
    [
      srTitle,
      title,
      subtitle,
      description,
      showCta,
      mergedCtaProps,
      renderCta,
      showBadges,
      techStack,
      renderBadge,
      mergedDesktopShaderProps,
      mergedMobileShaderProps,
    ]
  );

  return (
    <LiquidMetalCardContext.Provider value={contextValue}>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-zinc-200 bg-white text-card-foreground shadow-xs dark:border-zinc-900 dark:bg-black transition-all duration-200',
          className
        )}
        data-slot="liquid-metal-card-root"
        ref={ref}
        {...props}
      >
        <span className="sr-only">{srTitle}</span>
        {children}
      </div>
    </LiquidMetalCardContext.Provider>
  );
});
LiquidMetalCardRoot.displayName = 'LiquidMetalCardRoot';

export function LiquidMetalCardContainer({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('relative z-10 flex flex-col gap-4 p-5 md:p-6', className)}
      data-slot="liquid-metal-card-container"
      {...props}
    />
  );
}

export function LiquidMetalCardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 text-balance', className)}
      data-slot="liquid-metal-card-content"
      {...props}
    />
  );
}

export function LiquidMetalCardHeading({
  className,
  title,
  subtitle,
  headingClassName,
  children,
  ...props
}: LiquidMetalCardHeadingProps) {
  const context = useLiquidMetalCardContext();
  const resolvedTitle = title ?? context.title;
  const resolvedSubtitle = subtitle ?? context.subtitle;

  return (
    <div
      className={cn('text-left', className)}
      data-slot="liquid-metal-card-heading-wrap"
      {...props}
    >
      {children ?? (
        <div className="relative">
          <h2
            className={cn(
              'relative mb-0 text-balance font-semibold text-lg md:text-xl tracking-tight text-zinc-900 dark:text-zinc-50',
              headingClassName
            )}
            data-slot="liquid-metal-card-heading"
          >
            {resolvedTitle}
            {resolvedSubtitle ? (
              <>
                {' '}
                <span className="text-zinc-400 dark:text-zinc-500 font-normal">
                  / {resolvedSubtitle}
                </span>
              </>
            ) : null}
          </h2>
        </div>
      )}
    </div>
  );
}

export function LiquidMetalCardDescription({
  className,
  description,
  descriptionClassName,
  children,
  ...props
}: LiquidMetalCardDescriptionProps) {
  const context = useLiquidMetalCardContext();
  const resolvedDescription = description ?? context.description;

  return (
    <div
      className={cn('text-left', className)}
      data-slot="liquid-metal-card-description-wrap"
      {...props}
    >
      {children ?? (
        <p
          className={cn(
            'mt-1 mb-0 font-sans text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed',
            descriptionClassName
          )}
          data-slot="liquid-metal-card-description"
        >
          {resolvedDescription}
        </p>
      )}
    </div>
  );
}

export function LiquidMetalCardActions({
  className,
  showCta,
  ctaProps,
  renderCta,
  children,
  ...props
}: LiquidMetalCardActionsProps) {
  const context = useLiquidMetalCardContext();
  const shouldShowCta = showCta ?? context.showCta;
  const resolvedCtaProps = { ...context.mergedCtaProps, ...ctaProps };
  const resolvedRenderCta = renderCta ?? context.renderCta;

  if (!shouldShowCta) {
    return null;
  }

  const defaultCta = <LiquidMetalCardCTA {...resolvedCtaProps} />;

  return (
    <div
      className={cn('flex justify-start items-center', className)}
      data-slot="liquid-metal-card-cta-wrap"
      {...props}
    >
      {children ??
        (resolvedRenderCta ? resolvedRenderCta(defaultCta) : defaultCta)}
    </div>
  );
}

export function LiquidMetalCardCTA({
  label,
  href,
  target,
  rel,
  onClick,
  className,
  buttonClassName,
}: LiquidMetalCardCTAProps) {
  return (
    <div
      className={cn('flex items-center gap-4', className)}
      data-slot="liquid-metal-card-cta"
    >
      <Button
        render={(buttonProps) => (
          <a
            href={href}
            onClick={onClick}
            rel={rel}
            target={target}
            {...buttonProps}
          >
            {label}
          </a>
        )}
        className={cn(
          'h-8 rounded-md px-3 text-xs font-semibold bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 cursor-pointer transition-colors',
          buttonClassName
        )}
        size="sm"
      />
    </div>
  );
}

export function LiquidMetalCardBadges({
  className,
  showBadges,
  techStack,
  renderBadge,
  ...props
}: LiquidMetalCardBadgesProps) {
  const context = useLiquidMetalCardContext();
  const shouldShowBadges = showBadges ?? context.showBadges;
  const resolvedTechStack = techStack ?? context.techStack;
  const resolvedRenderBadge = renderBadge ?? context.renderBadge;

  if (!shouldShowBadges) {
    return null;
  }

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1.5', className)}
      data-slot="liquid-metal-card-badges"
      {...props}
    >
      {resolvedTechStack.map((tech, index) => {
        const Icon = tech.icon;
        const defaultBadge = (
          <Badge
            className={cn(
              'group relative px-2.5 py-0.5 font-medium transition-all duration-150 text-[10px] rounded-md',
              'border border-zinc-200 bg-zinc-50 text-zinc-650 dark:border-zinc-850 dark:bg-zinc-900/60 dark:text-zinc-400',
              'shadow-2xs hover:-translate-y-px hover:shadow-xs'
            )}
            data-slot="liquid-metal-card-badge"
            key={tech.name}
            variant="outline"
          >
            {Icon ? (
              <Icon className="size-3 opacity-80 mr-1.5 shrink-0" />
            ) : null}
            <span className="font-semibold tracking-tight">{tech.name}</span>
            {tech.version ? (
              <span className="font-mono text-[9px] opacity-50 ml-1">
                {tech.version}
              </span>
            ) : null}
          </Badge>
        );

        if (resolvedRenderBadge) {
          return (
            <React.Fragment key={tech.name}>
              {resolvedRenderBadge(tech, index, defaultBadge)}
            </React.Fragment>
          );
        }

        return defaultBadge;
      })}
    </div>
  );
}

export function LiquidMetalCardVisual({
  className,
  desktopClassName,
  desktopShaderProps,
  ...props
}: LiquidMetalCardVisualProps) {
  const context = useLiquidMetalCardContext();
  const resolvedDesktopShaderProps = {
    ...context.mergedDesktopShaderProps,
    ...desktopShaderProps,
  };

  return (
    <div
      className={cn(
        'relative h-[180px] w-full overflow-hidden rounded-xl bg-transparent border border-border/40',
        className
      )}
      data-slot="liquid-metal-card-visual"
      {...props}
    >
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center overflow-hidden',
          desktopClassName
        )}
        data-slot="liquid-metal-card-desktop"
      >
        <MemoizedLiquidMetal
          {...resolvedDesktopShaderProps}
          image={
            resolvedDesktopShaderProps.image ??
            (defaultDesktopShaderProps.image as string)
          }
        />
      </div>
    </div>
  );
}

export function LiquidMetalCardMobileVisual({
  className,
  mobileShaderProps,
  ...props
}: LiquidMetalCardMobileVisualProps) {
  const context = useLiquidMetalCardContext();
  const resolvedMobileShaderProps = {
    ...context.mergedMobileShaderProps,
    ...mobileShaderProps,
    style: {
      ...(context.mergedMobileShaderProps.style as React.CSSProperties),
      ...(mobileShaderProps?.style as React.CSSProperties | undefined),
    },
  };

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[120px] overflow-hidden opacity-25 dark:opacity-15',
        className
      )}
      data-slot="liquid-metal-card-mobile"
      {...props}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-white dark:from-black to-transparent" />
      <MemoizedLiquidMetal
        {...resolvedMobileShaderProps}
        image={
          resolvedMobileShaderProps.image ??
          (defaultMobileShaderProps.image as string)
        }
      />
    </div>
  );
}

export function LiquidMetalCard({
  containerClassName,
  contentClassName,
  headingWrapClassName,
  headingClassName,
  descriptionWrapClassName,
  descriptionClassName,
  ctaWrapClassName,
  badgesWrapClassName,
  visualClassName,
  mobileVisualClassName,
  ...props
}: LiquidMetalCardProps) {
  return (
    <LiquidMetalCardRoot {...props}>
      <LiquidMetalCardContainer className={containerClassName}>
        <LiquidMetalCardVisual className={visualClassName} />
        <LiquidMetalCardContent className={contentClassName}>
          <LiquidMetalCardHeading
            className={headingWrapClassName}
            headingClassName={headingClassName}
          />
          <LiquidMetalCardDescription
            className={descriptionWrapClassName}
            descriptionClassName={descriptionClassName}
          />
          <div className="flex flex-wrap items-center justify-between gap-4 mt-2 border-t border-zinc-100 dark:border-zinc-900 pt-3">
            <LiquidMetalCardActions className={ctaWrapClassName} />
            <LiquidMetalCardBadges className={badgesWrapClassName} />
          </div>
        </LiquidMetalCardContent>
      </LiquidMetalCardContainer>
      <LiquidMetalCardMobileVisual className={mobileVisualClassName} />
    </LiquidMetalCardRoot>
  );
}

export function BaseUIIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      className="size-3.5"
      {...props}
    >
      <title>Base UI</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );
}

export function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  const id = React.useId();
  const maskId = `${id}-mask`;
  const paint0Id = `${id}-paint0`;
  const paint1Id = `${id}-paint1`;

  return (
    <svg
      fill="none"
      height="1em"
      viewBox="0 0 180 180"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Next.js</title>
      <mask
        height={180}
        id={maskId}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
        width={180}
        x={0}
        y={0}
      >
        <circle cx={90} cy={90} fill="black" r={90} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <circle
          cx={90}
          cy={90}
          fill="black"
          r={87}
          stroke="white"
          strokeWidth={6}
        />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill={`url(#${paint0Id})`}
        />
        <rect
          fill={`url(#${paint1Id})`}
          height={72}
          width={12}
          x={115}
          y={54}
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={paint0Id}
          x1={109}
          x2={144.5}
          y1={116.5}
          y2={160.5}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={paint1Id}
          x1={121}
          x2={120.799}
          y1={54}
          y2={106.875}
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default LiquidMetalCard;
