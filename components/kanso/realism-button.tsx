import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface RealismButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  /** Color theme variant for the glowing background blobs */
  variantColor?: 'cyan' | 'rose' | 'emerald' | 'violet';
}

const RealismButton = React.forwardRef<HTMLButtonElement, RealismButtonProps>(
  ({ className, variantColor = 'cyan', children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          "relative cursor-pointer rounded-2xl border-0 p-[2px] h-auto bg-[radial-gradient(circle_80px_at_80%_-10%,#ffffff,#181b1b)] after:content-[''] after:absolute after:w-[65%] after:h-[60%] after:rounded-[120px] after:top-0 after:right-0 after:shadow-[0_0_20px_rgba(255,255,255,0.22)] after:z-[-1] overflow-hidden active:scale-95 transition-all duration-200 hover:bg-transparent hover:text-white",
          className
        )}
        {...props}
      >
        {/* Blob 1 */}
        <div
          className={cn(
            'absolute w-[70px] h-full rounded-2xl bottom-0 left-0 z-0 transition-opacity',
            variantColor === 'cyan' &&
              'bg-[radial-gradient(circle_60px_at_0%_100%,#3fe9ff,#0000ff80,transparent)] shadow-[-10px_10px_30px_rgba(0,81,255,0.18)]',
            variantColor === 'rose' &&
              'bg-[radial-gradient(circle_60px_at_0%_100%,#f43f5e,#e11d4880,transparent)] shadow-[-10px_10px_30px_rgba(225,29,72,0.18)]',
            variantColor === 'emerald' &&
              'bg-[radial-gradient(circle_60px_at_0%_100%,#10b981,#05966980,transparent)] shadow-[-10px_10px_30px_rgba(5,150,105,0.18)]',
            variantColor === 'violet' &&
              'bg-[radial-gradient(circle_60px_at_0%_100%,#8b5cf6,#7c3aed80,transparent)] shadow-[-10px_10px_30px_rgba(124,58,237,0.18)]'
          )}
        />
        {/* Blob 2 (Custom Kanso touch for balanced glow) */}
        <div
          className={cn(
            'absolute w-[70px] h-full rounded-2xl bottom-0 right-0 z-0 opacity-50 transition-opacity',
            variantColor === 'cyan' &&
              'bg-[radial-gradient(circle_60px_at_100%_0%,rgba(236,72,153,0.3),transparent)]',
            variantColor === 'rose' &&
              'bg-[radial-gradient(circle_60px_at_100%_0%,rgba(59,130,246,0.3),transparent)]',
            variantColor === 'emerald' &&
              'bg-[radial-gradient(circle_60px_at_100%_0%,rgba(245,158,11,0.3),transparent)]',
            variantColor === 'violet' &&
              'bg-[radial-gradient(circle_60px_at_100%_0%,rgba(16,185,129,0.3),transparent)]'
          )}
        />
        {/* Inner Content Area */}
        <div className="relative z-10 w-full h-full px-6 py-3 rounded-[14px] text-white font-medium bg-[radial-gradient(circle_80px_at_80%_-50%,#777777,#0f1111)] before:content-[''] before:absolute before:inset-0 before:rounded-[14px] before:bg-[radial-gradient(circle_60px_at_0%_100%,rgba(0,225,255,0.08),rgba(0,0,255,0.04),transparent)]">
          {children}
        </div>
      </Button>
    );
  }
);

RealismButton.displayName = 'RealismButton';

export { RealismButton };
