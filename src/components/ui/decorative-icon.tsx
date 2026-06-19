"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const decorativeIconVariants = cva(
  "relative inline-flex items-center justify-center shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary",
        danger: "text-danger",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
        secondary: "text-secondary",
      },
      size: {
        sm: "size-16 [&>svg.main-icon]:size-8",
        default: "size-24 [&>svg.main-icon]:size-12",
        lg: "size-32 [&>svg.main-icon]:size-16",
        xl: "size-40 [&>svg.main-icon]:size-20",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface DecorativeIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof decorativeIconVariants> {
  icon: LucideIcon
}

function DecorativeIcon({
  className,
  variant,
  size,
  icon: Icon,
  ...props
}: DecorativeIconProps) {
  return (
    <div className={cn(decorativeIconVariants({ variant, size }), className)} {...props}>
      {/* Partículas animadas estilo "confetti/sparkle" */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Cruz Superior Izquierda */}
        <svg className="absolute top-[15%] left-[20%] size-2.5 opacity-70 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
        
        {/* Punto Superior */}
        <div className="absolute top-[10%] left-[50%] size-1.5 rounded-full bg-current opacity-60" />
        
        {/* Estrella/Destello Superior Derecha */}
        <svg className="absolute top-[18%] right-[15%] size-3 opacity-80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5z"/>
        </svg>

        {/* Cruz Pequeña Derecha */}
        <svg className="absolute top-[45%] right-[5%] size-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>

        {/* Punto Inferior Izquierdo */}
        <div className="absolute bottom-[25%] left-[10%] size-1.5 rounded-full bg-current opacity-50" />

        {/* Cruz Inferior Derecha */}
        <svg className="absolute bottom-[20%] right-[20%] size-2.5 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </div>

      <Icon className="main-icon relative z-10" />
    </div>
  )
}

export { DecorativeIcon, decorativeIconVariants }
