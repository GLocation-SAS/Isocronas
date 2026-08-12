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
    // Calculamos tiempos y distancias mock simulados
    const timeA = Math.round(travelTime * 1.2);
    const distA = ((timeA * 0.4) + 1.2).toFixed(1);
    
    const timeB = Math.round(travelTime * 0.8);
    const distB = ((timeB * 0.4) + 1.2).toFixed(1);

    const winner = timeA < timeB ? "A" : "B";
    const winnerTime = Math.min(timeA, timeB);
    const loserTime = Math.max(timeA, timeB);
    const diff = loserTime - winnerTime;
    const winnerName = winner === "A" ? origin : (originB || "Origen B");
    const loserName = winner === "A" ? (originB || "Origen B") : origin;

    return (
      <Card variant="featured" className={cn("absolute bottom-6 left-6 md:left-[440px] w-[340px] shadow-2xl z-30 transition-all duration-300 pointer-events-auto", isMinimized && "w-auto")}>
        {!isMinimized ? (
          <>
            <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Minimize2 className="size-4" />
            </button>
            <CardHeader className="pb-2">
               <div className="flex items-center gap-2">
                 <Scale className="size-4 text-primary" />
                 <CardTitle className="text-xs text-foreground font-bold">Resumen de la comparación</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-3">
                {/* Ruta A */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-primary shrink-0" />
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">{origin || "Punto A"}</span>
                    <span className="text-xs text-muted-foreground/50">→</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[80px]">Destino</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-primary">{timeA} min</span>
                    <span className="text-[10px] text-muted-foreground">{distA} km</span>
                  </div>
                </div>

                {/* Ruta B */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-purple-500 shrink-0" />
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">{originB || "Punto B"}</span>
                    <span className="text-xs text-muted-foreground/50">→</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[80px]">Destino</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-purple-500">{timeB} min</span>
                    <span className="text-[10px] text-muted-foreground">{distB} km</span>
                  </div>
                </div>
              </div>

              {/* Mejor Accesibilidad */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex gap-2">
                  <div className="mt-0.5">
                    <span className="text-lg">🏆</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      Mejor accesibilidad: <span className={winner === "A" ? "text-primary" : "text-purple-500"}>{winnerName}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Ahorra {diff} minutos frente a {loserName}.
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Insight IA */}
              <div className="bg-surface rounded-lg p-3 border border-border/60">
                <div className="flex gap-1.5 items-center mb-1">
                  <span className="text-sm">✨</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-foreground">Insight</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  El <strong>{winnerName}</strong> ofrece mejor accesibilidad al destino y reduce el tiempo de viaje en {diff} minutos usando {transportLabel.toLowerCase()}.
                </p>
              </div>

            </CardContent>
          </>
        ) : (
           <div className="px-4 py-3 flex items-center justify-between gap-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <div className="flex items-center gap-2">
                 <Scale className="size-4 text-primary" />
                 <span className="text-sm font-bold">Ganador: {winnerName}</span>
              </div>
              <Maximize2 className="size-3.5 text-muted-foreground" />
           </div>
        )}
      </Card>
    );
  }

}
