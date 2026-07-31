import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-3 py-1 text-xs font-semibold tracking-normal whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-danger [&>svg]:pointer-events-none [&>svg]:size-3.5! [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        error: "",
        success: "",
        warning: "",
        info: "",
        neutral: "",
        ghost: "bg-muted hover:text-muted-foreground",
        link: "text-primary underline-offset-4 hover:underline bg-transparent px-0!",
      },
      appearance: {
        default: "",
        outline: "bg-transparent border",
        soft: "border-transparent",
      },
    },
    compoundVariants: [
      // Neutral
      { variant: "neutral", appearance: "default", className: "bg-neutral-600 text-white border-transparent" },
      { variant: "neutral", appearance: "outline", className: "text-neutral-500 border-neutral-300 dark:border-neutral-700" },
      { variant: "neutral", appearance: "soft", className: "bg-neutral-500/10 text-neutral-700 dark:text-neutral-300" },
      // Primary
      { variant: "primary", appearance: "default", className: "bg-primary text-primary-foreground border-transparent" },
      { variant: "primary", appearance: "outline", className: "text-primary border-primary/40" },
      { variant: "primary", appearance: "soft", className: "bg-primary/15 text-primary font-bold" },
      // Secondary
      { variant: "secondary", appearance: "default", className: "bg-secondary text-secondary-foreground border-transparent" },
      { variant: "secondary", appearance: "outline", className: "text-secondary border-secondary/40" },
      { variant: "secondary", appearance: "soft", className: "bg-secondary/15 text-secondary font-bold" },
      // Error
      { variant: "error", appearance: "default", className: "bg-danger text-danger-foreground border-transparent" },
      { variant: "error", appearance: "outline", className: "text-danger border-danger/40" },
      { variant: "error", appearance: "soft", className: "bg-danger/15 text-danger font-bold" },
      // Success
      { variant: "success", appearance: "default", className: "bg-success text-success-foreground border-transparent" },
      { variant: "success", appearance: "outline", className: "text-success border-success/40" },
      { variant: "success", appearance: "soft", className: "bg-success/15 text-success font-bold" },
      // Warning
      { variant: "warning", appearance: "default", className: "bg-warning text-warning-foreground border-transparent" },
      { variant: "warning", appearance: "outline", className: "text-warning border-warning/40" },
      { variant: "warning", appearance: "soft", className: "bg-warning/15 text-warning font-bold" },
      // Info
      { variant: "info", appearance: "default", className: "bg-info text-info-foreground border-transparent" },
      { variant: "info", appearance: "outline", className: "text-info border-info/40" },
      { variant: "info", appearance: "soft", className: "bg-info/15 text-info font-bold" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "default",
    },
  }
)

function Badge({
  className,
  variant = "primary",
  appearance = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-appearance={appearance}
      className={cn(badgeVariants({ variant, appearance }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
