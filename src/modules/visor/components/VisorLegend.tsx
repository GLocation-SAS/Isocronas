import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function VisorLegend() {
  return (
    <Card className="absolute bottom-6 left-6 w-64 shadow-2xl border-border/50 bg-background/90 backdrop-blur-md">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Leyenda de Cobertura
        </CardTitle>
      </CardHeader>
      <Separator className="bg-border/50" />
      <CardContent className="py-4 px-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="size-4 rounded border border-primary/40 bg-primary/20 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Zona Isócrona</span>
            <span className="text-[10px] text-muted-foreground">Alcance en 15 minutos</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground shadow-sm">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Origen A</span>
            <span className="text-[10px] text-muted-foreground">Plaza de Bolívar</span>
          </div>
        </div>

        <div className="flex items-center gap-3 opacity-50">
          <div className="flex size-4 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground text-[8px] font-bold text-muted-foreground">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Destino B</span>
            <span className="text-[10px] text-muted-foreground">No seleccionado</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
