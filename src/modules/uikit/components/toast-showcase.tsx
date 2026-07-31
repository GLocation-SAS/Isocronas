"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  BellIcon,
  TimerIcon,
  Loader2Icon
} from "lucide-react"

export function ToastShowcase() {
  const showDefault = () => toast("Proceso en segundo plano", {
    description: "La sincronización se está llevando a cabo.",
    icon: <BellIcon className="size-5 text-primary" />
  })

  const showSuccess = () => toast.success("Operación exitosa", {
    description: "Los datos se han guardado correctamente en el sistema."
  })

  const showInfo = () => toast.info("Información del sistema", {
    description: "Hay una nueva actualización disponible para el módulo de mapas."
  })

  const showWarning = () => toast.warning("Advertencia de seguridad", {
    description: "Tu sesión expirará en 5 minutos por inactividad."
  })

  const showError = () => toast.error("Error de conexión", {
    description: "No se pudo establecer conexión con el servidor. Reintente más tarde."
  })

  const showAction = () => toast("Notificación pendiente", {
    description: "Tienes 3 nuevos mensajes en tu bandeja de entrada.",
    action: {
      label: "Ver ahora",
      onClick: () => console.log("Ver ahora clickeado"),
    },
  })

  const showPromise = () => {
    const promise = new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: "GLocation" }), 2000))

    toast.promise(promise, {
      loading: 'Sincronizando datos...',
      success: (data: { name: string }) => {
        return `Los datos de ${data.name} han sido sincronizados.`;
      },
      error: 'Error al sincronizar datos.',
    });
  }

  const showCustom = () => toast("Mensaje personalizado", {
    description: "Este es un toast con una configuración personalizada de duración.",
    duration: 5000,
  })

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      <div className="flex items-center gap-2 mb-4">
        <BellIcon className="size-5 text-primary" />
        <h2 className="text-h2 font-heading font-bold text-foreground">Toast (Sonner)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-6 rounded-xl border border-border shadow-sm">
        {/* Semantic Variants */}
        <div className="space-y-4 px-20 ">
          <h3 className="text-body-sm font-medium text-muted-foreground uppercase tracking-wider">Variantes Semánticas</h3>
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={showDefault}
            >
              <BellIcon className="size-4" />
              Default Toast
            </Button>
            <Button
              variant="success"
              onClick={showSuccess}
            >
              <CircleCheckIcon className="size-4" />
              Success Toast
            </Button>
            <Button
              variant="info"
              onClick={showInfo}
            >
              <InfoIcon className="size-4" />
              Info Toast
            </Button>
            <Button
              variant="warning"
              onClick={showWarning}
            >
              <TriangleAlertIcon className="size-4" />
              Warning Toast
            </Button>
            <Button
              variant="danger"
              onClick={showError}
            >
              <OctagonXIcon className="size-4" />
              Error Toast
            </Button>
          </div>
        </div>

        {/* Interaction Variants */}
        <div className="space-y-4 px-20">
          <h3 className="text-body-sm font-medium text-muted-foreground uppercase tracking-wider">Interacción</h3>
          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              className="justify-start gap-2"
              onClick={showAction}
            >
              <BellIcon className="size-4" />
              Con Acción
            </Button>
            <Button
              variant="secondary"
              className="justify-start gap-2"
              onClick={showPromise}
            >
              <Loader2Icon className="size-4 animate-spin" />
              Estado Promise
            </Button>
            <Button
              variant="secondary"
              className="justify-start gap-2"
              onClick={showCustom}
            >
              <TimerIcon className="size-4" />
              Duración Larga
            </Button>
          </div>
        </div>
      </div>

      {/* We mount the toaster here so it's available for the showcase buttons */}
      <Toaster />
    </section>
  )
}
