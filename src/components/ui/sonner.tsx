"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      offset={80}
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-success" />
        ),
        info: (
          <InfoIcon className="size-5 text-info" />
        ),
        warning: (
          <TriangleAlertIcon className="size-5 text-warning" />
        ),
        error: (
          <OctagonXIcon className="size-5 text-danger" />
        ),
        loading: (
          <Loader2Icon className="size-5 animate-spin text-primary" />
        ),
      }}
      style={
        {
          /* Default toast */
          "--normal-bg": "color-mix(in srgb, var(--primary) 5%, var(--background))",
          "--normal-border": "color-mix(in srgb, var(--primary) 40%, transparent)",
          "--normal-text": "var(--foreground)",

          /* Success */
          "--success-bg": "color-mix(in srgb, var(--success) 10%, var(--background))",
          "--success-border": "color-mix(in srgb, var(--success) 40%, transparent)",
          "--success-text": "var(--foreground)",

          /* Info */
          "--info-bg": "color-mix(in srgb, var(--info) 10%, var(--background))",
          "--info-border": "color-mix(in srgb, var(--info) 40%, transparent)",
          "--info-text": "var(--foreground)",

          /* Warning */
          "--warning-bg": "color-mix(in srgb, var(--warning) 10%, var(--background))",
          "--warning-border": "color-mix(in srgb, var(--warning) 40%, transparent)",
          "--warning-text": "var(--foreground)",

          /* Error */
          "--error-bg": "color-mix(in srgb, var(--danger) 15%, var(--background))",
          "--error-border": "color-mix(in srgb, var(--danger) 40%, transparent)",
          "--error-text": "var(--foreground)",

          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      richColors
      toastOptions={{
        classNames: {
          toast: `
            group toast
            rounded-2xl
            backdrop-blur-xl
            text-foreground
            shadow-[0_8px_30px_rgba(0,0,0,0.12)]
            transition-all duration-300
            !gap-4
            !p-4
            !items-center
          `,

          title: `
            text-sm
            font-semibold
            tracking-tight
          `,

          description: `
            text-sm
            !text-muted-foreground
          `,

          actionButton: `
            rounded-xl
            bg-primary
            text-primary-foreground

            hover:bg-primary/90

            transition-all
          `,

          cancelButton: `
            rounded-xl
            bg-muted/50
            text-foreground

            hover:bg-muted

            transition-all
          `,

          closeButton: `
            hover:bg-muted/50
            transition-all
          `,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }