import { Card, CardContent, CardTitle, CardIcon } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Store, Target } from "lucide-react";

export function VisorBusinessMetrics({ isGenerating }: { isGenerating?: boolean }) {
  return (
    <Card 
      variant="featured" 
      glow="success-warning" 
      className="absolute top-6 right-20 w-72 shadow-2xl border-success/20 bg-background/95 backdrop-blur-xl z-20 animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="success" appearance="soft" className="text-[10px]">MODO PRO</Badge>
          <div className="flex size-8 items-center justify-center rounded-lg bg-success/10 text-success">
            <TrendingUp className="size-4" />
          </div>
        </div>
        
        <div>
          <CardTitle className="text-lg font-bold">Análisis Comercial</CardTitle>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Impacto en el Territorio</p>
        </div>

        <Separator className="bg-border/30" />

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="size-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">14,350</span>
              <span className="text-[9px] text-muted-foreground uppercase">Población cubierta aprox.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-info/10 flex items-center justify-center">
              <Store className="size-4 text-info" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">42</span>
              <span className="text-[9px] text-muted-foreground uppercase">Comercios cerca</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-warning/10 flex items-center justify-center">
              <Target className="size-4 text-warning" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">8 Marcas</span>
              <span className="text-[9px] text-muted-foreground uppercase">Competencia directa</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Separator({ className }: { className?: string }) {
  return <div className={`h-[1px] w-full ${className}`} />;
}
