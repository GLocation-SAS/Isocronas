import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:ring-danger/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
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
      { variant: "neutral", appearance: "default", className: "bg-neutral-500 text-white border-transparent" },
      { variant: "neutral", appearance: "outline", className: "text-neutral-500 border-neutral-500" },
      { variant: "neutral", appearance: "soft", className: "bg-neutral-500/20 text-neutral-600 dark:text-neutral-300" },
      // Primary
      { variant: "primary", appearance: "default", className: "bg-primary text-white border-transparent" },
      { variant: "primary", appearance: "outline", className: "text-primary-400 border-primary-400" },
      { variant: "primary", appearance: "soft", className: "bg-primary/20 text-primary-400" },
      // Secondary
      { variant: "secondary", appearance: "default", className: "bg-secondary text-white border-transparent" },
      { variant: "secondary", appearance: "outline", className: "text-secondary border-secondary" },
      { variant: "secondary", appearance: "soft", className: "bg-secondary/20 text-secondary" },
      // Error
      { variant: "error", appearance: "default", className: "bg-danger text-white border-transparent" },
      { variant: "error", appearance: "outline", className: "text-danger border-danger" },
      { variant: "error", appearance: "soft", className: "bg-danger/20 text-danger" },
      // Success
      { variant: "success", appearance: "default", className: "bg-success text-white border-transparent" },
      { variant: "success", appearance: "outline", className: "text-success border-success" },
      { variant: "success", appearance: "soft", className: "bg-success/20 text-success" },
      // Warning
      { variant: "warning", appearance: "default", className: "bg-warning text-white border-transparent" },
      { variant: "warning", appearance: "outline", className: "text-warning border-warning" },
      { variant: "warning", appearance: "soft", className: "bg-warning/20 text-warning" },
      // Info
      { variant: "info", appearance: "default", className: "bg-info text-white border-transparent" },
      { variant: "info", appearance: "outline", className: "text-info border-info" },
      { variant: "info", appearance: "soft", className: "bg-info/20 text-info" },
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
