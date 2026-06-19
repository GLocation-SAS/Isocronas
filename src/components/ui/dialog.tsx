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
        {/* ═══ AMBIENT GLOWS — Top-Left ═══ */}
        {/* Halo exterior — color primario del variant */}
        <div className={cn(
          "absolute -top-40 -left-40 size-80 rounded-full blur-[100px] opacity-[0.18] pointer-events-none transition-all duration-700",
          variant === "success" && "bg-success-400",
          variant === "danger" && "bg-danger-400",
          variant === "warning" && "bg-warning-400",
          variant === "info" && "bg-info-400",
          (variant === "default" || !variant) && "bg-primary-400"
        )} />
        {/* Orb medio — tono complementario */}
        <div className={cn(
          "absolute -top-16 -left-16 size-40 rounded-full blur-[60px] opacity-[0.22] pointer-events-none transition-all duration-700",
          variant === "success" && "bg-success-500",
          variant === "danger" && "bg-danger-500",
          variant === "warning" && "bg-warning-500",
          variant === "info" && "bg-info-500",
          (variant === "default" || !variant) && "bg-secondary-400"
        )} />

        {/* ═══ AMBIENT GLOWS — Bottom-Right ═══ */}
        {/* Halo exterior — color complementario */}
        <div className={cn(
          "absolute -bottom-40 -right-40 size-80 rounded-full blur-[100px] opacity-[0.18] pointer-events-none transition-all duration-700",
          variant === "success" && "bg-success-500",
          variant === "danger" && "bg-danger-500",
          variant === "warning" && "bg-warning-400",
          variant === "info" && "bg-info-500",
          (variant === "default" || !variant) && "bg-secondary-400"
        )} />
        {/* Orb medio */}
        <div className={cn(
          "absolute -bottom-16 -right-16 size-40 rounded-full blur-[60px] opacity-[0.22] pointer-events-none transition-all duration-700",
          variant === "success" && "bg-success-400",
          variant === "danger" && "bg-danger-400",
          variant === "warning" && "bg-warning-500",
          variant === "info" && "bg-info-400",
          (variant === "default" || !variant) && "bg-primary-500"
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
              <TooltipContent side="left" className="z-[60]">
                Cerrar
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-5 text-center", className)}
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
        "flex flex-col sm:flex-row sm:justify-center gap-3",
        className
      )}
      {...props}
    >
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="neutral" className="sm:order-first">Cerrar</Button>
        </DialogPrimitive.Close>
      )}
      {children}
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
