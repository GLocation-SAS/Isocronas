import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Store,
  Hospital,
  Building2,
  MapPin,
  Car,
  Globe,
  Lightbulb,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Casos de uso ──────────────────────────────────────────────────────────── */

const USE_CASES = [
  {
    titleLine1: "Buscar",
    titleLine2: "vivienda",
    role: "Ciudadano",
    description:
      "Evalúa si una vivienda o barrio queda cerca de tu trabajo, estudio o tus lugares más frecuentes.",
    icon: Home,
    bgClass: "bg-success/10 border-success/20 text-success",
    iconBgClass: "bg-success/20 text-success",
    badgeVariant: "success" as const,
  },
  {
    titleLine1: "Evaluar",
    titleLine2: "un negocio",
    role: "Negocio",
    description:
      "Analiza qué tan accesible resulta una ubicación comercial para tus clientes o colaboradores.",
    icon: Store,
    bgClass: "bg-secondary/10 border-secondary/20 text-secondary",
    iconBgClass: "bg-secondary/20 text-secondary",
    badgeVariant: "secondary" as const,
  },
  {
    titleLine1: "Cobertura",
    titleLine2: "de servicios",
    role: "Servicios",
    description:
      "Identifica zonas con acceso a hospitales, colegios, parques y equipamientos urbanos clave cerca de ti.",
    icon: Hospital,
    bgClass: "bg-info/10 border-info/20 text-info",
    iconBgClass: "bg-info/20 text-info",
    badgeVariant: "info" as const,
  },
  {
    titleLine1: "Planeación",
    titleLine2: "urbana",
    role: "Territorio",
    description:
      "Apoya decisiones de movilidad e infraestructura con análisis de accesibilidad urbana.",
    icon: Building2,
    bgClass: "bg-warning/10 border-warning/20 text-warning",
    iconBgClass: "bg-warning/20 text-warning",
    badgeVariant: "warning" as const,
  },
];

/* ─── Pasos de "¿Cómo funciona?" (3 Pasos) ─────────────────────────────────── */

const STEPS = [
  {
    number: 1,
    title: "Selecciona una ubicación",
    description: "Puedes buscar una dirección, seleccionar en el mapa o activar tu ubicación en tiempo real.",
    icon: MapPin,
  },
  {
    number: 2,
    title: "Elige transporte y tiempo",
    description: "Configura el medio de desplazamiento y los minutos de viaje.",
    icon: Car,
  },
  {
    number: 3,
    title: "Explora y analiza el resultado",
    description: "Visualiza en el mapa las zonas a las que puedes llegar.",
    icon: Globe,
  },
];

interface VisorQuickGuideProps {
  onClose: () => void;
  onApplyCase?: (index: number) => void;
}

export function VisorQuickGuide({ onClose }: VisorQuickGuideProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeRing, setActiveRing] = useState(0);

  // Animación suave secuencial: 5 min (0) -> 15 min (1) -> 30 min (2)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveRing((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep(activeStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        size="3xl"
        className="h-auto flex flex-col justify-between overflow-y-auto max-h-[95dvh]"
      >
        {/* ═══ BARRA DE PASOS EN LA PARTE SUPERIOR ═══ */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-2 pr-8">
          {/* Título de la modal a la izquierda */}
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="size-3.5" />
            </div>
            <span className="text-xs font-heading font-bold text-foreground tracking-tight">Guía de inicio</span>
          </div>

          {/* Indicador de pasos a la derecha */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((stepIdx) => (
                <button
                  key={stepIdx}
                  onClick={() => setActiveStep(stepIdx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    activeStep === stepIdx
                      ? "w-8 bg-primary"
                      : activeStep > stepIdx
                        ? "w-4 bg-primary/40"
                        : "w-4 bg-muted"
                  )}
                  aria-label={`Paso ${stepIdx + 1}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              Paso {activeStep + 1} de 3
            </span>
          </div>
        </div>

        {/* ═══ PASO 1: BIENVENIDO A ISÓCRONAS ═══ */}
        {activeStep === 0 && (
          <div className="flex-1 flex flex-col justify-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <DialogHeader className="flex-col sm:flex-row gap-6 text-left items-center justify-center py-4">
              {/* Ilustración de Isócronas concéntrica limpia */}
              <div className="shrink-0 flex items-center justify-center size-36 sm:size-52 rounded-full bg-surface border border-border shadow-xl relative p-4">
                <div className="relative size-32 sm:size-44 flex items-center justify-center">
                  {/* Capa 3 Anillo exterior - 30 min (Naranja) */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full border-2 border-[var(--isochrone-30min)] transition-all duration-700 flex items-start justify-center pt-0.5",
                      activeRing === 2
                        ? "bg-[var(--isochrone-30min)]/20 shadow-[0_0_20px_rgba(242,143,59,0.4)] border-opacity-100"
                        : "bg-[var(--isochrone-30min)]/5 border-opacity-60"
                    )}
                  >
                    <span
                      className={cn(
                        "bg-card border font-mono font-bold text-[9px] px-2 py-0.5 rounded-full shadow-md -translate-y-3 transition-all duration-500",
                        activeRing === 2
                          ? "border-[var(--isochrone-30min)] text-[var(--isochrone-30min)] scale-110 shadow-[0_0_10px_rgba(242,143,59,0.5)]"
                          : "border-border/80 text-muted-foreground"
                      )}
                    >
                      30 min
                    </span>
                  </div>

                  {/* Capa 2 Anillo medio - 15 min (Amarillo) */}
                  <div
                    className={cn(
                      "absolute inset-6 rounded-full border-2 border-[var(--isochrone-15min)] transition-all duration-700 flex items-start justify-center pt-0.5",
                      activeRing === 1
                        ? "bg-[var(--isochrone-15min)]/25 shadow-[0_0_20px_rgba(242,193,78,0.4)] border-opacity-100"
                        : "bg-[var(--isochrone-15min)]/10 border-opacity-70"
                    )}
                  >
                    <span
                      className={cn(
                        "bg-card border font-mono font-bold text-[9px] px-2 py-0.5 rounded-full shadow-md -translate-y-3 transition-all duration-500",
                        activeRing === 1
                          ? "border-[var(--isochrone-15min)] text-[var(--isochrone-15min)] scale-110 shadow-[0_0_10px_rgba(242,193,78,0.5)]"
                          : "border-border/80 text-muted-foreground"
                      )}
                    >
                      15 min
                    </span>
                  </div>

                  {/* Capa 1 Anillo interior - 5 min (Verde) */}
                  <div
                    className={cn(
                      "absolute inset-12 rounded-full border-2 border-[var(--isochrone-5min)] transition-all duration-700 flex items-start justify-center pt-0.5",
                      activeRing === 0
                        ? "bg-[var(--isochrone-5min)]/30 shadow-[0_0_20px_rgba(42,157,143,0.5)] border-opacity-100"
                        : "bg-[var(--isochrone-5min)]/15 border-opacity-80"
                    )}
                  >
                    <span
                      className={cn(
                        "bg-card border font-mono font-bold text-[9px] px-2 py-0.5 rounded-full shadow-md -translate-y-3 transition-all duration-500",
                        activeRing === 0
                          ? "border-[var(--isochrone-5min)] text-[var(--isochrone-5min)] scale-110 shadow-[0_0_10px_rgba(42,157,143,0.5)]"
                          : "border-border/80 text-muted-foreground"
                      )}
                    >
                      5 min
                    </span>
                  </div>

                  {/* Núcleo Central */}
                  <div className="relative z-20 flex items-center justify-center size-16 rounded-full bg-primary text-white border-2 border-background shadow-2xl ring-8 ring-primary/30">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-8 text-white drop-shadow-lg"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="white" />
                      <circle cx="12" cy="10" r="3" className="fill-primary" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Textos del encabezado */}
              <div className="flex flex-col gap-3 flex-1 min-w-0 text-center sm:text-left">
                <Badge variant="neutral" appearance="default" className="w-fit mx-auto sm:mx-0 text-[10px] uppercase tracking-widest font-bold">
                  BIENVENIDO A ISÓCRONAS
                </Badge>
                <DialogTitle className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight text-balance">
                  Explora tu alcance
                  <br />
                  por tiempo de viaje
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm leading-relaxed max-w-lg text-pretty">
                  Descubre en el mapa hasta dónde puedes llegar desde una ubicación según tu tiempo de viaje y medio de transporte.
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>
        )}

        {/* ═══ PASO 2: CASOS DE USO ═══ */}
        {activeStep === 1 && (
          <div className="flex-1 flex flex-col justify-center space-y-4 animate-in fade-in zoom-in-95 duration-300 py-1">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                ¿Para qué puedes usar Isócronas?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Conoce algunos usos comunes de Isócronas. También puedes explorar el visor libremente y descubrir nuevos análisis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 items-stretch">
              {USE_CASES.map((item, index) => (
                <Card
                  key={index}
                  variant="featured"
                  innerClassName="flex-none h-auto min-h-0 flex flex-col items-start justify-start gap-4 p-4 sm:p-6 md:p-7"
                  className={cn(
                    "p-0 flex flex-col justify-start gap-0 border border-transparent transition-all h-full group text-left shadow-xs relative overflow-hidden",
                    index === 0 && "bg-gradient-to-br from-success/10 via-card to-card hover:bg-success/15 hover:border-transparent",
                    index === 1 && "bg-gradient-to-br from-primary/10 via-card to-card hover:bg-primary/15 hover:border-transparent",
                    index === 2 && "bg-gradient-to-br from-info/10 via-card to-card hover:bg-info/15 hover:border-transparent",
                    index === 3 && "bg-gradient-to-br from-warning/10 via-card to-card hover:bg-warning/15 hover:border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0 w-full">
                    <div className={cn(
                      "size-9 rounded-full flex items-center justify-center shrink-0 shadow-xs",
                      index === 0 && "text-success bg-success/15",
                      index === 1 && "text-primary bg-primary/15",
                      index === 2 && "text-info bg-info/15",
                      index === 3 && "text-warning bg-warning/15"
                    )}>
                      <item.icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="!text-[18px] font-heading font-bold leading-snug text-foreground h-auto min-h-0 tracking-tight">
                      {item.titleLine1} {item.titleLine2}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-[10px] leading-relaxed text-muted-foreground text-left line-clamp-3 text-balance h-auto min-h-0">
                    {item.description}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ═══ PASO 3: ¿CÓMO FUNCIONA? ═══ */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300 py-1">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
                ¿Cómo usar Isócronas?
              </h3>
              <p className="text-xs text-muted-foreground">
                Sigue estos 3 pasos para generar tu mapa de accesibilidad:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 items-stretch">
              {STEPS.map((step, index) => (
                <Card
                  key={step.number}
                  variant="featured"
                  innerClassName="flex-none h-auto min-h-0 flex flex-col items-start justify-start gap-4 p-4 sm:p-6 md:p-7"
                  className={cn(
                    "p-0 flex flex-col justify-start gap-0 border border-transparent transition-all group text-left shadow-xs relative overflow-hidden",
                    index === 0 && "bg-gradient-to-b from-primary/5 via-card to-card hover:bg-primary/10 hover:border-transparent",
                    index === 1 && "bg-gradient-to-br from-info/5 via-card to-card hover:bg-info/10 hover:border-transparent",
                    index === 2 && "bg-gradient-to-br from-success/5 via-card to-card hover:bg-success/10 hover:border-transparent"
                  )}
                >
                  <div className="relative size-10 shrink-0">
                    <div className={cn(
                      "w-full h-full rounded-full flex items-center justify-center shadow-xs",
                      index === 0 && "text-primary bg-primary/10",
                      index === 1 && "text-info bg-info/10",
                      index === 2 && "text-success bg-success/10"
                    )}>
                      <step.icon className="size-4.5" />
                    </div>
                    <span className={cn(
                      "absolute -top-1 -right-1 size-5 rounded-full font-bold text-[9px] flex items-center justify-center shadow-md text-white border border-background",
                      index === 0 && "bg-primary",
                      index === 1 && "bg-info",
                      index === 2 && "bg-success"
                    )}>
                      {step.number}
                    </span>
                  </div>

                  <div className="space-y-1 h-auto min-h-0 flex flex-col items-start justify-start gap-1">
                    <CardTitle className="!text-[18px] font-heading font-bold leading-tight text-foreground h-auto min-h-0 tracking-tight flex items-start">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-[10px] text-muted-foreground leading-relaxed text-left line-clamp-3 text-balance h-auto min-h-0">
                      {step.description}
                    </CardDescription>
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex items-center gap-3 text-left mt-3 shadow-xs">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Lightbulb className="size-4" />
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                <span className="font-bold text-primary">Tip:</span> Puedes cambiar la ubicación, el transporte o el tiempo para comparar diferentes resultados.
              </p>
            </div>
          </div>
        )}

        {/* ═══ FOOTER DE NAVEGACIÓN ═══ */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-border/60 mt-4 w-full relative z-30">
          {activeStep > 0 && (
            <Button
              variant="secondary"
              size="lg"
              className="gap-2 rounded-full w-full sm:w-[236px] justify-center shrink-0"
              onClick={handlePrev}
            >
              <ChevronLeft className="size-4" />
              Anterior
            </Button>
          )}

          <Button
            variant="primary"
            size="lg"
            className="gap-2 rounded-full px-8 flex-1 justify-center font-bold shadow-md"
            onClick={handleNext}
          >
            {activeStep === 2 ? (
              <>
                Comenzar análisis
                <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                Continuar
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
