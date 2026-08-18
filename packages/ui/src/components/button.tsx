import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "group/button focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:scale-[0.98] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-xl border border-transparent bg-clip-padding text-sm font-semibold outline-none transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-primary text-white shadow-xs hover:opacity-90 active:opacity-100",
        solid: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        outline:
          "border-border/80 bg-background/90 shadow-2xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        "outline-brand":
          "border-brand-blue/40 dark:border-brand-green/40 text-brand-blue dark:text-brand-green bg-brand-blue/5 dark:bg-brand-green/10 hover:bg-brand-blue/10 dark:hover:bg-brand-green/20 shadow-2xs",
        "outline-emerald":
          "border-emerald-600/30 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-800 shadow-2xs",
        secondary:
          "bg-secondary text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] shadow-2xs",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        gradient:
          "bg-gradient-primary text-white shadow-xs hover:opacity-90 active:opacity-100",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        hero: "h-11 sm:h-12 gap-2 px-5 sm:px-6 text-sm sm:text-base font-bold rounded-xl",
        lg: "h-10 sm:h-11 gap-2 px-4 sm:px-5 text-sm font-bold rounded-xl",
        default:
          "in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 h-9 sm:h-10 gap-1.5 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-xl",
        card: "h-8 sm:h-8.5 gap-1.5 px-3 sm:px-3.5 text-xs font-bold rounded-xl",
        sm: "in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 h-8 sm:h-8.5 gap-1.5 px-3 text-xs font-semibold rounded-xl",
        xs: "in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 h-6.5 sm:h-7 gap-1 px-2.5 text-[11px] font-semibold rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-hero": "size-11 sm:size-12 rounded-xl",
        icon: "size-9 sm:size-10 rounded-xl",
        "icon-sm":
          "in-data-[slot=button-group]:rounded-xl size-8 sm:size-8.5 rounded-xl",
        "icon-xs":
          "in-data-[slot=button-group]:rounded-lg size-6.5 sm:size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-lg": "size-10 sm:size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

