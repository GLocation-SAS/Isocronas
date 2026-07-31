import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardTitle, CardDescription, CardBadge, CardDecorativeIcon } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Store, ShieldAlert, Network, Lightbulb } from "lucide-react";

const GUIDE_CASES = [
  {
    title: "Buscar vivienda",
    role: "Ciudadano",
    variant: "info" as const,
    glow: "primary-info" as const,
    description: "Verifica si un apartamento de arriendo queda realmente a menos de 10 min a pie del Portal 80.",
    icon: Home,
  },
  {
    title: "Ubicación de local",
    role: "Profesional",
    variant: "warning" as const,
    glow: "success-warning" as const,
    description: "Mapea la densidad poblacional y los competidores de café alrededor del Parque de la 93 a 15 min.",
    icon: Store,
  },
  {
    title: "Cobertura de emergencias",
    role: "Salud",
    variant: "error" as const,
    glow: "danger-secondary" as const,
    description: "Analiza el alcance de una ambulancia desde la Clínica del Country a 10 minutos en auto en hora pico.",
    icon: ShieldAlert,
  },
  {
    title: "Planeación de redes",
    role: "Urbano",
    variant: "success" as const,
    glow: "success-warning" as const,
    description: "Inspecciona la red de nodos viales y ciclorrutas de la Calle 100 en un rango de 15 minutos en bicicleta.",
    icon: Network,
  },
];

interface VisorQuickGuideProps {
  onClose: () => void;
  onApplyCase: (index: number) => void;
}

export function VisorQuickGuide({ onClose, onApplyCase }: VisorQuickGuideProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent size="xl" variant="info">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <Badge variant="info" appearance="soft" className="gap-1">
              <Lightbulb className="size-3" /> Guía Rápida
            </Badge>
          </div>
          <DialogTitle className="text-3xl font-bold tracking-tight">
            ¿Para qué sirve el Visor Isócrono?
          </DialogTitle>
          <DialogDescription className="text-muted-foreground max-w-2xl mx-auto">
            Esta herramienta mide el tiempo real que tardas en desplazarte, mapeando las calles de Bogotá de manera lógica en lugar de usar radios circulares estáticos.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {GUIDE_CASES.map((item, index) => (
            <Card 
              key={index} 
              variant="featured" 
              glow={item.glow}
              className="min-h-[140px] overflow-hidden cursor-pointer active:scale-[0.98] border-white/5"
              onClick={() => onApplyCase(index)}
            >
              <CardBadge>
                {item.role}
              </CardBadge>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.description}
              </CardDescription>
              <CardDecorativeIcon className="opacity-10 group-hover/card:opacity-20 group-hover/card:scale-125 transition-all">
                <item.icon className="size-24 text-white" />
              </CardDecorativeIcon>
            </Card>
          ))}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-surface px-3 py-1.5 rounded-full border border-border">
            <span className="font-bold text-info italic">TIP:</span>
            Haz clic directo en el mapa para situar tu origen de forma fluida.
          </div>
          <Button variant="primary" className="w-full sm:w-auto px-8" onClick={onClose}>
            Explorar por mi cuenta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface VisorLegendProps {
  origin: string;
  destination: string;
  travelTime: number;
  transportMode: string;
}

export function VisorLegend({ origin, destination, travelTime, transportMode }: VisorLegendProps) {
  const modeColors: Record<string, string> = {
    walk: "bg-primary/20 border-primary/40 text-primary",
    bike: "bg-success/20 border-success/40 text-success",
    car: "bg-warning/20 border-warning/40 text-warning",
    moto: "bg-secondary/20 border-secondary/40 text-secondary"
  };

  const currentColor = modeColors[transportMode] || modeColors.walk;

  return (
    <Card 
      size="sm" 
      glow="primary-info" 
      className="absolute bottom-6 left-6 w-64 shadow-2xl border-border/50 bg-background/90 backdrop-blur-md z-30 animate-in fade-in slide-in-from-left-4 duration-500"
    >
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Leyenda de Cobertura
        </CardTitle>
      </CardHeader>
      <Separator className="bg-border/50" />
      <CardContent className="py-4 px-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className={cn("size-4 rounded border animate-pulse", currentColor.split(' ').slice(0,2).join(' '))} />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Zona Isócrona</span>
            <span className="text-[10px] text-muted-foreground">Alcance en {travelTime} minutos</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Origen A</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">{origin}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={cn(
            "flex size-4 items-center justify-center rounded-full border-2 text-[8px] font-bold transition-all",
            destination ? "bg-info text-info-foreground border-info" : "border-dashed border-muted-foreground text-muted-foreground"
          )}>
            B
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Destino B</span>
            <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
              {destination || "No seleccionado"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
