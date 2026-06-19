"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base
    "group",
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",

    "overflow-hidden",
    "rounded-full",
    "border-2",
    "w-full",


    "font-semibold",
    "outline-none",
    "select-none",
    "isolate",

    // Motion
    "transition-[border-color,color,transform,box-shadow]",
    "duration-500",

    // States
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "active:scale-[0.96]",

    // Icons
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "border-primary",
          "text-white",
          "bg-primary",

          // Radial fill
          "[--radial-bg:var(--primitive-primary-400)] dark:[--radial-bg:var(--primitive-primary-900)]",

          // Glow
          "[--glow:var(--primitive-primary-500)]",

          // Hover
          "hover:text-primary-50",

        ].join(" "),

        secondary: [
          "border-secondary",
          "text-secondary",

          "[--radial-bg:var(--primitive-secondary-500)]",
          "[--glow:var(--primitive-secondary-400)]",

          "hover:text-white",
          "hover:shadow-[0_0_25px_-8px_var(--primitive-secondary-400)]",
        ].join(" "),

        success: [
          "border-success",
          "text-white",
          "bg-success",

          "[--radial-bg:var(--primitive-success-600)]",
          "[--glow:var(--primitive-success-600)]",

          "hover:text-success-50",
        ].join(" "),

        warning: [
          "border-warning",
          "text-white",
          "bg-warning",

          "[--radial-bg:var(--primitive-warning-600)]",
          "[--glow:var(--primitive-warning-600)]",

          "hover:text-white",
        ].join(" "),

        danger: [
          "border-danger",
          "text-white",
          "bg-danger",

          "[--radial-bg:var(--primitive-danger-700)]",
          "[--glow:var(--primitive-danger-700)]",

          "hover:text-danger-50",
        ].join(" "),

        info: [
          "border-info",
          "text-white",
          "bg-info",

          "[--radial-bg:var(--primitive-info-600)]",
          "[--glow:var(--primitive-info-600)]",

          "hover:text-info-50",
        ].join(" "),
        ghost: [
          // Colors
          "border-transparent",
          "text-foreground",

          // Transparent base
          "bg-transparent",

          // Radial
          "[--radial-bg:hsl(var(--foreground)/0.10)]",

          // Glow
          "[--glow:hsl(var(--foreground)/0.20)]",

          // Hover
          "hover:text-foreground",
          "hover:border-border/40",
          "hover:bg-muted/30",
        ].join(" "),

        neutral: [
          // Base
          "border-border",
          "bg-muted/40",
          "text-foreground",

          // Radial
          "[--radial-bg:hsl(var(--muted-foreground)/0.25)]",

          // Glow
          "[--glow:hsl(var(--muted-foreground)/0.20)]",

          // Hover
          "hover:border-foreground/20",
          "hover:bg-muted/60",
          "hover:text-foreground",
          "hover:shadow-[0_0_20px_-10px_hsl(var(--foreground)/0.25)]",
        ].join(" "),
      },

      size: {
        default: "h-11 px-8 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-10 text-lg",
        icon: "w-11 h-11 shrink-0",
        "icon-sm": "w-9 h-9 shrink-0",
        "icon-xs": "w-7 h-7 shrink-0",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouseMove = (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      const rect = e.currentTarget.getBoundingClientRect()

      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/* RADIAL FILL */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute",
                "z-[1]",

                // Size
                "h-64",
                "w-64",

                // Shape
                "rounded-full",

                // Color
                "bg-[var(--radial-bg)]",

                // Performance
                "transform-gpu",
                "will-change-transform",

                // Smooth
                "transition-[transform,opacity]",
                "duration-700",
                "ease-out"
              )}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.6 : 0})`,
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* LIQUID GLOW */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute",
                "z-[2]",

                "h-40",
                "w-40",

                "-translate-x-1/2",
                "-translate-y-1/2",

                "rounded-full",

                "bg-[var(--glow)]",

                "blur-[45px]",

                "transition-opacity",
                "duration-700",
                "ease-out"
              )}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: isHovered ? 0.45 : 0,
              }}
            />

            {/* SOFT LIGHT */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none",
                "absolute",
                "inset-0",
                "z-[3]",

                "bg-gradient-to-br",
                "from-white/10",
                "to-transparent",

                "transition-opacity",
                "duration-500",

                isHovered ? "opacity-100" : "opacity-0"
              )}
            />

            {/* CONTENT */}
            <span className="relative z-[4] flex items-center gap-2">
              {leftIcon}
              {children}
              {rightIcon}
            </span>
          </>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }