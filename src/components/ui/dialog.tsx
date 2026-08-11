"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const dialogVariants = cva(
  "fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-3xl border bg-background/90 backdrop-blur-xl p-6 sm:p-8 duration-200 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
  {
    variants: {
      variant: {
        default: "border-border border-primary shadow-2xl shadow-primary/25",
        success: "border-success/30 shadow-2xl shadow-success/10",
        danger: "border-danger/30 shadow-2xl shadow-danger/10",
        warning: "border-warning/30 shadow-2xl shadow-warning/10",
        info: "border-info/30 shadow-2xl shadow-info/10",
      },
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/40 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  variant,
  size,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogVariants> & {
    showCloseButton?: boolean
  }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogVariants({ variant, size }), "overflow-hidden", className)}
        {...props}
      >
        {/* ═══ TOP SOFT AURA GLOW (COMO LA FOTO) ═══ */}
        <div className={cn(
          "absolute -top-32 left-1/2 -translate-x-1/2 size-80 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700",
          variant === "success" && "bg-success",
          variant === "danger" && "bg-danger",
          variant === "warning" && "bg-warning",
          variant === "info" && "bg-info",
          (variant === "default" || !variant) && "bg-primary"
        )} />

        <div className="relative z-10 grid gap-6">
          {children}
        </div>
        {showCloseButton && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogPrimitive.Close
                  data-slot="dialog-close"
                  asChild
                  className="absolute top-4 right-4 z-20"
                >
                  <Button
                    variant="ghost"
                    className="rounded-full size-8 p-0 opacity-50 hover:opacity-100 hover:bg-muted/50 transition-all"
                    size="icon"
                  >
                    <XIcon className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogPrimitive.Close>
              </TooltipTrigger>
              <TooltipContent side="top" className="z-[60]">
                Cerrar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogIcon({
  className,
  icon: Icon,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  icon: React.ComponentType<{ className?: string }>;
  variant?: "default" | "success" | "danger" | "warning" | "info";
}) {
  return (
    <div
      data-slot="dialog-icon"
      className={cn(
        "mx-auto size-14 rounded-full bg-card border border-border/80 shadow-md flex items-center justify-center relative z-10 transition-transform duration-300 hover:scale-105 mb-1",
        className
      )}
      {...props}
    >
      <Icon
        className={cn(
          "size-6",
          variant === "success" && "text-success",
          variant === "danger" && "text-danger",
          variant === "warning" && "text-warning",
          variant === "info" && "text-info",
          (variant === "default" || !variant) && "text-primary"
        )}
      />
    </div>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-3 text-center items-center justify-center", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col gap-2.5 w-full justify-center items-stretch",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="secondary" className="rounded-full w-full">Cancelar</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-2xl font-heading font-bold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-base text-foreground leading-relaxed text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
