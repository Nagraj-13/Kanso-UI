import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "shadow-sm",
        secondary: "shadow-2xs",
        outline: "border bg-transparent shadow-3xs",
        ghost: "",
        link: "underline-offset-4 hover:underline p-0 h-auto rounded-none active:scale-100",
      },
      size: {
        default: "h-9.5 px-4 py-2",
        sm: "h-8.5 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        icon: "size-9.5",
      },
      color: {
        zinc: "",
        blue: "",
        emerald: "",
        violet: "",
        amber: "",
        rose: "",
      },
    },
    compoundVariants: [
      // Zinc
      {
        color: "zinc",
        variant: "primary",
        className: "bg-zinc-950 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 focus-visible:ring-zinc-400",
      },
      {
        color: "zinc",
        variant: "secondary",
        className: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800/80 focus-visible:ring-zinc-400",
      },
      {
        color: "zinc",
        variant: "outline",
        className: "border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900/60 focus-visible:ring-zinc-400",
      },
      {
        color: "zinc",
        variant: "ghost",
        className: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-50 focus-visible:ring-zinc-400",
      },
      {
        color: "zinc",
        variant: "link",
        className: "text-zinc-900 dark:text-zinc-50 focus-visible:ring-zinc-400",
      },

      // Blue
      {
        color: "blue",
        variant: "primary",
        className: "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 focus-visible:ring-blue-400",
      },
      {
        color: "blue",
        variant: "secondary",
        className: "bg-blue-50 text-blue-900 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/60 focus-visible:ring-blue-400",
      },
      {
        color: "blue",
        variant: "outline",
        className: "border-blue-200 text-blue-600 hover:bg-blue-50/50 dark:border-blue-900/60 dark:text-blue-400 dark:hover:bg-blue-950/20 focus-visible:ring-blue-400",
      },
      {
        color: "blue",
        variant: "ghost",
        className: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 focus-visible:ring-blue-400",
      },
      {
        color: "blue",
        variant: "link",
        className: "text-blue-600 dark:text-blue-400 focus-visible:ring-blue-400",
      },

      // Emerald
      {
        color: "emerald",
        variant: "primary",
        className: "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 focus-visible:ring-emerald-400",
      },
      {
        color: "emerald",
        variant: "secondary",
        className: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/60 focus-visible:ring-emerald-400",
      },
      {
        color: "emerald",
        variant: "outline",
        className: "border-emerald-200 text-emerald-600 hover:bg-emerald-50/50 dark:border-emerald-900/60 dark:text-emerald-400 dark:hover:bg-emerald-950/20 focus-visible:ring-emerald-400",
      },
      {
        color: "emerald",
        variant: "ghost",
        className: "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30 focus-visible:ring-emerald-400",
      },
      {
        color: "emerald",
        variant: "link",
        className: "text-emerald-600 dark:text-emerald-400 focus-visible:ring-emerald-400",
      },

      // Violet
      {
        color: "violet",
        variant: "primary",
        className: "bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-500 dark:hover:bg-violet-400 focus-visible:ring-violet-400",
      },
      {
        color: "violet",
        variant: "secondary",
        className: "bg-violet-50 text-violet-900 hover:bg-violet-100 dark:bg-violet-950/40 dark:text-violet-200 dark:hover:bg-violet-950/60 focus-visible:ring-violet-400",
      },
      {
        color: "violet",
        variant: "outline",
        className: "border-violet-200 text-violet-600 hover:bg-violet-50/50 dark:border-violet-900/60 dark:text-violet-400 dark:hover:bg-violet-950/20 focus-visible:ring-violet-400",
      },
      {
        color: "violet",
        variant: "ghost",
        className: "text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/30 focus-visible:ring-violet-400",
      },
      {
        color: "violet",
        variant: "link",
        className: "text-violet-600 dark:text-violet-400 focus-visible:ring-violet-400",
      },

      // Amber
      {
        color: "amber",
        variant: "primary",
        className: "bg-amber-600 text-white hover:bg-amber-500 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400 focus-visible:ring-amber-400",
      },
      {
        color: "amber",
        variant: "secondary",
        className: "bg-amber-50 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-950/60 focus-visible:ring-amber-400",
      },
      {
        color: "amber",
        variant: "outline",
        className: "border-amber-200 text-amber-600 hover:bg-amber-50/50 dark:border-amber-900/60 dark:text-amber-400 dark:hover:bg-amber-950/20 focus-visible:ring-amber-400",
      },
      {
        color: "amber",
        variant: "ghost",
        className: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30 focus-visible:ring-amber-400",
      },
      {
        color: "amber",
        variant: "link",
        className: "text-amber-600 dark:text-amber-400 focus-visible:ring-amber-400",
      },

      // Rose
      {
        color: "rose",
        variant: "primary",
        className: "bg-rose-600 text-white hover:bg-rose-500 dark:bg-rose-500 dark:hover:bg-rose-400 focus-visible:ring-rose-400",
      },
      {
        color: "rose",
        variant: "secondary",
        className: "bg-rose-50 text-rose-900 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:hover:bg-rose-950/60 focus-visible:ring-rose-400",
      },
      {
        color: "rose",
        variant: "outline",
        className: "border-rose-200 text-rose-600 hover:bg-rose-50/50 dark:border-rose-900/60 dark:text-rose-400 dark:hover:bg-rose-950/20 focus-visible:ring-rose-400",
      },
      {
        color: "rose",
        variant: "ghost",
        className: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30 focus-visible:ring-rose-400",
      },
      {
        color: "rose",
        variant: "link",
        className: "text-rose-600 dark:text-rose-400 focus-visible:ring-rose-400",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      color: "zinc",
    },
  }
)

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  /** Inactive state rendering the button disabled */
  inactive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, inactive, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={inactive}
        className={cn(buttonVariants({ variant, size, color, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
