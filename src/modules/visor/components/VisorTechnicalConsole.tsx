import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Terminal, Copy, TerminalIcon } from "lucide-react";

export interface VisorTechnicalConsoleProps {
  logs?: string[];
  onCopy?: () => void;
}

export function VisorTechnicalConsole({ logs = [], onCopy }: VisorTechnicalConsoleProps) {
  return (
    <Card 
      className="absolute bottom-6 left-6 md:left-[440px] z-30 w-[calc(100%-2rem)] max-w-[500px] shadow-2xl border-border/80 bg-surface-foreground/95 text-muted-foreground font-mono animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-auto"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-surface/50">
        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <TerminalIcon className="size-3.5 text-primary" />
          Consola Técnica
        </div>
        <Button variant="ghost" size="sm" onClick={onCopy} className="h-6 px-2 text-[9px] gap-1.5 hover:bg-surface hover:text-foreground text-muted-foreground">
          <Copy className="size-3" />
          Copiar GeoJSON
        </Button>
      </div>
      
      <div className="p-4 text-[11px] leading-relaxed max-h-48 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2">
            <span className={log.includes("[System]") ? "text-info font-bold" : log.includes("GET") ? "text-success font-bold" : log.includes("LOG:") ? "text-warning font-bold" : ""}>
              {log}
            </span>
          </div>
        ))}
        <div className="flex gap-2 opacity-50 mt-2">
          <span className="text-muted-foreground/60 font-bold">$</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </Card>
  );
}
