import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Target } from "lucide-react";

interface VisorLegendProps {
  origin?: string;
  destination?: string;
  travelTime?: number;
  transportMode?: string;
  hasGenerated?: boolean;
  onOpenExport?: () => void;
}

export function VisorLegend({ 
  origin, 
  destination, 
  hasGenerated = false, 
  onOpenExport 
}: VisorLegendProps) {
  if (!hasGenerated) return null;

  const displayOrigin = origin ? origin.replace(" (Reubicado)", "") : "Punto de referencia";
  const displayDest = destination ? destination.replace(" (Destino Reubicado)", "") : null;

  return (
    <Card className="absolute bottom-6 left-6 md:left-[440px] w-56 shadow-2xl border-border/80 bg-card/95 backdrop-blur-xl z-30 transition-all duration-300 pointer-events-auto">
      <CardHeader className="py-2 px-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xs font-bold tracking-tight text-foreground whitespace-nowrap">
          Leyenda de tiempos
        </CardTitle>
      </CardHeader>
      <Separator className="bg-border/50" />
      <CardContent className="py-2.5 px-3 space-y-2">
        {/* Rangos de colores por minutos */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-isochrone-5min shadow-xs shrink-0" />
              <span className="font-semibold text-foreground">0 - 5 min</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Cercano</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-isochrone-15min shadow-xs shrink-0" />
              <span className="font-semibold text-foreground">5 - 15 min</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Medio</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-isochrone-30min shadow-xs shrink-0" />
              <span className="font-semibold text-foreground">15 - 30 min</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Extendido</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-isochrone-maxmin shadow-xs shrink-0" />
              <span className="font-semibold text-foreground">30+ min</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">Límite</span>
          </div>
        </div>

        <Separator className="bg-border/40 mt-2.5 mb-2" />

        {/* Puntos de Referencia dinámicos */}
        <div className="space-y-2 pt-0.5">
          {/* Origen A */}
          <div className="flex items-start gap-2 text-left">
            <Badge variant="primary" appearance="soft" className="size-4.5 rounded-full p-0 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
              A
            </Badge>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                <MapPin className="size-3 text-primary shrink-0" />
                <span>Origen (A)</span>
              </span>
              <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                {displayOrigin}
              </span>
            </div>
          </div>

          {/* Destino B (si aplica) */}
          {displayDest && (
            <div className="flex items-start gap-2 text-left animate-in fade-in duration-200">
              <Badge variant="warning" appearance="soft" className="size-4.5 rounded-full p-0 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                B
              </Badge>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-foreground flex items-center gap-1">
                  <Target className="size-3 text-warning shrink-0" />
                  <span>Destino (B)</span>
                </span>
                <span className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                  {displayDest}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
