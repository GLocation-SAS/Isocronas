import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  MapPin,
  Car,
  Globe,
  Lightbulb,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisorQuickStepsCardProps {
  onClose: () => void;
  profile?: string;
}

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
    title: "Explora el resultado",
    description: "Visualiza en el mapa las zonas a las que puedes llegar.",
    icon: Globe,
  },
];

export function VisorQuickStepsCard({ onClose, profile = "ciudadano" }: VisorQuickStepsCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance de pasos cada 4.5 segundos ("se vaya pasando solita")
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeStepObj = STEPS[currentStep];
  const StepIcon = activeStepObj.icon;
  const WatermarkIcon = profile === "profesional" ? Briefcase : profile === "tecnico" ? Building2 : Home;

  return (
    <div 
      className="fixed bottom-6 right-6 z-40 w-72 sm:w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Glassmorphism Card con backdrop blur y bordes traslúcidos */}
      <Card 
        variant="featured" 
        className="relative p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.4)] border border-white/15 bg-card/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/60 rounded-2xl overflow-hidden flex flex-col gap-2.5 text-left"
      >
        {/* Marca de agua traslúcida en la esquina inferior derecha */}
        <WatermarkIcon className="absolute right-[-14px] bottom-[-14px] size-32 text-muted-foreground/10 pointer-events-none -rotate-12 select-none" />

        {/* Encabezado: Título + Wizard Dots + Botón X */}
        <div className="flex items-center justify-between z-10 pb-1.5 border-b border-border/40">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="size-3" />
            </div>
            <span className="text-xs font-heading font-extrabold text-foreground tracking-tight">Guía rápida</span>
          </div>

          {/* Indicadores de pasos (Wizard Dots) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 cursor-pointer",
                    currentStep === idx
                      ? "w-5 bg-primary"
                      : "w-1.5 bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Ir al paso ${idx + 1}`}
                />
              ))}
            </div>

            <span className="text-[9.5px] font-mono font-bold text-muted-foreground">
              {currentStep + 1}/3
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="size-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0 ml-0.5"
              aria-label="Cerrar guía rápida"
            >
              <X className="size-3" />
            </Button>
          </div>
        </div>

        {/* Tarjeta del paso activo con efecto de vidrio */}
        <div key={currentStep} className="z-10 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-surface/40 backdrop-blur-md border border-white/10 hover:bg-surface/60 transition-all duration-200 group">
            {/* Círculo numérico */}
            <div className="size-8 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center font-bold text-xs shrink-0 shadow-xs group-hover:scale-110 transition-transform mt-0.5">
              {activeStepObj.number}
            </div>

            {/* Icono + Título + Descripción */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                <StepIcon className="size-3.5 text-primary shrink-0" />
                <span className="truncate">{activeStepObj.title}</span>
              </div>
              <p className="text-[10.5px] text-muted-foreground leading-relaxed mt-0.5 text-pretty">
                {activeStepObj.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Tip bar + Botones de navegación */}
        <div className="flex items-center justify-between gap-2 z-10 pt-0.5">
          <div className="flex items-center gap-1.5 text-[9.5px] text-muted-foreground flex-1 min-w-0">
            <Lightbulb className="size-3 text-primary shrink-0" />
            <span className="truncate">
              <strong className="text-primary font-bold">Tip:</strong> Comparación en tiempo real.
            </span>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))}
              className="size-5 rounded-full hover:bg-muted"
              title="Paso anterior"
            >
              <ChevronLeft className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setCurrentStep((prev) => (prev + 1) % STEPS.length)}
              className="size-5 rounded-full hover:bg-muted"
              title="Siguiente paso"
            >
              <ChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
