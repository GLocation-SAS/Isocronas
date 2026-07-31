import { Button } from "@/components/ui/button";
import { Plus, Minus, Layers, LocateFixed, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisorMapProps {
  transportMode: string;
  travelTime: number;
  origin: string;
  destination: string;
  activeServices: string[];
  isEmergency?: boolean;
  onLocateClick?: () => void;
}

export function VisorMap({ 
  transportMode, 
  travelTime, 
  origin, 
  destination, 
  activeServices,
  isEmergency,
  onLocateClick
}: VisorMapProps) {
  // Configuración visual según transporte
  const config: Record<string, { color: string, fill: string, stroke: string }> = {
    walk: { color: "text-primary", fill: "fill-primary/15", stroke: "stroke-primary" },
    bike: { color: "text-success", fill: "fill-success/15", stroke: "stroke-success" },
    car: { color: "text-warning", fill: "fill-warning/15", stroke: "stroke-warning" },
    moto: { color: "text-secondary", fill: "fill-secondary/15", stroke: "stroke-secondary" }
  };

  const { color, fill, stroke } = config[transportMode] || config.walk;
  
  // Tamaño del polígono basado en tiempo
  const size = (travelTime / 15) * 450;

  return (
    <div className="absolute inset-0 bg-surface dark:bg-background overflow-hidden">
      {/* Trama de Calles Detallada (Simulación densa) */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="streetGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 20 L100 20 M0 50 L100 50 M0 80 L100 80" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M20 0 L20 100 M50 0 L50 100 M80 0 L80 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <path d="M10 10 L90 90 M90 10 L10 90" stroke="currentColor" strokeWidth="0.2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#streetGrid)" />
          
          {/* Avenidas Principales Simuladas */}
          <path d="M0 150 Q 400 120, 1200 180" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-40" />
          <path d="M300 0 Q 350 500, 280 1000" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-40" />
          <path d="M800 0 L750 1000" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-30" />
          <path d="M0 450 L1200 480" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-30" />
        </svg>
      </div>

      {/* Etiquetas de Avenidas Mock */}
      <div className="absolute top-[130px] left-[10%] text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest -rotate-6">Avenida Calle 80</div>
      <div className="absolute top-[30%] left-[32%] text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest rotate-[85deg]">Avenida Carrera 86</div>
      <div className="absolute bottom-[20%] right-[15%] text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest -rotate-12">Avenida Calle 72</div>

      {/* Zona Isócrona Estrellada (Referencia Imagen) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ease-in-out">
        <div 
          className="relative transition-all duration-1000 ease-in-out"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <svg viewBox="0 0 100 100" className={cn(
            "w-full h-full stroke-[1.5] drop-shadow-xl transition-colors duration-500",
            isEmergency ? "fill-danger/25 stroke-danger" : `${fill} ${stroke}`
          )}>
            {/* Forma estrellada irregular similar a la imagen */}
            <path 
              d="M50 5 L60 35 L95 40 L65 55 L75 90 L50 70 L25 90 L35 55 L5 40 L40 35 Z" 
              className="transition-all duration-1000"
            />
            {/* Nodos/Puntos en los vértices (como en la imagen) */}
            <g className={isEmergency ? "fill-danger" : "fill-current"}>
              <circle cx="50" cy="5" r="1.5" />
              <circle cx="60" cy="35" r="1.5" />
              <circle cx="95" cy="40" r="1.5" />
              <circle cx="65" cy="55" r="1.5" />
              <circle cx="75" cy="90" r="1.5" />
              <circle cx="50" cy="70" r="1.5" />
              <circle cx="25" cy="90" r="1.5" />
              <circle cx="35" cy="55" r="1.5" />
              <circle cx="5" cy="40" r="1.5" />
              <circle cx="40" cy="35" r="1.5" />
            </g>
          </svg>
          
          {/* Marcador Central (Origen) - Estilo Pin Minimalista */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className={cn(
              "p-1.5 rounded-full shadow-lg border-2 border-white transition-colors duration-500",
              isEmergency ? "bg-danger text-white" : `bg-primary text-primary-foreground`
            )}>
              <MapPin className="size-4" />
            </div>
          </div>

          {/* Marcador de Destino (Condicional) */}
          {destination && (
            <div className="absolute -top-12 -right-12 flex flex-col items-center animate-in zoom-in duration-500">
              <div className="bg-info text-info-foreground p-1 rounded-full shadow-lg border-2 border-background">
                <Navigation className="size-4" />
              </div>
              <div className="mt-1 bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap uppercase">
                DESTINO: {destination}
              </div>
              {/* Línea de ruta simulada */}
              <svg className="absolute top-4 right-4 w-24 h-24 pointer-events-none overflow-visible">
                <path 
                  d="M0 0 Q 40 10, 80 80" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                  fill="none" 
                  className="text-info/60"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Servicios Mock (Puntos sobre el mapa) */}
      {activeServices.includes("parks") && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 size-2 bg-success rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-ping" />
          <div className="absolute bottom-1/3 right-1/3 size-2 bg-success rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-ping" />
        </div>
      )}

      {activeServices.includes("tm") && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 size-3 bg-info rounded-sm rotate-45 border border-white shadow-lg animate-bounce" />
          <div className="absolute top-1/4 right-1/2 size-3 bg-info rounded-sm rotate-45 border border-white shadow-lg animate-bounce" />
        </div>
      )}

      {activeServices.includes("density") && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] bg-warning/20 rounded-full blur-3xl animate-pulse" />
        </div>
      )}

      {/* Etiquetas de barrios simuladas */}
      <div className="absolute top-1/4 left-1/3 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter italic">La Candelaria</div>
      <div className="absolute top-2/3 right-1/4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter italic">Santa Fe</div>
      <div className="absolute bottom-1/4 left-1/4 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-tighter italic">Los Mártires</div>

      {/* Herramientas Flotantes del Mapa */}
      <div className="absolute right-6 bottom-32 flex flex-col gap-2">
        <div className="flex flex-col rounded-lg bg-background shadow-xl border border-border overflow-hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none border-b border-border">
            <Plus className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none">
            <Minus className="size-4" />
          </Button>
        </div>
        
        <Button onClick={onLocateClick} variant="secondary" size="icon" className="h-10 w-10 rounded-lg shadow-xl border border-border bg-background hover:bg-accent">
          <LocateFixed className="size-4" />
        </Button>
        
        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-lg shadow-xl border border-border bg-background">
          <Layers className="size-4" />
        </Button>
      </div>
    </div>
  );
}
