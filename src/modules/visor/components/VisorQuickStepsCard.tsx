import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Car,
  Globe,
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Building2,
  Home,
  Target,
  Route,
  Scale
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisorQuickStepsCardProps {
  onClose: () => void;
  analysisMode?: "explore" | "route" | "compare";
  hasGenerated?: boolean;
  origin?: string;
  originB?: string;
  destination?: string;
  travelTime?: number;
  transportMode?: string;
  activeServicesCount?: number;
  profile?: string;
}

export function VisorQuickStepsCard({ 
  onClose, 
  analysisMode = "explore",
  hasGenerated = false,
  origin,
  originB,
  destination,
  travelTime = 30,
  transportMode = "car",
  activeServicesCount = 0,
  profile = "ciudadano" 
}: VisorQuickStepsCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance de pasos cada 5 segundos
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 2); // Sólo 2 pasos ahora (Instrucción vs Tip)
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const WatermarkIcon = profile === "profesional" ? Briefcase : profile === "tecnico" ? Building2 : Home;

  // Lógica de Contenido Dinámico
  const getDynamicContent = () => {
    const transportLabel = transportMode === "car" ? "Automóvil" : transportMode === "bike" ? "Bicicleta" : transportMode === "transit" ? "Transporte Público" : "A pie";

    if (analysisMode === "explore") {
      if (!hasGenerated) {
        return {
          header: "Explorar",
          icon: Target,
          question: "¿Hasta dónde puedo llegar desde este punto?",
          mainData: null,
          text: "Selecciona un punto, cómo te mueves y cuánto tiempo tienes.",
          tip: "Tip: Amplía el tiempo para explorar una zona mayor."
        };
      } else {
        return {
          header: "Explorar",
          icon: Target,
          question: "¿Hasta dónde puedo llegar desde este punto?",
          mainData: null,
          text: `La zona coloreada muestra únicamente el área que puedes alcanzar dentro de ${travelTime} min en ${transportLabel}.`,
          context: activeServicesCount > 0 ? `${activeServicesCount} servicios dentro de tu alcance.` : "No encontramos servicios de esta categoría dentro de tu zona actual.",
          tip: "Tip: Amplía el tiempo para explorar una zona mayor."
        };
      }
    }

    if (analysisMode === "route") {
      if (!hasGenerated) {
        return {
          header: "Trayecto",
          icon: Route,
          question: "¿Cuánto me toma llegar de A hasta B?",
          mainData: null,
          text: "Selecciona un origen y un destino para calcular el recorrido.",
          tip: "Tip: Cambia el medio de transporte para comparar cuánto varía el tiempo."
        };
      } else {
        const simulatedDist = ((travelTime * 0.4) + 1.2).toFixed(1);
        return {
          header: "Trayecto",
          icon: Route,
          question: "¿Cuánto me toma llegar de A hasta B?",
          mainData: `${travelTime} min`,
          text: "La línea del mapa representa el recorrido entre el origen y el destino seleccionados.",
          context: `Este trayecto conecta ${origin || "A"} con ${destination || "B"}.`,
          tip: "Tip: Cambia el medio de transporte para comparar cuánto varía el tiempo."
        };
      }
    }

    if (analysisMode === "compare") {
      if (!hasGenerated) {
        return {
          header: "Comparación",
          icon: Scale,
          question: "¿Desde cuál ubicación llego más rápido?",
          mainData: null,
          text: "Selecciona dos ubicaciones y un destino común para comparar su accesibilidad.",
          tip: "Tip: Cambia uno de los puntos para evaluar otra alternativa."
        };
      } else {
        const timeA = travelTime;
        const timeB = Math.max(5, travelTime - 9);
        const diff = Math.abs(timeA - timeB);
        const winner = timeA <= timeB ? (origin || "A") : (originB || "B");

        return {
          header: "Comparación",
          icon: Scale,
          question: "¿Desde cuál ubicación llego más rápido?",
          mainData: `🏆 ${winner} es mejor`,
          text: `Comparamos el tiempo necesario para llegar desde el Punto A y el Punto B hacia un mismo destino.`,
          context: `Ahorras ${diff} minutos frente a la otra opción.`,
          tip: "Tip: Cambia uno de los puntos para evaluar otra alternativa."
        };
      }
    }

    return {
      header: "Guía",
      icon: BookOpen,
      question: "¿Qué hacer?",
      mainData: null,
      text: "Selecciona una opción del panel izquierdo.",
      tip: "Tip: Explora los diferentes modos de análisis."
    };
  };

  const content = getDynamicContent();
  const ModeIcon = content.icon;

  return (
    <div 
      className="fixed bottom-6 right-6 z-40 w-72 sm:w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto font-sans"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Card 
        variant="featured" 
        className="relative p-3.5 sm:p-4 shadow-[0_16px_36px_rgba(0,0,0,0.4)] border border-white/15 bg-card/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/60 rounded-2xl overflow-hidden flex flex-col gap-2.5 text-left"
      >
        <WatermarkIcon className="absolute right-[-14px] bottom-[-14px] size-32 text-muted-foreground/10 pointer-events-none -rotate-12 select-none" />

        <div className="flex items-center justify-between z-10 pb-1.5 border-b border-border/40">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <ModeIcon className="size-3" />
            </div>
            <span className="text-xs font-heading font-extrabold text-foreground tracking-tight">Guía rápida · {content.header}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[0, 1].map((_, idx) => (
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
            <button
              onClick={onClose}
              className="size-5 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>

        <div className="z-10 flex flex-col gap-2 min-h-[90px]">
          <h4 className="text-[13px] font-bold text-foreground leading-tight tracking-tight mt-1">
            {content.question}
          </h4>

          {currentStep === 0 ? (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-2">
              {content.mainData && (
                 <div className="text-2xl font-black text-primary tracking-tighter">
                   {content.mainData}
                 </div>
              )}
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {content.text}
              </p>
              {content.context && (
                <p className="text-[11px] font-medium text-foreground bg-surface/50 p-1.5 rounded-md inline-block">
                  {content.context}
                </p>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300 flex items-start gap-2 bg-primary/10 border border-primary/20 rounded-lg p-2.5 mt-1">
              <span className="text-lg">💡</span>
              <p className="text-[11px] text-primary-foreground font-medium leading-relaxed">
                {content.tip}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between z-10 pt-2 border-t border-border/40 mt-1">
          <button className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
            {analysisMode === "explore" ? "Ver cómo interpretar el área" : analysisMode === "route" ? "Ver detalles del trayecto" : "Ver comparación completa"}
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentStep((prev) => (prev - 1 + 2) % 2)}
              className="size-6 flex items-center justify-center rounded-full bg-surface hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-3" />
            </button>
            <button
              onClick={() => setCurrentStep((prev) => (prev + 1) % 2)}
              className="size-6 flex items-center justify-center rounded-full bg-surface hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
            >
              <ChevronRight className="size-3" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
