"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import {
  MessageCircle,
  Info,
  CircleCheckIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

const semanticVariants = [
  { id: "primary", label: "Primary", description: "Acción principal del sistema" },
  { id: "secondary", label: "Secondary", description: "Acción complementaria" },
  { id: "success", label: "Success", description: "Operación completada" },
  { id: "warning", label: "Warning", description: "Atención requerida" },
  { id: "danger", label: "Danger", description: "Acción destructiva" },
  { id: "info", label: "Info", description: "Información adicional" },
] as const

const sides = [
  { id: "top", label: "Top", icon: ArrowUp },
  { id: "bottom", label: "Bottom", icon: ArrowDown },
  { id: "left", label: "Left", icon: ArrowLeft },
  { id: "right", label: "Right", icon: ArrowRight },
] as const

export function TooltipShowcase() {
  return (
    <TooltipProvider delayDuration={100}>
      <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <div className="space-y-2">
          <h2 className="text-h3 font-bold flex items-center gap-2">
            <MessageCircle className="size-5 text-primary" />
            Matriz de Componentes: Tooltip
          </h2>
          <p className="text-sm text-muted-foreground">
            Tooltips contextuales con variantes semánticas y posicionamiento configurable.
          </p>
        </div>

        {/* ─── SEMANTIC VARIANTS ─── */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Variantes Semánticas
          </h3>
          <div className="flex flex-wrap gap-4 items-center">
            {semanticVariants.map((v) => (
              <div key={v.id} className="flex flex-col items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="neutral" size="sm">
                      {v.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant={v.id} side="top" sideOffset={8}>
                    {v.description}
                  </TooltipContent>
                </Tooltip>
                <span className="text-[10px] font-mono text-muted-foreground">
                  variant=&quot;{v.id}&quot;
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SIDE POSITIONS ─── */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Posición (Side)
          </h3>
          <div className="flex flex-wrap gap-8 items-center justify-center py-8">
            {sides.map((s) => {
              const SideIcon = s.icon
              return (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="neutral" size="icon-sm">
                        <SideIcon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      variant="primary"
                      side={s.id}
                      sideOffset={8}
                    >
                      Tooltip {s.label}
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    side=&quot;{s.id}&quot;
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── VARIANTS × SIDES MATRIX ─── */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Matriz: Variante × Posición
          </h3>
          <div className="overflow-x-auto pb-4">
            <div className="min-w-[700px]">
              {/* Header Row */}
              <div className="grid grid-cols-[140px_repeat(4,1fr)] gap-4 items-end mb-6 border-b border-border pb-4">
                <div className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                  Variante
                </div>
                {sides.map((s) => (
                  <div key={s.id} className="text-center space-y-2">
                    <div className="text-xs font-bold text-foreground">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border inline-block font-mono uppercase">
                      {s.id}
                    </div>
                  </div>
                ))}
              </div>

              {/* Content Rows */}
              <div className="space-y-8">
                {semanticVariants.map((v) => (
                  <div
                    key={v.id}
                    className="grid grid-cols-[140px_repeat(4,1fr)] gap-4 items-center"
                  >
                    {/* Variant Label */}
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold capitalize text-foreground">
                        {v.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        variant=&quot;{v.id}&quot;
                      </span>
                    </div>

                    {/* Side Cells */}
                    {sides.map((s) => (
                      <div key={s.id} className="flex justify-center items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="neutral" size="icon-sm">
                              <s.icon className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            variant={v.id}
                            side={s.id}
                            sideOffset={8}
                          >
                            {v.label} · {s.label}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── USE CASES ─── */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Casos de Uso
          </h3>
          <div className="flex flex-wrap gap-6">
            {/* Icon Button with Tooltip */}
            <div className="space-y-2">
              <span className="text-[10px] text-muted-foreground block font-medium">
                Botón con Icono
              </span>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="success" size="icon-sm">
                      <CircleCheckIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant="success" sideOffset={8}>
                    Guardar cambios
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="danger" size="icon-sm">
                      <OctagonXIcon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant="danger" sideOffset={8}>
                    Eliminar registro
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="info" size="icon-sm">
                      <Info className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant="info" sideOffset={8}>
                    Ver detalles
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Inline Text Tooltip */}
            <div className="space-y-2">
              <span className="text-[10px] text-muted-foreground block font-medium">
                Texto Inline
              </span>
              <p className="text-sm text-foreground leading-relaxed max-w-xs">
                La{" "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="underline decoration-primary decoration-dotted underline-offset-4 cursor-help font-medium text-primary">
                      geolocalización
                    </span>
                  </TooltipTrigger>
                  <TooltipContent variant="primary" sideOffset={8}>
                    Tecnología para determinar la posición geográfica de un dispositivo.
                  </TooltipContent>
                </Tooltip>{" "}
                es una capacidad esencial del sistema.
              </p>
            </div>

            {/* Disabled State */}
            <div className="space-y-2">
              <span className="text-[10px] text-muted-foreground block font-medium">
                Estado Deshabilitado
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="inline-flex">
                    <Button variant="neutral" size="sm" disabled>
                      <TriangleAlertIcon className="size-4" />
                      Acción bloqueada
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent variant="warning" sideOffset={8}>
                  No tienes permisos para esta acción.
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* ─── DESIGN NOTES ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-border pt-8">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
              Arquitectura de Tokens
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Los tooltips utilizan la escala semántica de{" "}
              <code className="text-foreground">globals.css</code>. Cada variante mapea a sus tokens
              de fondo (<code className="text-foreground">bg-*</code>) y texto (
              <code className="text-foreground">text-*-foreground</code>) correspondientes.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
              Comportamiento
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Los tooltips soportan 4 posiciones (<code className="text-foreground">top</code>,{" "}
              <code className="text-foreground">bottom</code>,{" "}
              <code className="text-foreground">left</code>,{" "}
              <code className="text-foreground">right</code>) con animaciones de entrada/salida
              automáticas y flecha indicadora sincronizada con la variante de color.
            </p>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}
