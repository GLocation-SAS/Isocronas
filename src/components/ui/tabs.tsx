"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-full p-2 text-muted-foreground bg-surface/40 backdrop-blur-md border border-border shadow-sm transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_-5px_rgba(90,57,136,0.3)]",
  {
    variants: {
      variant: {
        default: "",
        line: "rounded-none border-0 bg-transparent p-0 shadow-none hover:shadow-none hover:border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-4 py-1 text-[10px] font-heading font-bold tracking-widest text-muted-foreground transition-all uppercase whitespace-nowrap select-none",
        "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1.5px] after:bg-primary/60 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
        "data-active:bg-primary data-active:text-white data-active:rounded-full data-active:px-6 data-active:py-2 data-active:shadow-lg data-active:shadow-primary/25 data-active:after:hidden data-active:animate-in data-active:fade-in data-active:zoom-in-95 data-active:duration-300",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
