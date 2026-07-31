"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  X,
  Info,
  Sliders,
  Grid,
  Code2,
  Copy,
  Check,
  MessageSquare,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DialogVariant = "default" | "success" | "danger" | "warning" | "info";
type DialogSize = "sm" | "default" | "lg" | "xl";

export function DialogShowcase() {
  const [variant, setVariant] = useState<DialogVariant>("success");
  const [size, setSize] = useState<DialogSize>("default");
  const [showSecondButton, setShowSecondButton] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("catalog");

  // State for live modals
  const [openDefault, setOpenDefault] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const generatedCode = `<Dialog>
  <DialogContent variant="${variant}" size="${size}">
    <DialogHeader>
      <DialogTitle>Título del Modal</DialogTitle>
      <DialogDescription>Descripción o mensaje informativo para el usuario.</DialogDescription>
    </DialogHeader>
    <DialogFooter className="flex flex-col gap-2.5">
      <Button variant="${variant}">Confirmar Acción</Button>${
        showSecondButton
          ? `\n      <Button variant="secondary">Cancelar</Button>`
          : ""
      }
    </DialogFooter>
  </DialogContent>
</Dialog>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-border/80 bg-background shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="primary" appearance="soft">
              Componentes de Superposición
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Semantic States & Sizes</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            Modal Dialogs
          </h2>
          <p className="text-sm text-muted-foreground">
            Ventanas modales para interacciones críticas, avisos semánticos (Éxito, Error, Advertencia, Info) y confirmaciones.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex p-1 rounded-2xl bg-surface border border-border w-fit shrink-0">
          <button
            onClick={() => setActiveTab("catalog")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
              activeTab === "catalog"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid className="size-3.5" />
            Estados & Triggers
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
              activeTab === "playground"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sliders className="size-3.5" />
            Playground Interactivo
          </button>
        </div>
      </div>

      {/* CATÁLOGO DE ESTADOS SEMÁNTICOS */}
      {activeTab === "catalog" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Triggers Bar por variante */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Apertura de Modales por Estado Semántico:
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="sm" onClick={() => setOpenDefault(true)}>
                <Shield className="size-3.5 mr-1.5" /> Normal / Default
              </Button>

              <Button variant="success" size="sm" onClick={() => setOpenSuccess(true)}>
                <CheckCircle2 className="size-3.5 mr-1.5" /> Éxito (Success)
              </Button>

              <Button variant="danger" size="sm" onClick={() => setOpenError(true)}>
                <X className="size-3.5 mr-1.5" /> Error (Danger)
              </Button>

              <Button variant="warning" size="sm" onClick={() => setOpenWarning(true)}>
                <AlertTriangle className="size-3.5 mr-1.5" /> Advertencia (Warning)
              </Button>

              <Button variant="info" size="sm" onClick={() => setOpenInfo(true)}>
                <Info className="size-3.5 mr-1.5" /> Información (Info)
              </Button>
            </div>
          </div>

          {/* GRID DE MUESTRAS VISUALES EN TARJETAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Normal / Default */}
            <div className="relative overflow-hidden p-6 rounded-3xl border border-border/80 bg-card space-y-5 shadow-xs flex flex-col items-center text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Shield className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-foreground">Normal / Estándar</h4>
                <p className="text-xs text-muted-foreground">Confirmaciones de sistema y formularios generales.</p>
              </div>
              <Button variant="primary" size="sm" className="w-full rounded-full" onClick={() => setOpenDefault(true)}>
                Probar Modal Estándar
              </Button>
            </div>

            {/* Card 2: Éxito */}
            <div className="relative overflow-hidden p-6 rounded-3xl border border-border/80 bg-card space-y-5 shadow-xs flex flex-col items-center text-center">
              <div className="size-12 rounded-full bg-success/15 flex items-center justify-center text-success">
                <CheckCircle2 className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-foreground">Éxito (Success)</h4>
                <p className="text-xs text-muted-foreground">Confirmación de operaciones y cambios guardados.</p>
              </div>
              <Button variant="success" size="sm" className="w-full rounded-full" onClick={() => setOpenSuccess(true)}>
                Probar Modal Éxito
              </Button>
            </div>

            {/* Card 3: Error */}
            <div className="relative overflow-hidden p-6 rounded-3xl border border-border/80 bg-card space-y-5 shadow-xs flex flex-col items-center text-center">
              <div className="size-12 rounded-full bg-danger/15 flex items-center justify-center text-danger">
                <X className="size-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-foreground">Error (Danger)</h4>
                <p className="text-xs text-muted-foreground">Acceso denegado, fallos críticos o acciones destructivas.</p>
              </div>
              <Button variant="danger" size="sm" className="w-full rounded-full" onClick={() => setOpenError(true)}>
                Probar Modal Error
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PLAYGROUND INTERACTIVO */}
      {activeTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          {/* Canvas Code */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative min-h-[300px] rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={variant} size="lg" className="rounded-full shadow-lg">
                    Abrir Modal Interactivo ({variant})
                  </Button>
                </DialogTrigger>
                <DialogContent variant={variant} size={size}>
                  <DialogHeader>
                    <DialogTitle>Confirmar Operación</DialogTitle>
                    <DialogDescription>
                      ¿Estás seguro de proceder con esta configuración de isócronas?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col gap-2.5 pt-2">
                    <Button variant={variant} className="rounded-full w-full">
                      Proceder
                    </Button>
                    {showSecondButton && (
                      <Button variant="secondary" className="rounded-full w-full">
                        Cancelar
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Code Box */}
            <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <Code2 className="size-4 text-primary shrink-0 ml-1" />
                <code className="text-xs font-mono text-foreground font-semibold truncate">
                  {generatedCode.replace(/\n/g, " ")}
                </code>
              </div>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-all shrink-0"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3.5 text-success" />
                    <span className="text-success font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copiar JSX</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="lg:col-span-5 p-6 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Sliders className="size-4 text-primary" />
              Inspector de Propiedades
            </h3>

            {/* Variante */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Variante Semántica:</label>
              <div className="grid grid-cols-3 gap-2">
                {(["default", "success", "danger", "warning", "info"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border text-center truncate",
                      variant === v
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Tamaño */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Tamaño (Max Width):</label>
              <div className="grid grid-cols-4 gap-2">
                {(["sm", "default", "lg", "xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "px-2 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border text-center truncate",
                      size === s
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Modificadores */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block">Modificadores:</label>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={showSecondButton}
                    onCheckedChange={(c) => setShowSecondButton(!!c)}
                  />
                  <span>Mostrar Segundo Botón (Cancelar)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALES REALES INTERACTIVOS POR ESTADO */}
      {/* 1. Default / Normal */}
      <Dialog open={openDefault} onOpenChange={setOpenDefault}>
        <DialogContent variant="default" size="sm">
          <DialogHeader>
            <div className="size-14 rounded-full bg-background border border-border shadow-md flex items-center justify-center mb-2">
              <Shield className="size-6 text-primary" />
            </div>
            <DialogTitle>Confirmación de Sistema</DialogTitle>
            <DialogDescription>
              ¿Deseas sincronizar los nodos de consulta para el área seleccionada?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 pt-2">
            <Button variant="primary" className="rounded-full w-full" onClick={() => setOpenDefault(false)}>
              Sincronizar Datos
            </Button>
            <Button variant="secondary" className="rounded-full w-full" onClick={() => setOpenDefault(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 2. Success / Éxito */}
      <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
        <DialogContent variant="success" size="sm">
          <DialogHeader>
            <div className="size-14 rounded-full bg-background border border-border shadow-md flex items-center justify-center mb-2">
              <CheckCircle2 className="size-6 text-success" />
            </div>
            <DialogTitle>Operación Exitosa</DialogTitle>
            <DialogDescription>
              Los datos han sido guardados correctamente en el servidor central.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 pt-2">
            <Button variant="success" className="rounded-full w-full" onClick={() => setOpenSuccess(false)}>
              Ir al Dashboard
            </Button>
            <Button variant="secondary" className="rounded-full w-full" onClick={() => setOpenSuccess(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 3. Error / Danger */}
      <Dialog open={openError} onOpenChange={setOpenError}>
        <DialogContent variant="danger" size="sm">
          <DialogHeader>
            <div className="size-14 rounded-full bg-background border border-border shadow-md flex items-center justify-center mb-2">
              <X className="size-6 text-danger" />
            </div>
            <DialogTitle>Acceso Denegado</DialogTitle>
            <DialogDescription>
              No tienes los permisos requeridos para modificar este recurso.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 pt-2">
            <Button variant="danger" className="rounded-full w-full" onClick={() => setOpenError(false)}>
              Reintentar
            </Button>
            <Button variant="secondary" className="rounded-full w-full" onClick={() => setOpenError(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. Warning / Advertencia */}
      <Dialog open={openWarning} onOpenChange={setOpenWarning}>
        <DialogContent variant="warning" size="sm">
          <DialogHeader>
            <div className="size-14 rounded-full bg-background border border-border shadow-md flex items-center justify-center mb-2">
              <AlertTriangle className="size-6 text-warning" />
            </div>
            <DialogTitle>Acción Irreversible</DialogTitle>
            <DialogDescription>
              Estás a punto de eliminar el sector seleccionado. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 pt-2">
            <Button variant="warning" className="rounded-full w-full" onClick={() => setOpenWarning(false)}>
              Confirmar Eliminación
            </Button>
            <Button variant="secondary" className="rounded-full w-full" onClick={() => setOpenWarning(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5. Info / Información */}
      <Dialog open={openInfo} onOpenChange={setOpenInfo}>
        <DialogContent variant="info" size="sm">
          <DialogHeader>
            <div className="size-14 rounded-full bg-background border border-border shadow-md flex items-center justify-center mb-2">
              <Info className="size-6 text-info" />
            </div>
            <DialogTitle>Información del Módulo</DialogTitle>
            <DialogDescription>
              Hay una nueva versión del cálculo de tiempo de isócronas disponible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 pt-2">
            <Button variant="info" className="rounded-full w-full" onClick={() => setOpenInfo(false)}>
              Ver Novedades
            </Button>
            <Button variant="secondary" className="rounded-full w-full" onClick={() => setOpenInfo(false)}>
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
