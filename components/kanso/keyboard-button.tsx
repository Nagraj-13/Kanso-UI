import * as React from 'react';
import { cn } from '@/lib/utils';

export interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant for the keycap color */
  variantColor?: 'dark' | 'light' | 'blue';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Key symbol or icon displayed at the top */
  icon?: React.ReactNode;
}

const KeyboardButton = React.forwardRef<HTMLButtonElement, KeyboardButtonProps>(
  (
    {
      className,
      variantColor = 'dark',
      size = 'lg',
      icon,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // Base mechanical layout & perspective (fully native to prevent default hover shade pollution)
          'flex flex-col items-start justify-between cursor-pointer relative select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',

          // Easing / Spring transition
          'transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]',

          // 3D Tilt perspective transform & dynamics
          '[transform:perspective(150px)_rotateX(6deg)_translateY(0)]',
          'hover:-translate-y-[4px] hover:[transform:perspective(150px)_rotateX(8deg)_translateZ(4px)]',
          'active:translate-y-[2px] active:[transform:perspective(150px)_rotateX(2deg)_translateZ(-2px)] active:duration-75',

          // Size styles
          size === 'sm' &&
            'h-[45px] min-w-[45px] text-[8px] p-2 rounded-t-[10px] rounded-b-[8px]',
          size === 'md' &&
            'h-[55px] min-w-[55px] text-[9px] p-2.5 rounded-t-[12px] rounded-b-[10px]',
          size === 'lg' &&
            'h-[65px] min-w-[70px] text-[11px] p-3 rounded-t-[15px] rounded-b-[12px]',

          // before backdrop shading (the physical keyboard well shadow / depth)
          "before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(0,0,0,0.15),rgba(0,0,0,0)),linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0))] before:bg-[position:bottom_right,bottom_right] before:bg-[size:100%_100%,100%_100%] before:bg-no-repeat before:z-[-1] before:transition-all",
          size === 'sm' && 'before:rounded-[10px]',
          size === 'md' && 'before:rounded-[12px]',
          size === 'lg' && 'before:rounded-[15px]',

          // after gloss shading (keycap bevel / lighting reflection)
          "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-black/30 after:z-[-1] after:transition-all",
          size === 'sm' && 'after:rounded-[10px]',
          size === 'md' && 'after:rounded-[12px]',
          size === 'lg' && 'after:rounded-[15px]',

          // Color & Shading Variations
          variantColor === 'dark' && [
            'bg-zinc-900 text-zinc-100 border border-zinc-950/50',
            // Default flat shadow
            'shadow-[0_2px_0px_#09090b,0_4px_6px_rgba(0,0,0,0.4),inset_0_1px_0px_rgba(255,255,255,0.15),inset_0_-4px_0px_#18181b]',
            // Hover state (taller shadow, baseline glow, no gray overlays)
            'hover:bg-zinc-850 hover:shadow-[0_5px_0px_#09090b,0_8px_16px_rgba(0,0,0,0.5),inset_0_1.5px_0px_rgba(255,255,255,0.25),inset_0_-4px_0px_#18181b]',
            // Active state (depressed shadow)
            'active:shadow-[0_1px_0px_#09090b,0_2px_4px_rgba(0,0,0,0.3),inset_0_0.5px_0px_rgba(255,255,255,0.05),inset_0_-1px_0px_#18181b]',
            'after:shadow-[inset_2px_2px_0px_rgba(255,255,255,0.05)]',
          ],
          variantColor === 'light' && [
            'bg-zinc-100 text-zinc-800 border border-zinc-200/60',
            // Default flat shadow
            'shadow-[0_2px_0px_#d4d4d8,0_4px_6px_rgba(0,0,0,0.06),inset_0_1px_0px_rgba(255,255,255,0.7),inset_0_-4px_0px_#e4e4e7]',
            // Hover state (brighter white base, clean gray-beige under-shadow, no black overlay)
            'hover:bg-white hover:text-zinc-900 hover:border-zinc-300 hover:shadow-[0_5px_0px_#c8c8cc,0_8px_16px_rgba(0,0,0,0.08),inset_0_1.5px_0px_rgba(255,255,255,1),inset_0_-4px_0px_#e4e4e7]',
            // Active state (depressed shadow)
            'active:shadow-[0_1px_0px_#d4d4d8,0_2px_4px_rgba(0,0,0,0.04),inset_0_0.5px_0px_rgba(255,255,255,0.3),inset_0_-1px_0px_#e4e4e7]',
            'after:from-white/30 after:to-black/5',
            'after:shadow-[inset_2px_2px_0px_rgba(255,255,255,0.4)]',
          ],
          variantColor === 'blue' && [
            'bg-blue-600 text-white border border-blue-700/60',
            // Default flat shadow
            'shadow-[0_2px_0px_#1d4ed8,0_4px_6px_rgba(29,78,216,0.3),inset_0_1px_0px_rgba(255,255,255,0.3),inset_0_-4px_0px_#2563eb]',
            // Hover state (brighter blue, rich deep blue shadow, no dark gray overlay)
            'hover:bg-blue-500 hover:shadow-[0_5px_0px_#1e40af,0_8px_16px_rgba(29,78,216,0.45),inset_0_1.5px_0px_rgba(255,255,255,0.45),inset_0_-4px_0px_#2563eb]',
            // Active state (depressed shadow)
            'active:shadow-[0_1px_0px_#1d4ed8,0_2px_4px_rgba(29,78,216,0.2),inset_0_0.5px_0px_rgba(255,255,255,0.15),inset_0_-1px_0px_#2563eb]',
            'after:shadow-[inset_2px_2px_0px_rgba(255,255,255,0.15)]',
          ],
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex items-center justify-center text-[7px] font-normal tracking-wide lowercase opacity-60 shrink-0 self-start h-4">
            {icon}
          </div>
        )}
        <span
          className={cn(
            'font-semibold tracking-tight uppercase self-end mt-auto',
            size === 'sm' && 'text-[8px]',
            size === 'md' && 'text-[9px]',
            size === 'lg' && 'text-[10px]'
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

KeyboardButton.displayName = 'KeyboardButton';

export { KeyboardButton };
