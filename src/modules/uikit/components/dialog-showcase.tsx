"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertTriangle, X, CheckCircle2, Info } from "lucide-react";
import * as React from "react";

export function DialogShowcase() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);

  return (
    <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden">
      <div className="space-y-2">
        <h2 className="text-h3 font-bold flex items-center gap-2">
          <MessageSquare className="size-5 text-primary" />
          Componentes de Superposición: Dialog
        </h2>
        <p className="text-sm text-muted-foreground">
          Ventanas modales para interacciones críticas, formularios y visualización de datos detallados.
        </p>
      </div>

      <div className="space-y-8">
        {/* CONFIGURACIONES BÁSICAS Y COMPOSICIÓN */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Composición Estándar
          </h3>
          <div className="flex gap-7 items-center">
            {/* Standard Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Dialog con Doble Acción</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Acción</DialogTitle>
                  <DialogDescription>
                    ¿Estás seguro de que deseas proceder con la sincronización de datos? Esta acción consumirá créditos de API.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-2">
                  <p className="text-sm text-center">Se detectaron 45 registros nuevos listos para ser procesados en el nodo central.</p>
                </div>
                <DialogFooter showCloseButton={true}>
                  <Button variant="primary">Sincronizar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Single Action Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Dialog Acción Única</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Notificación de Sistema</DialogTitle>
                  <DialogDescription>
                    El mantenimiento programado comenzará en 15 minutos.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-center">Todos los servicios de geolocalización estarán en modo lectura durante la ventana de mantenimiento.</p>
                </div>
                <DialogFooter showCloseButton={false}>
                  <Button variant="primary">Entendido</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* TAMAÑOS Y DIMENSIONES */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Dimensiones de Terminal
          </h3>
          <div className="flex gap-4 items-center">
            {/* Small */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" size="sm">Pequeño (sm)</Button>
              </DialogTrigger>
              <DialogContent size="sm">
                <DialogHeader>
                  <DialogTitle>Compacto</DialogTitle>
                </DialogHeader>
                <p className="text-sm py-2">Ideal para confirmaciones rápidas o alertas de sistema de baja complejidad.</p>
                <DialogFooter showCloseButton={true}>
                  <Button variant="primary" size="sm">Aceptar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Medium (Default) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Mediano (Default)</Button>
              </DialogTrigger>
              <DialogContent size="default">
                <DialogHeader>
                  <DialogTitle>Estándar</DialogTitle>
                </DialogHeader>
                <p className="text-sm py-2">El tamaño por defecto para la mayoría de las interacciones en el dashboard.</p>
                <DialogFooter showCloseButton={true}>
                  <Button variant="primary">Siguiente</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Extra Large */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary">Extra Grande (xl)</Button>
              </DialogTrigger>
              <DialogContent size="xl">
                <DialogHeader>
                  <DialogTitle>Extra Large</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="h-24 bg-muted/20 border border-border/50 rounded-xl flex items-center justify-center text-xs text-center p-2">Panel Lateral Izquierdo</div>
                  <div className="h-24 bg-muted/20 border border-border/50 rounded-xl flex items-center justify-center text-xs text-center p-2">Panel Central de Datos</div>
                  <div className="h-24 bg-muted/20 border border-border/50 rounded-xl flex items-center justify-center text-xs text-center p-2">Panel Lateral Derecho</div>
                </div>
                <p className="text-sm text-muted-foreground">Este tamaño permite layouts de hasta 3 columnas o formularios complejos manteniendo la estética  .</p>
                <DialogFooter showCloseButton={true}>
                  <Button variant="primary">Procesar Todo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* COMPOSICIÓN SEMÁNTICA */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
              Estados Críticos (Semántica)
            </h3>
          </div>
          <div className="flex gap-4 items-center">
            {/* Success */}
            <Dialog open={openSuccess} onOpenChange={setOpenSuccess}>
              <Button variant="success" onClick={() => setOpenSuccess(true)}>
                <CheckCircle2 className="size-4 mr-2" />
                Éxito
              </Button>
              <DialogContent variant="success">
                <DialogHeader className="items-center text-center">
                  <div className="mb-2 p-4 rounded-3xl border bg-success/5 border-success/20 text-success shadow-xl shadow-success/10 transition-all duration-500">
                    <CheckCircle2 className="size-8 stroke-[1.5px]" />
                  </div>
                  <DialogTitle className="text-center">Operación Completada</DialogTitle>
                  <DialogDescription className="text-center">
                    Los datos han sido sincronizados correctamente con el servidor central de GLocation.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton={false}>
                  <Button variant="success" onClick={() => setOpenSuccess(false)}>Continuar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Error */}
            <Dialog open={openError} onOpenChange={setOpenError}>
              <Button variant="danger" onClick={() => setOpenError(true)}>
                <X className="size-4 mr-2" />
                Error
              </Button>
              <DialogContent variant="danger">
                <DialogHeader className="items-center text-center">
                  <div className="mb-2 p-4 rounded-3xl border bg-danger/5 border-danger/20 text-danger shadow-xl shadow-danger/10 transition-all duration-500">
                    <X className="size-8 stroke-[1.5px]" />
                  </div>
                  <DialogTitle className="text-center">Acceso Denegado</DialogTitle>
                  <DialogDescription className="text-center">
                    No tienes los permisos necesarios para modificar este recurso en el sector actual.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton={true}>
                  <Button variant="danger" onClick={() => setOpenError(false)}>Reintentar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Warning */}
            <Dialog open={openWarning} onOpenChange={setOpenWarning}>
              <Button variant="warning" onClick={() => setOpenWarning(true)}>
                <AlertTriangle className="size-4 mr-2" />
                Advertencia
              </Button>
              <DialogContent variant="warning">
                <DialogHeader className="items-center text-center">
                  <div className="mb-2 p-4 rounded-3xl border bg-warning/5 border-warning/20 text-warning shadow-xl shadow-warning/10 transition-all duration-500">
                    <AlertTriangle className="size-8 stroke-[1.5px]" />
                  </div>
                  <DialogTitle className="text-center">Acción Irreversible</DialogTitle>
                  <DialogDescription className="text-center">
                    Estás a punto de formatear el sector 7G. Esta acción no se puede deshacer.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton={true}>
                  <Button variant="warning" onClick={() => setOpenWarning(false)}>Confirmar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Info */}
            <Dialog open={openInfo} onOpenChange={setOpenInfo}>
              <Button variant="info" onClick={() => setOpenInfo(true)}>
                <Info className="size-4 mr-2" />
                Información
              </Button>
              <DialogContent variant="info">
                <DialogHeader className="items-center text-center">
                  <div className="mb-2 p-4 rounded-3xl border bg-info/5 border-info/20 text-info shadow-xl shadow-info/10 transition-all duration-500">
                    <Info className="size-8 stroke-[1.5px]" />
                  </div>
                  <DialogTitle className="text-center">Análisis de Datos</DialogTitle>
                  <DialogDescription className="text-center">
                    El escaneo de superficie muestra fluctuaciones energéticas inusuales en el sector 7G.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter showCloseButton={false}>
                  <Button variant="info" onClick={() => setOpenInfo(false)}>Ver Detalles</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </div>
        </div>
      </div>

      {/* DESIGN NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-border pt-8">
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Accesibilidad y Foco
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            El componente <code className="text-foreground">Dialog</code> gestiona automáticamente el atrapado del foco (focus trap) y el cierre con la tecla <kbd className="px-1 py-0.5 rounded border border-border bg-muted">Esc</kbd>. Es fundamental incluir siempre un <code className="text-foreground">DialogTitle</code> para lectores de pantalla.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Variantes y Tamaños
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ahora el componente soporta las variantes semánticas <code className="text-foreground">default, success, error, warning, info</code> y tamaños <code className="text-foreground">sm, default, lg</code> mediante props nativas, manteniendo la estética   de forma consistente.
          </p>
        </div>
      </div>
    </section>
  );
}
