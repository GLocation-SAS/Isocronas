import { Card, CardContent, CardTitle, CardHeader, CardBadge, CardDecorativeIcon } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Route, Scale, Sparkles, MapPin, Minimize2, Maximize2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VisorLegendProps {
  analysisMode?: "explore" | "route" | "compare";
  origin?: string;
  originB?: string;
  destination?: string;
  travelTime?: number;
  transportMode?: string;
  hasGenerated?: boolean;
  isGenerating?: boolean;
  activeServicesCount?: number;
  onOpenExport?: () => void;
}

export function VisorLegend({ 
  analysisMode = "explore",
  origin, 
  originB,
  destination, 
  travelTime = 30,
  transportMode = "car",
  hasGenerated = false, 
  isGenerating = false,
  activeServicesCount = 0,
  onOpenExport 
}: VisorLegendProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  // No mostrar si no se ha generado y no está cargando
  if (!hasGenerated && !isGenerating) return null;

  const transportLabel = transportMode === "car" ? "Automóvil" : transportMode === "bike" ? "Bicicleta" : transportMode === "transit" ? "Transporte Público" : "A pie";

  // Estado de carga Skeleton
  if (isGenerating) {
    return (
      <Card variant="featured" className="absolute bottom-6 left-6 md:left-[440px] w-64 shadow-2xl z-30 transition-all duration-300 pointer-events-auto overflow-hidden animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-4 w-32 bg-muted rounded"></div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-24 bg-muted rounded"></div>
          <div className="h-3 w-40 bg-muted rounded"></div>
          <div className="h-3 w-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  // Explorar
  if (analysisMode === "explore") {
    return (
      <Card variant="featured" className={cn("absolute bottom-6 left-6 md:left-[440px] w-72 shadow-2xl z-30 transition-all duration-300 pointer-events-auto", isMinimized && "w-auto")}>
        {!isMinimized ? (
          <>
            <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Minimize2 className="size-4" />
            </button>
            <CardHeader className="pb-1">
              <CardTitle className="text-xs text-muted-foreground">Área de alcance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-black text-foreground tracking-tighter">
                {travelTime} <span className="text-xl font-bold text-muted-foreground">min</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold">{transportLabel}</div>
                <div className="text-xs text-muted-foreground">{origin || "Punto seleccionado"}</div>
              </div>
              
              
              <div className="pt-2 border-t border-border/50">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  Incluye también los rangos menores para facilitar la lectura del alcance.
                </p>
                {activeServicesCount > 0 && (
                  <p className="text-xs text-foreground mt-2"><strong>Servicios dentro de tu alcance:</strong> {activeServicesCount} categorías encontradas.</p>
                )}
</div>
            </CardContent>
          </>
        ) : (
           <div className="px-4 py-3 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="flex items-center gap-2">
                 <Target className="size-4 text-primary" />
                 <span className="text-sm font-bold">{travelTime} min</span>
              </div>
              <Maximize2 className="size-3.5 text-muted-foreground" />
           </div>
        )}
      </Card>
    );
  }

  // Route
  if (analysisMode === "route") {
    // Calculamos tiempo mock si no lo hay. Asumamos que travelTime es el tiempo estimado simulado
    const simulatedDist = ((travelTime * 0.4) + 1.2).toFixed(1);
    
    return (
      <Card variant="featured" className={cn("absolute bottom-6 left-6 md:left-[440px] w-80 shadow-2xl z-30 transition-all duration-300 pointer-events-auto", isMinimized && "w-auto")}>
        {!isMinimized ? (
          <>
            <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Minimize2 className="size-4" />
            </button>
            <CardHeader className="pb-2">
               <div className="flex items-center gap-2">
                 <Route className="size-4 text-primary" />
                 <CardTitle className="text-xs text-foreground font-bold">Resumen del trayecto</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 divide-x divide-border/50">
                <div>
                   <div className="text-2xl font-black text-foreground tracking-tighter">
                     {travelTime} <span className="text-sm font-bold text-muted-foreground">min</span>
                   </div>
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Tiempo estimado</div>
                </div>
                <div className="pl-4">
                   <div className="text-2xl font-black text-foreground tracking-tighter">
                     {simulatedDist} <span className="text-sm font-bold text-muted-foreground">km</span>
                   </div>
                   <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mt-1">Distancia estimada</div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/50 bg-surface/30 -mx-4 px-4 pb-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                  <Badge variant="primary" appearance="soft" className="px-1.5 py-0">A</Badge>
                  <span className="truncate max-w-[100px]">{origin || "Origen"}</span>
                  <span className="text-primary">→</span>
                  <Badge variant="success" appearance="soft" className="px-1.5 py-0">B</Badge>
                  <span className="truncate max-w-[100px]">{destination || "Destino"}</span>
                </div>
                <div className="text-[10px] text-muted-foreground/70">{transportLabel}</div>
              </div>
            </CardContent>
          </>
        ) : (
           <div className="px-4 py-3 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="flex items-center gap-2">
                 <Route className="size-4 text-primary" />
                 <span className="text-sm font-bold">{travelTime} min</span>
              </div>
              <Maximize2 className="size-3.5 text-muted-foreground" />
           </div>
        )}
      </Card>
    );
  }

  // Compare
  if (analysisMode === "compare") {
    // Simulamos un ganador. Si travelTime > 15, B gana. Si no, A gana.
    const timeA = travelTime;
    const timeB = Math.max(5, travelTime - 9); // mock diff
    const diff = Math.abs(timeA - timeB);
    const winner = timeA <= timeB ? "Punto A" : "Punto B";
    const winnerName = timeA <= timeB ? (origin || "Punto A") : (originB || "Punto B");

    return (
      <Card variant="featured" className={cn("absolute bottom-6 left-6 md:left-[440px] w-80 shadow-2xl z-30 transition-all duration-300 pointer-events-auto", isMinimized && "w-auto")}>
        {!isMinimized ? (
          <>
            <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Minimize2 className="size-4" />
            </button>
            <CardHeader className="pb-3 border-b border-border/50 mb-3">
               <div className="flex items-center gap-2">
                 <Scale className="size-4 text-warning" />
                 <CardTitle className="text-xs text-foreground font-bold">Resumen de la comparación</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="size-2.5 rounded-full bg-primary shadow-xs shrink-0" />
                       <span className="text-xs font-bold text-muted-foreground">Punto A → Destino</span>
                    </div>
                    <span className="text-sm font-black text-foreground">{timeA} min</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="size-2.5 rounded-full bg-secondary shadow-xs shrink-0" />
                       <span className="text-xs font-bold text-muted-foreground">Punto B → Destino</span>
                    </div>
                    <span className="text-sm font-black text-foreground">{timeB} min</span>
                 </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-xl p-3 flex flex-col gap-1">
                 <span className="text-[10px] text-success font-bold uppercase tracking-wider">Mejor accesibilidad</span>
                 <span className="text-sm font-black text-success truncate">{winnerName}</span>
                 <span className="text-xs text-success/80">{diff} min más rápido</span>
              </div>

              <div className="pt-3 border-t border-border/50 text-xs">
                 <div className="flex items-start gap-2 text-muted-foreground">
                    <Sparkles className="size-3.5 text-info shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong>Insight:</strong> El {winner} ofrece mejor accesibilidad al destino, reduciendo el tiempo de viaje significativamente.
                    </p>
                 </div>
              </div>
            </CardContent>
          </>
        ) : (
           <div className="px-4 py-3 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="flex items-center gap-2">
                 <Scale className="size-4 text-warning" />
                 <span className="text-sm font-bold">Ganador: {winner}</span>
              </div>
              <Maximize2 className="size-3.5 text-muted-foreground" />
           </div>
        )}
      </Card>
    );
  }

  return null;
}
