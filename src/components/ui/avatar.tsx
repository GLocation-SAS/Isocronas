"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-10 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-14 data-[size=sm]:size-8 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary [&_svg]:text-primary group-data-[size=sm]/avatar:text-xs select-none",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, children, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute -right-0.5 -bottom-0.5 z-10 inline-flex items-center justify-center rounded-full ring-2 ring-background select-none shrink-0 shadow-xs",
        "group-data-[size=sm]/avatar:size-3.5 group-data-[size=sm]/avatar:[&>svg]:size-2",
        "group-data-[size=default]/avatar:size-5 group-data-[size=default]/avatar:[&>svg]:size-3.5",
        "group-data-[size=lg]/avatar:size-6 group-data-[size=lg]/avatar:[&>svg]:size-4",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
}
