import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex items-center gap-1 bg-surface/10 backdrop-blur-md border border-border p-2 rounded-full shadow-sm w-fit transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_-5px_rgba(90,57,136,0.3)]",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("flex items-center", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "relative flex items-center gap-2 px-4 py-1 text-[10px] font-heading font-bold tracking-widest text-muted-foreground hover:text-foreground transition-all uppercase after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1.5px] after:bg-primary/60 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-full text-[10px] font-heading font-bold tracking-widest shadow-lg shadow-primary/25 uppercase animate-in fade-in zoom-in-95 duration-500",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center mx-0.5", className)}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon className="size-3.5 text-primary-400/90 dark:text-primary-600/90" />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="size-3.5" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
