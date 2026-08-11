import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Copy, TerminalIcon } from "lucide-react";

export function VisorTechnicalConsole() {
  return (
    <Card 
      className="absolute bottom-6 left-6 md:left-[440px] z-30 w-[calc(100%-2rem)] max-w-[500px] shadow-2xl border-border/80 bg-[#0d0f14]/95 text-neutral-400 font-mono animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-3 text-info" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Terminal API Logs</span>
        </div>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-[9px] gap-1.5 hover:bg-white/10 hover:text-white text-neutral-500">
          <Copy className="size-3" /> Copiar GeoJSON
        </Button>
      </div>
      
      <div className="p-4 text-[11px] leading-relaxed max-h-48 overflow-y-auto">
        <div className="flex gap-2">
          <span className="text-info font-bold">[System]</span>
          <span>Iniciando servicio de grafos espaciales...</span>
        </div>
        <div className="flex gap-2">
          <span className="text-info font-bold">[System]</span>
          <span>Mapa base cargado: <span className="text-neutral-200">CartoDB.Positron [BOG]</span></span>
        </div>
        <div className="flex gap-2 mt-1">
          <span className="text-success font-bold">GET</span>
          <span className="text-neutral-200">/api/v3/isocrona - 200 OK</span>
        </div>
        <div className="pl-4 text-neutral-500 italic">
          Parámetros: r=1200m, v=12, m=walk
        </div>
        <div className="flex gap-2">
          <span className="text-warning font-bold">LOG:</span>
          <span>Latencia: <span className="text-success font-bold">116ms</span> | Consumo: <span className="text-info">24 créditos</span></span>
        </div>
        <div className="flex gap-2 opacity-50">
          <span className="text-neutral-600 font-bold">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </Card>
  );
}
