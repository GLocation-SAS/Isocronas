import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, HelpCircle } from "lucide-react";

interface VisorHeaderProps {
  onOpenGuide: () => void;
  profile: string;
  onProfileChange: (profile: string) => void;
}

export function VisorHeader({ onOpenGuide, profile, onProfileChange }: VisorHeaderProps) {
  return (
    <Card className="rounded-none border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Map className="size-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">
              Visor Isócrono Bogotá
            </h1>
            <p className="text-sm text-muted-foreground">
              Planificación Inteligente de Tiempo y Territorio
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Tabs value={profile} onValueChange={onProfileChange}>
            <TabsList>
              <TabsTrigger value="ciudadano">Ciudadano</TabsTrigger>
              <TabsTrigger value="profesional">Profesional</TabsTrigger>
              <TabsTrigger value="tecnico">Técnico</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            <div className="flex items-center gap-2">
              <Badge variant="success" appearance="soft" className="gap-1">
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                API Conectada
              </Badge>
              {profile === "ciudadano" && <Badge variant="info" appearance="soft">Simple</Badge>}
              {profile === "profesional" && <Badge variant="warning" appearance="soft">Negocios</Badge>}
              {profile === "tecnico" && <Badge variant="info" appearance="soft">API / SIG</Badge>}
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={onOpenGuide}>
              <HelpCircle className="size-4" />
              ¿Cómo probar?
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
