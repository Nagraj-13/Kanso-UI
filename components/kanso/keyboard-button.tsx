import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface KeyboardButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  /** Visual style variant for the keycap color */
  variantColor?: 'dark' | 'light' | 'blue';
  /** Key symbol or icon displayed at the top */
  icon?: React.ReactNode;
}

const KeyboardButton = React.forwardRef<HTMLButtonElement, KeyboardButtonProps>(
  ({ className, variantColor = 'dark', icon, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          'flex flex-col items-start justify-between text-[11px] border border-black/10 p-3 rounded-t-[15px] rounded-b-[12px] cursor-pointer relative h-[65px] min-w-[70px] select-none transition-all duration-100 ease-in-out [transform:perspective(70px)_rotateX(5deg)_rotateY(0deg)] active:[transform:perspective(80px)_rotateX(5deg)_rotateY(1deg)_translateY(3px)_scale(0.96)] focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 hover:bg-transparent',
          // before backdrop shading
          "before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(to_right,rgba(0,0,0,0.8),rgba(0,0,0,0)),linear-gradient(to_bottom,rgba(0,0,0,0.8),rgba(0,0,0,0))] before:bg-[position:bottom_right,bottom_right] before:bg-[size:100%_100%,100%_100%] before:bg-no-repeat before:z-[-1] before:rounded-[15px] before:transition-all",
          // after gloss shading
          "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/20 after:to-black/50 after:z-[-1] after:rounded-[15px] after:transition-all",

          // Color styles
          variantColor === 'dark' && [
            'bg-zinc-950 text-zinc-50',
            'shadow-[inset_-4px_-10px_0px_rgba(255,255,255,0.4),inset_-4px_-8px_0px_rgba(0,0,0,0.3),0px_2px_1px_rgba(0,0,0,0.3),0px_2px_1px_rgba(255,255,255,0.1)]',
            'after:shadow-[inset_4px_0px_0px_rgba(255,255,255,0.1),inset_4px_-8px_0px_rgba(0,0,0,0.3)]',
            'active:shadow-[inset_-4px_-8px_0px_rgba(255,255,255,0.2),inset_-4px_-6px_0px_rgba(0,0,0,0.8),0px_1px_0px_rgba(0,0,0,0.9),0px_1px_0px_rgba(255,255,255,0.2)]',
          ],
          variantColor === 'light' && [
            'bg-zinc-100 text-zinc-900 border-zinc-200/50',
            'shadow-[inset_-4px_-10px_0px_rgba(255,255,255,0.8),inset_-4px_-8px_0px_rgba(0,0,0,0.1),0px_2px_1px_rgba(0,0,0,0.15),0px_2px_1px_rgba(255,255,255,0.6)]',
            'after:shadow-[inset_4px_0px_0px_rgba(255,255,255,0.4),inset_4px_-8px_0px_rgba(0,0,0,0.1)]',
            'after:from-white/50 after:to-black/10',
            'active:shadow-[inset_-4px_-8px_0px_rgba(255,255,255,0.4),inset_-4px_-6px_0px_rgba(0,0,0,0.2),0px_1px_0px_rgba(0,0,0,0.2),0px_1px_0px_rgba(255,255,255,0.4)]',
          ],
          variantColor === 'blue' && [
            'bg-blue-600 text-white border-blue-700/50',
            'shadow-[inset_-4px_-10px_0px_rgba(255,255,255,0.4),inset_-4px_-8px_0px_rgba(0,0,0,0.3),0px_2px_1px_rgba(0,0,0,0.3),0px_2px_1px_rgba(255,255,255,0.2)]',
            'after:shadow-[inset_4px_0px_0px_rgba(255,255,255,0.2),inset_4px_-8px_0px_rgba(0,0,0,0.3)]',
            'active:shadow-[inset_-4px_-8px_0px_rgba(255,255,255,0.2),inset_-4px_-6px_0px_rgba(0,0,0,0.8),0px_1px_0px_rgba(0,0,0,0.9),0px_1px_0px_rgba(255,255,255,0.2)]',
          ],
          className
        )}
        {...props}
      >
        {icon && (
          <div className="flex items-center justify-center size-4 opacity-80 shrink-0 self-start">
            {icon}
          </div>
        )}
        <span className="font-semibold text-[10px] tracking-tight uppercase self-end mt-auto">
          {children}
        </span>
      </Button>
    );
  }
);

KeyboardButton.displayName = 'KeyboardButton';

export { KeyboardButton };
