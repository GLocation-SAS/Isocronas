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
        success: <CircleCheckIcon />,
        info: <InfoIcon />,
        warning: <TriangleAlertIcon />,
        error: <OctagonXIcon />,
        loading: <Loader2Icon className="animate-spin" />,
      }}
      style={{
        "--border-radius": "1rem",
      } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast: `
            group toast
            rounded-2xl
            backdrop-blur-xl
            text-foreground
            shadow-sm
            !border-transparent
            !border-0
            transition-all duration-300
            !gap-5
            !p-4
            !items-center
            overflow-hidden
            w-full

            /* Background por defecto (aplica a todos, incluyendo normales) */
            !bg-primary-50 dark:!bg-surface

            /* Backgrounds específicos en modo claro, forzando bg-surface en modo oscuro */
            data-[type=success]:!bg-success-50 dark:data-[type=success]:!bg-surface
            data-[type=info]:!bg-info-50 dark:data-[type=info]:!bg-surface
            data-[type=warning]:!bg-warning-50 dark:data-[type=warning]:!bg-surface
            data-[type=error]:!bg-danger-50 dark:data-[type=error]:!bg-surface
          `,

          icon: `
            !flex !size-12 !items-center !justify-center !rounded-[14px] !shrink-0 !m-0

            /* Fondo y color por defecto para el icono */
            !bg-primary-100 dark:!bg-primary-500/20
            !text-primary-600 dark:!text-primary-300

            /* Colores específicos de fondo */
            group-data-[type=success]:!bg-success-100 dark:group-data-[type=success]:!bg-success-500/20
            group-data-[type=info]:!bg-info-100 dark:group-data-[type=info]:!bg-info-500/20
            group-data-[type=warning]:!bg-warning-100 dark:group-data-[type=warning]:!bg-warning-500/20
            group-data-[type=error]:!bg-danger-100 dark:group-data-[type=error]:!bg-danger-500/20

            /* Colores específicos de ícono (brillantes en dark mode) */
            group-data-[type=success]:!text-success-600 dark:group-data-[type=success]:!text-success-300
            group-data-[type=info]:!text-info-600 dark:group-data-[type=info]:!text-info-300
            group-data-[type=warning]:!text-warning-600 dark:group-data-[type=warning]:!text-warning-300
            group-data-[type=error]:!text-danger-600 dark:group-data-[type=error]:!text-danger-300

            /* Forzar tamano del SVG interno */
            [&>svg]:!size-6
          `,

          content: `
            !flex-1
            !w-full
          `,

          title: `
            text-base
            font-semibold
            tracking-tight
            leading-tight
            break-words
            line-clamp-2
            !text-foreground
          `,

          description: `
            text-sm
            font-medium
            leading-snug
            !mt-1.5
            break-words
            line-clamp-3

            /* Color de texto por defecto */
            !text-primary-700 dark:!text-primary-400

            /* Colores de texto específicos (más suaves que el ícono) */
            group-data-[type=success]:!text-success-700 dark:group-data-[type=success]:!text-success-400
            group-data-[type=info]:!text-info-700 dark:group-data-[type=info]:!text-info-400
            group-data-[type=warning]:!text-warning-700 dark:group-data-[type=warning]:!text-warning-400
            group-data-[type=error]:!text-danger-700 dark:group-data-[type=error]:!text-danger-400
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