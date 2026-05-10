import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-base font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_28px_rgba(58,36,28,0.16)] hover:scale-[1.02] hover:shadow-[0_14px_36px_rgba(58,36,28,0.22)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.35)]",

        outline:
          "border-border bg-card text-foreground shadow-sm hover:scale-[1.01] hover:bg-muted",

        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:scale-[1.01] hover:bg-secondary/85 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",

        ghost:
          "border-transparent bg-transparent text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        destructive:
          "bg-destructive text-white shadow-sm hover:scale-[1.01] hover:opacity-90 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",

        link:
          "h-auto rounded-none border-transparent bg-transparent px-0 text-primary underline-offset-4 shadow-none hover:underline",
      },

      size: {
        default:
          "h-[52px] gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",

        xs:
          "h-8 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",

        sm:
          "h-10 gap-1.5 px-4 text-sm [&_svg:not([class*='size-'])]:size-3.5",

        lg:
          "h-14 gap-2 px-8 text-base [&_svg:not([class*='size-'])]:size-5",

        icon:
          "size-11 p-0 [&_svg:not([class*='size-'])]:size-5",

        "icon-xs":
          "size-8 p-0 [&_svg:not([class*='size-'])]:size-3.5",

        "icon-sm":
          "size-10 p-0 [&_svg:not([class*='size-'])]:size-4",

        "icon-lg":
          "size-12 p-0 [&_svg:not([class*='size-'])]:size-5",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }