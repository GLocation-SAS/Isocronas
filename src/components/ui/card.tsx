import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type CardSize = "default" | "sm"
type CardVariant = "default" | "featured"

/**
 * `featured` — Colorful horizontal card with a decorative icon in the corner.
 * Inspired by the course/category card pattern (pastel bg + badge + large icon).
 *
 * `default` — Standard glassmorphism card (existing behavior).
 */
type CardGlow = "none" | "primary-info" | "success-warning" | "danger-secondary"

interface CardProps extends React.ComponentProps<"div"> {
  size?: CardSize
  variant?: CardVariant
  glow?: CardGlow
  innerClassName?: string
  disableHover?: boolean
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ className, innerClassName, size = "default", variant = "default", glow = "none", disableHover = false, children, ...props }: CardProps) {
  const isDefault = variant === "default"

  const glowColors = {
    "primary-info": "var(--color-primary-600), var(--color-info-500)",
    "success-warning": "var(--color-success), var(--color-warning)",
    "danger-secondary": "var(--color-danger), var(--color-secondary)",
    "none": "transparent, transparent"
  }

  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      data-glow={glow}
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300",
        // --- Default variant (Neon border + Dark surface) ---
        isDefault && [
          "border shadow-[0_0_12px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-500",
          !disableHover && "hover:bg-surface/30",
          glow !== "none" && [
            "p-[1px] border-0",
            !disableHover && "hover:animate-[border-spin_4s_linear_infinite]"
          ]
        ],
        // --- Featured variant (soft card with bottom gradient aura glow like reference photo) ---
        variant === "featured" && [
          "bg-card/90 border border-border/80 shadow-md relative overflow-hidden backdrop-blur-xl",
          !disableHover && "hover:shadow-xl hover:-translate-y-1 hover:border-border",
        ],
        className
      )}
      style={isDefault && glow !== "none" ? {
        backgroundImage: `conic-gradient(from var(--border-angle), transparent 20%, ${glowColors[glow]}, transparent 80%)`,
      } as React.CSSProperties : undefined}
      {...props}
    >
      {/* ═══ INNER SURFACE (for gradient border effect) ═══ */}
      {isDefault && glow !== "none" && (
        <div className="absolute inset-[1px] rounded-[inherit] bg-background/95 backdrop-blur-xl z-0" />
      )}

      {/* ═══ FEATURED BOTTOM AMBIENT GLOW (COMO LA FOTO DE REFERENCIA) ═══ */}
      {variant === "featured" && (
        <div 
          className={cn(
            "absolute -bottom-20 left-1/2 -translate-x-1/2 size-72 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-500 group-hover/card:opacity-55 group-hover/card:scale-110",
            glow === "primary-info" && "bg-gradient-to-t from-info via-primary/50 to-transparent",
            glow === "success-warning" && "bg-gradient-to-t from-warning via-success/50 to-transparent",
            glow === "danger-secondary" && "bg-gradient-to-t from-danger via-secondary/50 to-transparent",
            glow === "none" && "bg-gradient-to-t from-warning/40 via-amber-300/20 to-transparent"
          )}
        />
      )}

      {/* Content above blobs */}
      <div className={cn(
        "relative z-10 flex flex-col w-full flex-1",
        // --- Default Layout ---
        isDefault && [
          "items-center text-center gap-4 py-10 px-8",
          "group-data-[size=sm]/card:gap-3 group-data-[size=sm]/card:py-6 group-data-[size=sm]/card:px-4"
        ],
        // --- Featured Layout ---
        variant === "featured" && [
          "items-start text-left gap-4 p-8 min-h-[220px]"
        ],
        innerClassName
      )}>
        {children}
      </div>
    </div>
  )
}

// ─── CardHeader ───────────────────────────────────────────────────────────────

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col items-center gap-4 w-full",
        // When inside featured card, align left
        "group-data-[variant=featured]/card:items-start group-data-[variant=featured]/card:gap-2",
        className
      )}
      {...props}
    />
  )
}

// ─── CardTitle ────────────────────────────────────────────────────────────────

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-lg font-bold tracking-tight text-foreground",
        "group-data-[size=sm]/card:text-base",
        "group-data-[variant=featured]/card:text-xl group-data-[variant=featured]/card:leading-tight group-data-[variant=featured]/card:text-foreground group-data-[variant=featured]/card:font-bold",
        className
      )}
      {...props}
    />
  )
}

// ─── CardDescription ──────────────────────────────────────────────────────────

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm leading-relaxed text-muted-foreground font-medium",
        "group-data-[variant=featured]/card:text-muted-foreground group-data-[variant=featured]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

// ─── CardIcon (centered icon for default variant) ─────────────────────────────

function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        "flex items-center justify-center size-16 rounded-full mb-2",
        "bg-primary/10 border border-primary/20 backdrop-blur-sm",
        "shadow-xs",
        "[&_svg]:size-8 [&_svg]:text-primary",
        className
      )}
      {...props}
    />
  )
}

// ─── CardDecorativeIcon (bottom-right decorative icon for featured variant) ───

/**
 * Renders a large decorative icon anchored to the bottom-right of a `featured` Card.
 * Pass any SVG or Lucide icon as children. Opacity and size are controlled via className.
 *
 * Usage:
 * ```tsx
 * <Card variant="featured" className="bg-primary/10">
 *   <CardBadge>Design</CardBadge>
 *   <CardTitle>Product Design</CardTitle>
 *   <CardDescription>320 lessons</CardDescription>
 *   <CardDecorativeIcon><PenTool className="w-16 h-16" /></CardDecorativeIcon>
 * </Card>
 * ```
 */
function CardDecorativeIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-decorative-icon"
      className={cn(
        // Positioned absolute at bottom-right, clipped by card overflow-hidden
        // Negative margins/offsets to make it look like it's "coming out"
        // Lower z-index to stay behind other content in the same container
        "absolute -bottom-10 -right-10 -z-10 pointer-events-none select-none transition-transform duration-500 group-hover/card:scale-110",
        "opacity-15",
        className
      )}
      {...props}
    />
  )
}

// ─── CardContent ──────────────────────────────────────────────────────────────

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

// ─── CardFooter ───────────────────────────────────────────────────────────────

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center justify-center pt-2",
        "group-data-[variant=featured]/card:justify-start group-data-[variant=featured]/card:pt-1",
        className
      )}
      {...props}
    />
  )
}

// ─── CardBadge ────────────────────────────────────────────────────────────────

function CardBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-badge"
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border",
        "bg-primary/10 text-primary border-primary/20 backdrop-blur-sm",
        "group-data-[variant=featured]/card:bg-primary/15 group-data-[variant=featured]/card:text-primary group-data-[variant=featured]/card:border-primary/30",
        className
      )}
      {...props}
    />
  )
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardIcon,
  CardDecorativeIcon,
  CardBadge,
}