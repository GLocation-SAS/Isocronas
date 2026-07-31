"use client";

import { Card, CardContent, CardTitle, CardBadge, CardIcon } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Navigation, 
  Bike, 
  Car, 
  BikeIcon as Motorbike, 
  Footprints, 
  RotateCcw, 
  Activity, 
  ChevronRight,
  Plus,
  LocateFixed,
  Info,
  HelpCircle,
  PanelLeft,
  Clock,
  Loader2,
  Target
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VisorSidebarProps {
  profile: string;
  transportMode: string;
  onTransportChange: (mode: string) => void;
  travelTime: number;
  onTimeChange: (time: number) => void;
  origin: string;
  onOriginChange: (val: string) => void;
  destination: string;
  onDestinationChange: (val: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  lastQueryTime: number | null;
  activeServices: string[];
  onServicesChange: (services: string[]) => void;
}

export function VisorSidebar({
  profile,
  transportMode,
  onTransportChange,
  travelTime,
  onTimeChange,
  origin,
  onOriginChange,
  destination,
  onDestinationChange,
  onGenerate,
  onReset,
  isGenerating,
  lastQueryTime,
  activeServices,
  onServicesChange
}: VisorSidebarProps) {
  const transportModes = [
    { id: "walk", label: "A pie", icon: Footprints, speed: "4.5 km/h", desc: "Mapea la conectividad peatonal." },
    { id: "bike", label: "Bicicleta", icon: Bike, speed: "15 km/h", desc: "Optimizado para ciclorrutas de Bogotá." },
    { id: "car", label: "Auto", icon: Car, speed: "25 km/h", desc: "Ajustado a tráfico histórico promedio." },
    { id: "moto", label: "Moto", icon: Motorbike, speed: "30 km/h", desc: "Estándar logístico para delivery veloz." },
  ];

  const toggleService = (service: string) => {
    if (activeServices.includes(service)) {
      onServicesChange(activeServices.filter(s => s !== service));
    } else {
      onServicesChange([...activeServices, service]);
    }
  };

  const welcomeContent = {
    ciudadano: {
      badge: "MODO CIUDADANO",
      title: "La ciudad de los 15 minutos",
      desc: "Descubre a qué distancia temporal real tienes farmacias, paraderos, parques y colegios caminando desde tu hogar."
    },
    profesional: {
      badge: "MODO PROFESIONAL",
      title: "Expansión Inteligente",
      desc: "Mide tu zona de cobertura garantizada para delivery o analiza cuántos clientes potenciales habitan tu isócrona comercial."
    },
    tecnico: {
      badge: "MODO TÉCNICO",
      title: "Consola de Datos GIS",
      desc: "Configura la resolución matemática de la isócrona, revisa la latencia de procesamiento de la API y exporta a GeoJSON."
    }
  }[profile] || welcomeContent.ciudadano;

  return (
    <aside className="flex flex-col h-full max-h-full overflow-y-auto rounded-2xl border border-border/80 bg-background/90 backdrop-blur-xl shadow-2xl transition-all duration-300">
      <div className="p-6 space-y-6">
        <Card 
          variant="featured" 
          glow={profile === 'tecnico' ? 'danger-secondary' : profile === 'profesional' ? 'success-warning' : 'primary-info'} 
          className="border-white/5"
        >
          <CardBadge>
            {welcomeContent.badge}
          </CardBadge>
          <CardHeader className="p-0">
            <CardTitle>{welcomeContent.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {welcomeContent.desc}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between items-center">
              1. ¿Dónde estás? (Origen A)
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] gap-1 text-primary" onClick={onReset}>
                <RotateCcw className="size-3" /> Reiniciar
              </Button>
            </label>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-10 border-dashed" onClick={() => onOriginChange("Ubicación actual simulada")}>
                <Navigation className="size-4 text-primary" />
                <span className="text-sm">Detectar mi ubicación actual</span>
              </Button>
              <InputGroup leftIcon={<MapPin className="size-4" />} size="default">
                <InputGroupInput 
                  placeholder="Busca una dirección de origen..." 
                  value={origin}
                  onChange={(e) => onOriginChange(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              2. ¿A dónde quieres ir? (Destino B)
            </label>
            <InputGroup leftIcon={<Navigation className="size-4" />} size="default">
              <InputGroupInput 
                placeholder="Ej: Trabajo, Estación, Parque..." 
                value={destination}
                onChange={(e) => onDestinationChange(e.target.value)}
              />
            </InputGroup>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              3. ¿Cómo te mueves? (Modo)
            </label>
            <ToggleGroup 
              type="single" 
              value={transportMode} 
              onValueChange={(val) => val && onTransportChange(val)}
              className="grid grid-cols-2 gap-2 w-full"
              variant="outline"
            >
              {transportModes.map((mode) => (
                <ToggleGroupItem 
                  key={mode.id} 
                  value={mode.id}
                  className={cn(
                    "flex flex-col h-20 gap-2 border-border/50 hover:bg-primary/5 transition-all",
                    transportMode === mode.id && "border-primary bg-primary/5 text-primary"
                  )}
                >
                  <mode.icon className={cn("size-6", transportMode === mode.id ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-tighter", transportMode === mode.id ? "text-primary" : "text-muted-foreground")}>
                    {mode.label}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <p className="text-[10px] text-muted-foreground text-center italic">
              Velocidad: {transportModes.find(m => m.id === transportMode)?.speed}. {transportModes.find(m => m.id === transportMode)?.desc}
            </p>
          </div>

          <Separator className="bg-border/50" />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                4. ¿Cuánto tiempo tienes?
              </label>
              <Badge 
                variant={travelTime > 30 ? "info" : "primary"} 
                appearance="soft" 
                className="font-bold gap-1 transition-all duration-300"
              >
                {travelTime > 30 ? <Clock className="size-3 text-info shrink-0" /> : null}
                {travelTime} MINUTOS {travelTime > 30 ? "(ESPECÍFICO)" : ""}
              </Badge>
            </div>
            
            {/* Slider de Rango Ampliado hasta 90 min */}
            <div className="px-2 pt-2 pb-6 relative group cursor-pointer">
              <input 
                type="range" 
                min="5" 
                max="90" 
                step="5" 
                value={travelTime} 
                onChange={(e) => onTimeChange(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="relative h-1.5 w-full bg-surface rounded-full z-10">
                <div 
                  className={cn(
                    "absolute h-full rounded-full transition-all duration-300",
                    travelTime > 30 ? "bg-info" : "bg-primary"
                  )} 
                  style={{ width: `${Math.min(100, Math.max(0, ((travelTime - 5) / 85) * 100))}%` }}
                />
                <div 
                  className={cn(
                    "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-background border-2 rounded-full shadow-lg transition-all duration-300 z-10",
                    travelTime > 30 ? "border-info" : "border-primary"
                  )}
                  style={{ left: `${Math.min(100, Math.max(0, ((travelTime - 5) / 85) * 100))}%` }}
                />
                <div className="absolute top-4 w-full flex justify-between px-0">
                  {[5, 15, 30, 45, 60, 90].map(m => (
                    <span 
                      key={m} 
                      className={cn(
                        "text-[8px] font-bold transition-colors cursor-pointer", 
                        travelTime === m 
                          ? (m > 30 ? "text-info font-black scale-110" : "text-primary font-black scale-110") 
                          : "text-muted-foreground"
                      )}
                      onClick={() => onTimeChange(m)}
                    >
                      {m}m
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Entrada Rápida de Tiempo Específico / Personalizado (Morado / Info) */}
            <div className="pt-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">
                Tiempo Específico (Personalizado)
              </label>
              <div className="flex items-center gap-2">
                <InputGroup leftIcon={<Clock className={cn("size-4", travelTime > 30 ? "text-info" : "text-muted-foreground")} />} size="sm" className="flex-1">
                  <InputGroupInput 
                    type="number" 
                    min="1" 
                    max="180"
                    placeholder="Escribe minutos exactos..." 
                    value={travelTime}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) onTimeChange(val);
                    }}
                    className={cn(
                      "font-semibold transition-all",
                      travelTime > 30 && "border-info/50 text-info font-bold"
                    )}
                  />
                </InputGroup>
                
                <Button 
                  variant={travelTime === 45 ? "info" : "secondary"}
                  size="sm"
                  className="h-9 px-2.5 text-xs font-bold shrink-0"
                  onClick={() => onTimeChange(45)}
                >
                  45m
                </Button>
                <Button 
                  variant={travelTime === 60 ? "info" : "secondary"}
                  size="sm"
                  className="h-9 px-2.5 text-xs font-bold shrink-0"
                  onClick={() => onTimeChange(60)}
                >
                  60m
                </Button>
              </div>
            </div>
          </div>

          <Button 
            className="w-full h-12 text-sm font-bold shadow-xl shadow-primary/20 gap-2"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                PROCESANDO...
              </>
            ) : (
              <>
                GENERAR ISÓCRONA
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>

          {profile === "ciudadano" && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-300">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Servicios a tu alrededor</h4>
              <div className="flex gap-2">
                <Button 
                  variant={activeServices.includes("parks") ? "primary" : "outline"} 
                  size="sm" 
                  className="h-8 text-[10px] uppercase tracking-tighter gap-1.5"
                  onClick={() => toggleService("parks")}
                >
                  <Plus className="size-3" /> Parques / Ocio
                </Button>
                <Button 
                  variant={activeServices.includes("tm") ? "primary" : "outline"} 
                  size="sm" 
                  className="h-8 text-[10px] uppercase tracking-tighter gap-1.5"
                  onClick={() => toggleService("tm")}
                >
                  <Plus className="size-3" /> Estaciones TM
                </Button>
              </div>
            </div>
          )}

          {profile === "profesional" && (
            <div className="space-y-3 pt-2 animate-in fade-in duration-300">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Capas de Negocio</h4>
              <div className="flex gap-2">
                <Button 
                  variant={activeServices.includes("density") ? "warning" : "outline"} 
                  size="sm" 
                  className="h-8 text-[10px] uppercase tracking-tighter gap-1.5"
                  onClick={() => toggleService("density")}
                >
                  <Activity className="size-3" /> Densidad
                </Button>
                <Button 
                  variant={activeServices.includes("comp") ? "warning" : "outline"} 
                  size="sm" 
                  className="h-8 text-[10px] uppercase tracking-tighter gap-1.5"
                  onClick={() => toggleService("comp")}
                >
                  <Target className="size-3" /> Competencia
                </Button>
              </div>
            </div>
          )}

          {profile === "tecnico" && (
            <div className="pt-4 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Configuración Avanzada</h4>
                <Separator className="flex-1 bg-border/30" />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between text-xs bg-surface/50 p-3 rounded-lg border border-border/30 group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Checkbox id="limit" variant="primary" size="sm" defaultChecked />
                    <label htmlFor="limit" className="text-muted-foreground cursor-pointer">Radio Límite (m)</label>
                  </div>
                  <span className="font-bold text-primary">1200</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-surface/50 p-3 rounded-lg border border-border/30 group hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-2">
                    <Checkbox id="sep" variant="primary" size="sm" />
                    <label htmlFor="sep" className="text-muted-foreground cursor-pointer">Separación (m)</label>
                  </div>
                  <span className="font-bold text-primary">50</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-border bg-surface/50">
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Activity className={cn("size-3", lastQueryTime ? "text-success" : "text-muted-foreground")} />
            Estado: {lastQueryTime ? "Activo - 100% SLA" : "Esperando consulta"}
          </div>
          <div>{lastQueryTime ? `API: ${lastQueryTime}ms` : "Sin procesar"}</div>
        </div>
      </div>
    </aside>
  );
}

function CardHeader({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
