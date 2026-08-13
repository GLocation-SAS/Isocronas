"use client";

import { Card, CardContent, CardTitle, CardBadge, CardDecorativeIcon } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Search } from "@/components/ui/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  CheckCircle2,
  AlertTriangle,
  MapPin, 
  Navigation, 
  Bike, 
  Car, 
  Train, 
  Footprints, 
  RotateCcw, 
  Activity, 
  ChevronRight,
  ChevronLeft,
  Plus,
  Info,
  PanelLeft,
  Clock,
  Loader2,
  Target,
  X,
  ChevronDown,
  ChevronUp,
  Home,
  Store,
  Hospital,
  HeartPulse,
  Building2,
  HelpCircle,
  Route,
  Scale,
  TreePine,
  Bus,
  GraduationCap,
  Pill,
  Utensils,
  Compass,
  Download,
  Share2,
  Pencil,
  Trash2,
  ArrowUpDown,
  Layers,
  Settings2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MOCK_POIS, isPoiInsideIsochrone } from "@/modules/visor/utils/geo";

const MOCK_ADDRESS_SUGGESTIONS = [
  {
    title: "Parque Central Simón Bolívar",
    subtitle: "Cra. 60 # 63-12, Teusaquillo",
    info: "Zona Verde • Teusaquillo",
    badgeVariant: "success" as const,
    icon: TreePine,
    color: "bg-success/20 text-success border border-success/30",
  },
  {
    title: "Plaza de Bolívar",
    subtitle: "Cra. 7 # 11-10, La Candelaria",
    info: "Centro Histórico • Candelaria",
    badgeVariant: "primary" as const,
    icon: MapPin,
    color: "bg-primary/20 text-primary border border-primary/30",
  },
  {
    title: "Centro Comercial Gran Estación",
    subtitle: "Av. El Dorado # 62-47, Fontibón",
    info: "Comercio • Fontibón",
    badgeVariant: "warning" as const,
    icon: Store,
    color: "bg-warning/20 text-warning border border-warning/30",
  },
  {
    title: "Hospital Universitario San Ignacio",
    subtitle: "Cra. 7 # 40-62, Chapinero",
    info: "Salud • Chapinero",
    badgeVariant: "danger" as const,
    icon: Hospital,
    color: "bg-danger/20 text-danger border border-danger/30",
  },
  {
    title: "Calle 72 # 11-41 (Zona Financiera)",
    subtitle: "Calle 72 con Carrera 11, Chapinero",
    info: "Negocios • Chapinero",
    badgeVariant: "info" as const,
    icon: Building2,
    color: "bg-info/20 text-info border border-info/30",
  },
  {
    title: "Aeropuerto Internacional El Dorado",
    subtitle: "Av. El Dorado # 103-09, Engativá",
    info: "Transporte • Engativá",
    badgeVariant: "secondary" as const,
    icon: Compass,
    color: "bg-info/20 text-info-400 border border-info/30",
  },
];

const getLocationIcon = (addressName: string, fallbackLetter: string) => {
  if (!addressName) return <span className="font-bold text-xs">{fallbackLetter}</span>;
  const nameLower = addressName.toLowerCase();
  const match = MOCK_ADDRESS_SUGGESTIONS.find(s => 
    s.title.toLowerCase() === nameLower || nameLower.includes(s.title.toLowerCase())
  );
  if (match) {
    const IconComp = match.icon;
    return <IconComp className="size-4" />;
  }
  if (nameLower.includes("parque") || nameLower.includes("bolívar") || nameLower.includes("verde") || nameLower.includes("simón")) {
    return <TreePine className="size-4 text-success" />;
  }
  if (nameLower.includes("hospital") || nameLower.includes("salud") || nameLower.includes("san ignacio") || nameLower.includes("clínica")) {
    return <Hospital className="size-4 text-danger" />;
  }
  if (nameLower.includes("comercial") || nameLower.includes("estación") || nameLower.includes("tienda") || nameLower.includes("mall")) {
    return <Store className="size-4 text-warning" />;
  }
  if (nameLower.includes("financiera") || nameLower.includes("72") || nameLower.includes("edificio") || nameLower.includes("oficina")) {
    return <Building2 className="size-4 text-info" />;
  }
  if (nameLower.includes("aeropuerto") || nameLower.includes("dorado") || nameLower.includes("terminal") || nameLower.includes("transporte")) {
    return <Compass className="size-4 text-info-400" />;
  }
  return <MapPin className="size-4 text-primary" />;
};

// Custom SVG Motorcycle Icon
const MotorcycleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="18" r="3" />
    <path d="M12 18V9H9" />
    <path d="M18 18h-4l-2.5-5H6" />
    <path d="m14 9 2.5-3.5h3.5" />
    <path d="M10 9h4" />
  </svg>
);

interface VisorSidebarProps {
  profile: string;
  analysisMode: "explore" | "route" | "compare" | "multiple";
  onAnalysisModeChange: (mode: "explore" | "route" | "compare" | "multiple") => void;
  transportMode: string;
  onTransportChange: (mode: string) => void;
  travelTime: number;
  onTimeChange: (time: number) => void;
  origin: string;
  onOriginChange: (val: string) => void;
  originB?: string;
  onOriginBChange?: (val: string) => void;
  destination: string;
  onDestinationChange: (val: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
  lastQueryTime: number | null;
  activeServices: string[];
  onServicesChange: (services: string[]) => void;
  onLocateClick?: () => void;
  onOpenExport?: () => void;
  isOutdated?: boolean;
  outdatedReason?: "location" | "transport" | "time" | "mode" | null;
  generatedTravelTime?: number;
  generatedTransportMode?: string;
  activeInput: 'A' | 'B' | 'DEST';
  setActiveInput: (val: 'A' | 'B' | 'DEST') => void;
  inputMethod: "search" | "map" | "gps";
  setInputMethod: (val: "search" | "map" | "gps") => void;
  layers: any[];
  setLayers: (layers: any[]) => void;
  mapBase: "dark" | "light" | "satellite";
  setMapBase: (base: "dark" | "light" | "satellite") => void;
  hasGenerated: boolean;
  multipleOrigins?: { id: string, address: string, lat: number, lng: number }[];
  setMultipleOrigins?: (origins: { id: string, address: string, lat: number, lng: number }[]) => void;
  technicalIntervals?: number[];
  setTechnicalIntervals?: (intervals: number[]) => void;
}

export function VisorSidebar({
  profile,
  analysisMode,
  onAnalysisModeChange,
  transportMode,
  onTransportChange,
  travelTime,
  onTimeChange,
  origin,
  onOriginChange,
  originB,
  onOriginBChange,
  destination,
  onDestinationChange,
  onGenerate,
  onReset,
  isGenerating,
  lastQueryTime,
  activeServices,
  onServicesChange,
  onLocateClick,
  onOpenExport,
  isOutdated = false,
  outdatedReason = null,
  generatedTravelTime,
  generatedTransportMode,
  activeInput,
  setActiveInput,
  inputMethod,
  setInputMethod,
  layers,
  setLayers,
  mapBase,
  setMapBase,
  hasGenerated,
  multipleOrigins,
  setMultipleOrigins,
  technicalIntervals,
  setTechnicalIntervals
}: VisorSidebarProps) {
  const getPoiCount = (type: string | string[]) => {
    if (lastQueryTime === null || !generatedTravelTime || !generatedTransportMode) return null;
    const types = Array.isArray(type) ? type : [type];
    return MOCK_POIS.filter(poi => 
      types.includes(poi.type) && 
      isPoiInsideIsochrone(poi, generatedTravelTime, generatedTransportMode)
    ).length;
  };

  const hasZeroResults = lastQueryTime !== null && activeServices.some(s => {
    if (s === "density" || s === "comp") return false;
    return getPoiCount(s === "shopping" ? ["stores", "shopping"] : s) === 0;
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [showMainCard, setShowMainCard] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ type: "replace" | "delete"; target: "A" | "B" | "DEST" } | null>(null);
  const [customSpeed, setCustomSpeed] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<string[]>(["ubicacion", "movilidad", "tiempo"]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  useEffect(() => {
    if (hasGenerated) {
      setOpenSections(prev => {
        const next = new Set(prev);
        next.add("resultadosPanel");
        next.add("capasVisibles");
        return Array.from(next);
      });
    }
  }, [hasGenerated]);
  
  // Nuevo estado para la intención de análisis: explorar, ruta o comparar

  // Sincronizar el modo de análisis eliminado para evitar sobreescribir la selección manual del usuario

  // Cinco modos de transporte con colores diferentes según tokens semánticos globales
  const transportModes = [
    { 
      id: "walk", 
      label: "A pie", 
      icon: Footprints, 
      speed: "4.5 km/h", 
      desc: "Mapea la conectividad peatonal.", 
      colorClass: "border-primary bg-primary/10 text-primary shadow-xs ring-1 ring-primary/10", 
      iconColor: "text-primary" 
    },
    { 
      id: "bike", 
      label: "Bicicleta", 
      icon: Bike, 
      speed: "15 km/h", 
      desc: "Optimizado para ciclorrutas de Bogotá.", 
      colorClass: "border-success bg-success/10 text-success shadow-xs ring-1 ring-success/10", 
      iconColor: "text-success" 
    },
    { 
      id: "motorcycle", 
      label: "Moto", 
      icon: MotorcycleIcon, 
      speed: "35 km/h", 
      desc: "Cálculo ágil por vías arterias.", 
      colorClass: "border-warning bg-warning/10 text-warning shadow-xs ring-1 ring-warning/10", 
      iconColor: "text-warning" 
    },
    { 
      id: "car", 
      label: "Automóvil", 
      icon: Car, 
      speed: "30 km/h", 
      desc: "Estándar de tráfico histórico.", 
      colorClass: "border-foreground/40 bg-surface text-foreground shadow-xs ring-1 ring-foreground/20 font-bold", 
      iconColor: "text-foreground" 
    },
    { 
      id: "transit", 
      label: "Público", 
      icon: Train, 
      speed: "25 km/h", 
      desc: "Ajustado a rutas de TransMilenio.", 
      colorClass: "border-info bg-info/10 text-info shadow-xs ring-1 ring-info/10", 
      iconColor: "text-info" 
    },
  ];

  // Asignar colores de la slider y campo de texto basados en tokens de isócronas definidos en globals.css
  const getIsochroneTheme = (time: number) => {
    if (time <= 5) {
      return {
        fillBg: "bg-isochrone-5min",
        border: "border-isochrone-5min",
        text: "text-isochrone-5min",
        ring: "focus:ring-isochrone-5min/45 border-isochrone-5min/50"
      };
    }
    if (time <= 10) {
      return {
        fillBg: "bg-isochrone-10min",
        border: "border-isochrone-10min",
        text: "text-isochrone-10min",
        ring: "focus:ring-isochrone-10min/45 border-isochrone-10min/50"
      };
    }
    if (time <= 15) {
      return {
        fillBg: "bg-isochrone-15min",
        border: "border-isochrone-15min",
        text: "text-isochrone-15min",
        ring: "focus:ring-isochrone-15min/45 border-isochrone-15min/50"
      };
    }
    if (time <= 30) {
      return {
        fillBg: "bg-isochrone-30min",
        border: "border-isochrone-30min",
        text: "text-isochrone-30min",
        ring: "focus:ring-isochrone-30min/45 border-isochrone-30min/50"
      };
    }
    if (time <= 60) {
      return {
        fillBg: "bg-isochrone-maxmin",
        border: "border-isochrone-maxmin",
        text: "text-isochrone-maxmin",
        ring: "focus:ring-isochrone-maxmin/45 border-isochrone-maxmin/50"
      };
    }
    return {
      fillBg: "bg-info",
      border: "border-info",
      text: "text-info",
      ring: "focus:ring-info/45 border-info/50"
    };
  };
  const activeTimeTheme = getIsochroneTheme(travelTime);

  const handleSwapLocations = () => {
    const tempOrigin = origin;
    onOriginChange(destination || "Centro Comercial Gran Estación");
    onDestinationChange(tempOrigin || "Parque Central Simón Bolívar");
  };

  const toggleService = (service: string) => {
    if (activeServices.includes(service)) {
      onServicesChange(activeServices.filter(s => s !== service));
    } else {
      onServicesChange([...activeServices, service]);
    }
  };

  const getCardContent = () => {
    if (profile === "ciudadano") {
      return {
        badge: "MODO CIUDADANO",
        title: "Encuentra una vivienda bien ubicada",
        desc: "Descubre si una vivienda o barrio queda cerca de tu trabajo, estudio, transporte y lugares frecuentes según tu tiempo de viaje.",
        icon: Home,
        glow: "success-warning" as const,
        badgeClass: "bg-success/15 text-success border-success/30 group-data-[variant=featured]/card:bg-success/15 group-data-[variant=featured]/card:text-success group-data-[variant=featured]/card:border-success/30"
      };
    }
    if (profile === "profesional") {
      return {
        badge: "MODO PROFESIONAL",
        title: "Analiza y compara ubicaciones",
        desc: "Evalúa accesibilidad, cobertura y servicios de diferentes ubicaciones utilizando tiempos de viaje, capas e indicadores.",
        icon: Building2,
        glow: "primary-info" as const,
        badgeClass: "bg-info/15 text-info border-info/30 group-data-[variant=featured]/card:bg-info/15 group-data-[variant=featured]/card:text-info group-data-[variant=featured]/card:border-info/30"
      };
    }
    if (profile === "tecnico") {
      return {
        badge: "MODO TÉCNICO",
        title: "Configura y analiza con mayor detalle",
        desc: "Controla parámetros avanzados, capas, rangos y datos geoespaciales para realizar análisis especializados de accesibilidad.",
        icon: Target,
        glow: "primary-info" as const,
        badgeClass: "bg-primary/15 text-primary border-primary/30 group-data-[variant=featured]/card:bg-primary/15 group-data-[variant=featured]/card:text-primary group-data-[variant=featured]/card:border-primary/30"
      };
    }
    return {
      badge: "MODO TERRITORIO",
      title: "Apoya decisiones de planeación urbana",
      desc: "Analiza la accesibilidad, movilidad e infraestructura de un territorio para identificar oportunidades de mejora.",
      icon: Building2,
      glow: "success-warning" as const,
      badgeClass: "bg-warning/15 text-warning border-warning/30 group-data-[variant=featured]/card:bg-warning/15 group-data-[variant=featured]/card:text-warning group-data-[variant=featured]/card:border-warning/30"
    };
  };

  const cardContent = getCardContent();
  const CardIconComponent = cardContent.icon;

  if (isCollapsed) {
    const activeModeObj = transportModes.find(m => m.id === transportMode) || transportModes[0];
    const ActiveModeIcon = activeModeObj.icon;

    return (
      <div className="relative font-sans">
        <aside className="flex flex-col items-center py-4 px-2 gap-3 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-300 w-14 md:w-16 h-auto">
          <Button
            variant="primary"
            size="icon"
            className="shrink-0 hover:scale-105 transition-transform"
            onClick={() => setIsCollapsed(false)}
            title="Abrir / Descolapsar menú"
            aria-label="Abrir menú"
            leftIcon={<PanelLeft className="size-5" />}
          />

          <Button
            variant="neutral"
            size="icon"
            className={cn(
              "shrink-0 transition-colors",
              showInfoPopover && "bg-info/15 border-info text-info"
            )}
            onClick={() => setShowInfoPopover(!showInfoPopover)}
            title="Ver resumen / Información"
            aria-label="Información"
            leftIcon={<Info className="size-4" />}
          />

          <Separator className="w-8 bg-border/60 my-0.5" />

          <div 
            className="flex flex-col items-center justify-center size-9 rounded-xl bg-surface border border-border/60 text-primary cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setIsCollapsed(false)}
            title={`Modo: ${activeModeObj.label} (${activeModeObj.speed})`}
          >
            <ActiveModeIcon className="size-4" />
          </div>

          {analysisMode === "explore" && (
            <div 
              className="flex flex-col items-center justify-center px-1.5 py-1 rounded-xl bg-surface border border-border/60 text-[10px] font-bold text-foreground cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setIsCollapsed(false)}
              title={`Tiempo: ${travelTime} minutos`}
            >
              <Clock className="size-3 text-info mb-0.5" />
              <span>{travelTime}m</span>
            </div>
          )}

          <Separator className="w-8 bg-border/60 my-0.5" />

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onGenerate}
            disabled={isGenerating}
            title="Generar Isócrona"
            leftIcon={
              isGenerating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )
            }
          />

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => {
              onReset();
            }}
            title="Reiniciar parámetros"
            leftIcon={<RotateCcw className="size-3.5" />}
          />
        </aside>

        {showInfoPopover && (
          <div className="absolute top-0 left-16 md:left-20 z-50 w-72 p-4 rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-left-2 duration-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-wider">
                <Info className="size-4 text-info" />
                Resumen de Consulta
              </div>
              <Button variant="ghost" size="icon-xs" onClick={() => setShowInfoPopover(false)} leftIcon={<X className="size-3.5 text-muted-foreground" />} />
            </div>

            <Card variant="featured" glow={cardContent.glow} className="p-3 space-y-1.5 text-xs border-border/50">
              <CardBadge className={cardContent.badgeClass}>
                {cardContent.badge}
              </CardBadge>
              <div className="font-bold text-foreground">{cardContent.title}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{cardContent.desc}</div>
            </Card>

            <div className="space-y-1.5 text-xs bg-surface/50 p-2.5 rounded-xl border border-border/40">
              <div className="flex justify-between text-muted-foreground">
                <span>Intención:</span>
                <span className="font-semibold text-foreground uppercase tracking-wider text-[9px]">
                  {analysisMode === "explore" ? "Explorar" : analysisMode === "route" ? "Trayecto" : "Comparar"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Origen:</span>
                <span className="font-semibold text-foreground truncate max-w-[150px]">{origin || "No definido"}</span>
              </div>
              {analysisMode !== "explore" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{analysisMode === "route" ? "Destino:" : "Comparación:"}</span>
                  <span className="font-semibold text-foreground truncate max-w-[150px]">{destination || "No definido"}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Modo:</span>
                <span className="font-semibold text-foreground">{activeModeObj.label} ({activeModeObj.speed})</span>
              </div>
              {analysisMode !== "route" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Tiempo:</span>
                  <span className="font-semibold text-primary">{travelTime} minutos</span>
                </div>
              )}
            </div>

            <Button 
              variant="neutral" 
              size="sm" 
              className="w-full text-xs font-bold text-primary"
              onClick={() => {
                setShowInfoPopover(false);
                setIsCollapsed(false);
              }}
              leftIcon={<PanelLeft className="size-3.5" />}
            >
              Descolapsar y ver opciones
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className="flex flex-col h-full max-h-full overflow-y-auto rounded-2xl border border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-300">
      <div className="p-6 space-y-6 font-sans">
        {/* Header con botón de información y colapsar */}
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <PanelLeft className="size-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Parámetros de Isócrona
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setIsCollapsed(true)}
              title="Colapsar menú"
              aria-label="Colapsar menú"
              leftIcon={<ChevronLeft className="size-4" />}
            />
          </div>
        </div>

        {/* Popover / Tarjeta de información emergente cuando showInfoPopover es true en modo expandido */}
        {showInfoPopover && (
          <Card variant="featured" glow={cardContent.glow} className="p-4 relative animate-in fade-in duration-200">
            <Button 
              variant="ghost" 
              size="icon-xs" 
              className="absolute top-2 right-2 h-6 w-6" 
              onClick={() => setShowInfoPopover(false)}
              leftIcon={<X className="size-3.5" />}
            />
            <div className="space-y-2">
              <CardBadge className={cardContent.badgeClass}>
                {cardContent.badge}
              </CardBadge>
              <h4 className="text-sm font-bold mt-2">{cardContent.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {cardContent.desc}
              </p>
            </div>
          </Card>
        )}

        {/* Módulo Activo Info Card */}
        {showMainCard && (
          <Card 
            variant="featured" 
            glow={cardContent.glow} 
            className="border-border/50 relative"
          >
            <Button 
              variant="ghost" 
              size="icon-xs" 
              className="absolute top-2 right-2 h-6 w-6 z-10" 
              onClick={() => setShowMainCard(false)}
              leftIcon={<X className="size-3.5" />}
            />
            <CardBadge className={cardContent.badgeClass}>
              {cardContent.badge}
            </CardBadge>
            <div className="p-0 mt-2 relative w-full">
              <CardTitle className="max-w-[80%] pr-4 leading-snug">{cardContent.title}</CardTitle>
              <p className="text-xs leading-relaxed text-muted-foreground mt-1.5 max-w-[90%]">
                {cardContent.desc}
              </p>
              <CardDecorativeIcon className="opacity-25 -bottom-6 -right-6">
                <CardIconComponent className="size-28 text-foreground" />
              </CardDecorativeIcon>
            </div>
          </Card>
        )}

        <Separator className="bg-border/50" />

        {/* ¿Qué quieres analizar? Selector en 3 Columnas */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-left block">
            ¿Qué quieres analizar?
          </label>
          <TooltipProvider delayDuration={100}>
            <div className={cn("grid gap-2", profile === "tecnico" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3")}>
              {[
                {
                  id: "explore" as const,
                  title: "Explorar zonas cercanas",
                  desc: "Descubre hasta dónde puedes llegar según tu tiempo.",
                  tooltip: "Generar mapa de alcance temporal (isócrona) en minutos desde un origen.",
                  icon: Target,
                  color: "primary"
                },
                {
                  id: "route" as const,
                  title: "Calcular un trayecto",
                  desc: "Consulta cuánto tardas entre dos ubicaciones.",
                  tooltip: "Calcular recorrido y tiempo de viaje directo entre un origen y un destino.",
                  icon: Route,
                  color: "success"
                },
                {
                  id: "compare" as const,
                  title: "Comparar ubicaciones",
                  desc: "Compara el alcance de dos puntos de análisis.",
                  tooltip: "Comparar en simultáneo el tiempo de acceso de dos puntos diferentes.",
                  icon: Scale,
                  color: "warning"
                },
                ...(profile === "tecnico" ? [{
                  id: "multiple" as const,
                  title: "Análisis múltiple",
                  desc: "Múltiples escenarios de accesibilidad.",
                  tooltip: "Genera y superpone diferentes escenarios de accesibilidad para identificar coincidencias.",
                  icon: Layers,
                  color: "info"
                }] : [])
              ].map((mode) => {
                const isActive = analysisMode === mode.id;
                const ModeIcon = mode.icon;
                return (
                  <Tooltip key={mode.id}>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => {
                          onAnalysisModeChange(mode.id as any);
                          if (mode.id === "explore" || mode.id === "multiple") {
                            onDestinationChange("");
                          } else if (!destination) {
                            onDestinationChange("Centro Comercial Gran Estación");
                          }
                          if (mode.id === "compare" && !originB && onOriginBChange) {
                            onOriginBChange("Universidad Nacional");
                          }
                        }}
                        className={cn(
                          "flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer select-none gap-2 h-auto min-h-[140px]",
                          isActive
                            ? [
                                mode.color === "success" && "border-success bg-success/5 text-success shadow-xs ring-1 ring-success/15",
                                mode.color === "primary" && "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/15",
                                mode.color === "warning" && "border-warning bg-warning/5 text-warning shadow-xs ring-1 ring-warning/15",
                                mode.color === "info" && "border-info bg-info/5 text-info shadow-xs ring-1 ring-info/15"
                              ]
                            : "border-border/60 bg-card hover:bg-surface/50 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className={cn(
                          "flex items-center justify-center size-9 rounded-full transition-colors",
                          isActive
                            ? [
                                mode.color === "success" && "bg-success/10 text-success",
                                mode.color === "primary" && "bg-primary/10 text-primary",
                                mode.color === "warning" && "bg-warning/10 text-warning",
                                mode.color === "info" && "bg-info/10 text-info"
                              ]
                            : "bg-surface text-muted-foreground"
                        )}>
                          <ModeIcon className="size-4.5 shrink-0" />
                        </div>
                        <span className="text-[10px] font-bold leading-tight">{mode.title}</span>
                        <span className="text-[8px] text-muted-foreground leading-normal mt-0.5">{mode.desc}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent variant={mode.color as any} side="right" sideOffset={8} className="text-xs font-medium max-w-xs text-center">
                      {mode.tooltip}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>

        <Separator className="bg-border/50" />

        {/* Sección 1: Ubicaciones */}
        <div className="space-y-4">
          <div 
            className="flex items-start justify-between cursor-pointer group"
            onClick={() => toggleSection("ubicacion")}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                  1
                </span>
                <span className="text-sm font-bold text-foreground group-hover:underline">
                  {analysisMode === "compare" && "¿Cuáles ubicaciones comparas?"}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground/85 pl-8 leading-snug text-left">
                {analysisMode === "explore" && "Descubre hasta dónde puedes llegar según tu tiempo."}
                {analysisMode === "route" && "Consulta cuánto tardas entre dos ubicaciones."}
                {analysisMode === "compare" && "Compara el alcance y accesibilidad de dos puntos de análisis."}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline cursor-pointer shrink-0">
                      <HelpCircle className="size-3.5" />
                      <span>¿Cómo hacerlo?</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent variant="info" side="right" sideOffset={8} className="max-w-xs text-left p-3 text-xs leading-normal">
                    Busca una dirección en el cuadro de búsqueda, haz clic directamente en cualquier punto del mapa, o usa tu GPS para detectar tu ubicación actual.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {openSections.includes("ubicacion") ? (
                <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
              )}
            </div>
          </div>

          {openSections.includes("ubicacion") && (
            <div className="space-y-4 pt-1 animate-in slide-in-from-top-2 duration-200">
          {/* Capsule Tab Selector (Buscar, Mapa, GPS, Coordenadas) */}
          <div className={cn("grid gap-1 bg-surface/40 border border-border/70 p-0.5 rounded-xl", profile === "tecnico" ? "grid-cols-4" : "grid-cols-3")}>
            <div
              onClick={() => setInputMethod("search")}
              className={cn(
                "flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer",
                inputMethod === "search"
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              <svg className="size-3.5 mr-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar dirección
            </div>

            <div
              onClick={() => setInputMethod("map")}
              className={cn(
                "flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer",
                inputMethod === "map"
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              )}
            >
              <MapPin className="size-3.5 mr-1 shrink-0" />
              Seleccionar mapa
            </div>

            <div
              onClick={() => {
                onLocateClick?.();
                setInputMethod("search");
              }}
              className="flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-[9px] font-bold text-muted-foreground hover:text-foreground transition-all border border-transparent cursor-pointer"
            >
              <Navigation className="size-3.5 rotate-45 mr-1" />
              Ubicación actual
            </div>
            
            {profile === "tecnico" && (
              <div
                onClick={() => setInputMethod("gps")} // Using 'gps' state temporarily for Coordinates since it is unused otherwise, or we can use 'coords'. The interface says 'search'|'map'|'gps', I will use 'gps' for Coordenadas in técnico
                className={cn(
                  "flex items-center justify-center gap-1 py-2 px-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer",
                  inputMethod === "gps"
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                )}
              >
                <Compass className="size-3.5 mr-1 shrink-0" />
                Coordenadas
              </div>
            )}
          </div>

          {inputMethod === "search" ? (
            <div className="relative w-full z-30">
              <Search
                placeholder={activeInput === 'A' ? "Ej: Parque Central Simón Bolívar" : activeInput === 'B' ? "Ej: Centro Comercial Gran Estación" : "Ej: Universidad Nacional"}
                value={activeInput === 'A' ? origin : activeInput === 'B' ? (originB || "") : destination}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setShowSuggestions(true);
                  if (activeInput === 'A') {
                    onOriginChange(e.target.value);
                  } else if (activeInput === 'B') {
                    onOriginBChange?.(e.target.value);
                  } else {
                    onDestinationChange(e.target.value);
                  }
                }}
                onClear={() => {
                  setShowSuggestions(false);
                  if (activeInput === 'A') {
                    onOriginChange("");
                  } else if (activeInput === 'B') {
                    onOriginBChange?.("");
                  } else {
                    onDestinationChange("");
                  }
                }}
                className="w-full"
              />

              {/* Combobox de Sugerencias Simulado con Más Información */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden divide-y divide-border/40 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between px-3.5 py-2 bg-surface/60 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <span>Sugerencias (Bogotá, Colombia)</span>
                    <div 
                      onClick={() => setShowSuggestions(false)} 
                      className="text-muted-foreground hover:text-foreground text-[10px] font-medium cursor-pointer"
                    >
                      Cerrar ✕
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {MOCK_ADDRESS_SUGGESTIONS.map((item, idx) => {
                      const SuggestionIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (activeInput === 'A') {
                              onOriginChange(item.title);
                            } else if (activeInput === 'B') {
                              onOriginBChange?.(item.title);
                            } else {
                              onDestinationChange(item.title);
                            }
                            setShowSuggestions(false);
                          }}
                          className="flex items-start gap-3 p-3 hover:bg-primary/10 transition-colors cursor-pointer text-left group border-b border-border/20 last:border-0"
                        >
                          <div className={cn("flex size-8 items-center justify-center rounded-xl shrink-0 mt-0.5 shadow-xs", item.color)}>
                            <SuggestionIcon className="size-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                              <span className="truncate">{item.title}</span>
                              <span className="text-[9px] font-mono text-muted-foreground shrink-0 ml-2">Bogotá</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground truncate font-medium">
                              {item.subtitle}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              <Badge 
                                variant="neutral" 
                                appearance="outline" 
                                className="text-[9.5px] font-mono leading-relaxed py-0.5 px-2 font-medium border-primary/30 text-foreground bg-primary/5 rounded-md"
                              >
                                {item.info}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                  {hasZeroResults && (
                    <div className="p-3 mt-3 rounded-xl border border-warning/30 bg-warning/10 flex items-start gap-2.5 animate-in slide-in-from-bottom-2">
                      <AlertTriangle className="size-4 text-warning shrink-0" />
                      <div className="text-[11px] text-foreground space-y-1">
                        <strong className="text-warning font-bold block">Sin resultados</strong>
                        <p>
                          {analysisMode === "explore" && "No encontramos servicios de esta categoría dentro de tu área de alcance."}
                          {analysisMode === "route" && "No encontramos servicios de esta categoría cerca de tu recorrido."}
                          {analysisMode === "compare" && "No encontramos servicios de esta categoría cerca de las rutas comparadas."}
                        </p>
                        {analysisMode === "explore" && (
                          <p className="text-muted-foreground">Prueba aumentando el tiempo de viaje o seleccionando otro punto de origen para encontrar más opciones.</p>
                        )}
                        {analysisMode === "route" && (
                          <p className="text-muted-foreground">Prueba cambiando el medio de transporte o reubicando los puntos de origen o destino.</p>
                        )}
                        {analysisMode === "compare" && (
                          <p className="text-muted-foreground">Prueba seleccionando otras ubicaciones o cambiando el medio de transporte.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : inputMethod === "gps" && profile === "tecnico" ? (
            <div className="flex items-center gap-2 w-full animate-in fade-in duration-200">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-muted-foreground mb-1 block">Latitud</label>
                <input 
                  type="text" 
                  placeholder="Ej: 4.5981" 
                  className="w-full bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:font-sans placeholder:text-muted-foreground/50" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value;
                      if (val) {
                        const evt = { target: { value: `Lat: ${val}, Lng: ...` } } as any;
                        if (activeInput === 'A') onOriginChange(evt.target.value);
                        else if (activeInput === 'B') onOriginBChange?.(evt.target.value);
                        else onDestinationChange(evt.target.value);
                      }
                    }
                  }}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-muted-foreground mb-1 block">Longitud</label>
                <input 
                  type="text" 
                  placeholder="Ej: -74.0760" 
                  className="w-full bg-background border border-border/80 rounded-lg px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:font-sans placeholder:text-muted-foreground/50" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value;
                      if (val) {
                        const evt = { target: { value: `Lat: ..., Lng: ${val}` } } as any;
                        if (activeInput === 'A') onOriginChange(evt.target.value);
                        else if (activeInput === 'B') onOriginBChange?.(evt.target.value);
                        else onDestinationChange(evt.target.value);
                      }
                    }
                  }}
                />
              </div>
              <Button size="sm" variant="primary" className="mt-4 h-9 px-3 shrink-0" onClick={() => {}}>
                Ubicar
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 p-3 rounded-xl border border-dashed border-primary/30 bg-primary/5 text-xs text-primary leading-normal animate-in fade-in duration-200">
              <MapPin className="size-4.5 animate-bounce shrink-0" />
              <p className="text-[11px] font-medium text-left">
                El modo de selección en mapa está <strong>activo</strong>. Haz clic en el mapa de la derecha para actualizar la <strong>Ubicación {activeInput}</strong>.
              </p>
            </div>
          )}
        </div>
      )}

          {/* Ubicaciones Seleccionadas Container */}
          <div className="space-y-3 border border-border/80 bg-surface/20 rounded-2xl p-4">
            {/* Cabecera del contenedor */}
            <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">
                  Ubicaciones seleccionadas
                </span>
                <span className="flex items-center justify-center size-5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold">
                  {analysisMode === "explore" ? (origin ? 1 : 0) : analysisMode === "route" ? (origin ? 1 : 0) + (destination ? 1 : 0) : (origin ? 1 : 0) + (originB ? 1 : 0) + (destination ? 1 : 0)}
                </span>
              </div>
              
              <div
                onClick={() => {
                  onOriginChange("");
                  if (onOriginBChange) onOriginBChange("");
                  onDestinationChange("");
                  onReset();
                }}
                className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground hover:text-danger hover:underline transition-colors cursor-pointer"
              >
                <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Borrar todo</span>
              </div>
            </div>

            {/* Listado de Ubicaciones */}
            <div className="space-y-2.5">
              {/* Ubicación A */}
              <div 
                onClick={() => setActiveInput('A')}
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer relative",
                  activeInput === 'A' 
                    ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/20" 
                    : "border-border/60 bg-card hover:bg-surface/50"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Drag Handler :: */}
                  <div className="flex flex-col gap-0.5 opacity-30 cursor-grab shrink-0">
                    <span className="size-1 rounded-full bg-foreground" />
                    <span className="size-1 rounded-full bg-foreground" />
                    <span className="size-1 rounded-full bg-foreground" />
                  </div>

                  <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {getLocationIcon(origin || "Parque Central Simón Bolívar", "A")}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-bold text-foreground truncate max-w-[120px] md:max-w-[160px]">
                      {origin || "Parque Central Simón Bolívar"}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate max-w-[120px] md:max-w-[160px]">
                      {origin ? "Bogotá, Colombia" : "Cra. 60 # 63-12, Bogotá, Colombia"}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="primary" appearance="soft" className="text-[8px] font-bold py-1 px-2 uppercase font-mono tracking-widest leading-none">
                    ORIGEN
                  </Badge>
                  
                  {/* Botón Reemplazar / Editar */}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="rounded-lg border border-border/80 bg-surface/50 hover:bg-primary/10 hover:text-primary hover:border-primary/40 size-7 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmAction({ type: "replace", target: "A" });
                          }}
                        >
                          <Pencil className="size-3.5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent variant="primary" side="right" sideOffset={8} className="text-xs font-bold">
                        Reemplazar esta ubicación
                      </TooltipContent>
                    </Tooltip>

                    {/* Botón Eliminar */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="rounded-lg border border-border/80 bg-surface/50 hover:bg-danger/10 hover:text-danger hover:border-danger/40 size-7 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmAction({ type: "delete", target: "A" });
                          }}
                        >
                          <Trash2 className="size-3.5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent variant="danger" side="right" sideOffset={8} className="text-xs font-bold">
                        Eliminar ubicación
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Sección 2: ¿Cómo te mueves? */}
        <div className="space-y-3">
          <div 
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => toggleSection("movilidad")}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-6 rounded-full bg-info text-info-foreground font-bold text-xs">
                2
              </span>
              <span className="text-sm font-bold text-foreground group-hover:underline">
                ¿Cómo te mueves?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-info hover:underline text-[11px] font-bold cursor-pointer">
                      <Info className="size-3.5" />
                      <span>¿Por qué importa?</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent variant="info" side="left" sideOffset={8} className="text-xs font-medium max-w-xs leading-relaxed">
                    El medio de transporte determina la velocidad y las vías accesibles (ciclorrutas, peatonales o vías vehiculares), cambiando drásticamente el área de cobertura.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {openSections.includes("movilidad") ? (
                <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
              ) : (
                <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
              )}
            </div>
          </div>

          {openSections.includes("movilidad") && (
            <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
              <TooltipProvider delayDuration={100}>
            <div className="grid grid-cols-5 gap-1.5">
              {transportModes.map((mode) => {
                const Icon = mode.icon;
                const isActive = transportMode === mode.id;
                return (
                  <Tooltip key={mode.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onTransportChange(mode.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-3 px-1 rounded-xl border text-center transition-all cursor-pointer h-20 gap-1.5 min-w-0",
                          isActive 
                            ? mode.colorClass 
                            : "border-border/60 bg-background text-muted-foreground hover:bg-surface/50"
                        )}
                      >
                        <Icon className={cn("size-5 shrink-0", isActive ? mode.iconColor : "text-muted-foreground")} />
                        <span className="text-[10px] leading-tight font-medium tracking-tight truncate w-full">
                          {mode.label}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent variant="info" side="right" sideOffset={8} className="text-xs font-bold">
                      {mode.label} (Velocidad: {mode.speed})
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
              
              {profile === "tecnico" ? (
                <div className="flex items-center gap-2 mt-2 bg-surface/30 p-2 rounded-lg border border-border/50 animate-in fade-in">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-muted-foreground block mb-1">Velocidad de referencia (km/h)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number"
                        value={customSpeed !== null ? customSpeed : transportModes.find(m => m.id === transportMode)?.speed.replace(" km/h", "")}
                        onChange={(e) => setCustomSpeed(e.target.value)}
                        className="w-full bg-background border border-border/80 rounded-md px-2 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                        min="1"
                        max="120"
                      />
                      {customSpeed !== null && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="size-7 shrink-0 text-muted-foreground hover:text-danger" 
                          onClick={() => setCustomSpeed(null)}
                          title="Restablecer valor por defecto"
                        >
                          <RotateCcw className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground text-center italic">
                  Velocidad promedio: {transportModes.find(m => m.id === transportMode)?.speed}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Ocultar sección de tiempo en modo calcular ruta */}
        {analysisMode === "explore" && (
          <>
            <Separator className="bg-border/50" />

            {/* Sección 3: ¿Cuánto tiempo tienes? */}
            <div className="space-y-3">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => toggleSection("tiempo")}
              >
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center size-6 rounded-full bg-success text-success-foreground font-bold text-xs">
                    3
                  </span>
                  <span className="text-sm font-bold text-foreground group-hover:underline">
                    ¿Cuánto tiempo tienes?
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 text-success hover:underline text-[11px] font-bold cursor-pointer">
                          <Info className="size-3.5" />
                          <span>¿Por qué importa?</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent variant="success" side="left" sideOffset={8} className="text-xs font-medium max-w-xs leading-relaxed">
                        Define el límite máximo de desplazamiento en minutos. El geovisor traza la mancha concéntrica (isócrona) que delimita hasta dónde puedes llegar en ese intervalo.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {openSections.includes("tiempo") ? (
                    <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
                  ) : (
                    <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
                  )}
                </div>
              </div>

              {openSections.includes("tiempo") && (
                <div className="space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
                  {profile === "tecnico" ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="size-4 text-primary" />
                        <span className="text-xs font-bold text-foreground">Intervalos isócronos (minutos)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[5, 10, 15, 30, 45, 60].map(m => {
                          const isActive = technicalIntervals?.includes(m);
                          return (
                            <button
                              key={m}
                              onClick={() => {
                                if (setTechnicalIntervals && technicalIntervals) {
                                  if (isActive) {
                                    if (technicalIntervals.length > 1) {
                                      setTechnicalIntervals(technicalIntervals.filter(i => i !== m));
                                    }
                                  } else {
                                    if (technicalIntervals.length < 3) {
                                      setTechnicalIntervals([...technicalIntervals, m].sort((a, b) => a - b));
                                    } else {
                                      // TODO: Toast maximum 3 intervals?
                                    }
                                  }
                                }
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                                isActive 
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                                  : "bg-surface/50 border-border/80 text-muted-foreground hover:bg-surface hover:text-foreground"
                              )}
                            >
                              {m} min
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">Selecciona hasta 3 intervalos simultáneos para el análisis de cobertura.</p>
                    </div>
                  ) : (
                    <>
                      {/* Input Numérico para Tiempo Personalizado */}
                      <div className="flex items-center justify-center gap-2 py-1">
                        <input 
                          type="number"
                          min="1"
                          max="120"
                          value={travelTime}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              onTimeChange(Math.max(1, Math.min(120, val)));
                            }
                          }}
                          className={cn(
                            "w-16 h-9 text-center font-bold text-lg bg-surface border rounded-lg text-foreground focus:outline-none focus:ring-2 transition-all",
                            activeTimeTheme.ring
                          )}
                        />
                        <span className="text-sm font-bold text-muted-foreground">minutos</span>
                      </div>

                      {/* Slider Deslizador de Tiempo */}
                      <div className="px-2 pt-2 pb-6 relative group cursor-pointer">
                        <input 
                          type="range" 
                          min="5" 
                          max="60" 
                          step="5" 
                          value={travelTime <= 60 ? travelTime : 60} 
                          onChange={(e) => onTimeChange(parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className="relative h-1.5 w-full bg-surface rounded-full z-10">
                          <div 
                            className={cn("absolute h-full rounded-full transition-all duration-300", activeTimeTheme.fillBg)}
                            style={{ width: `${Math.min(100, Math.max(0, ((Math.min(60, travelTime) - 5) / 55) * 100))}%` }}
                          />
                          <div 
                            className={cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-4.5 bg-background border-2 rounded-full shadow-md transition-all duration-300 z-10", activeTimeTheme.border)}
                            style={{ left: `${Math.min(100, Math.max(0, ((Math.min(60, travelTime) - 5) / 55) * 100))}%` }}
                          />
                          
                          <div className="absolute top-4 w-full flex justify-between px-0">
                            {[5, 15, 30, 45, 60].map(m => (
                              <span 
                                key={m} 
                                className={cn(
                                  "text-[10px] font-bold transition-colors cursor-pointer", 
                                  travelTime === m 
                                    ? `${activeTimeTheme.text} font-black scale-105` 
                                    : "text-muted-foreground/60"
                                )}
                                onClick={() => onTimeChange(m)}
                              >
                                {m}
                              </span>
                            ))}
                            <span className="text-[10px] font-bold text-muted-foreground/60">min</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Sección 4: Capas y análisis */}
        <div className="space-y-4 pt-4 border-t">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => toggleSection("capas")}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                      {analysisMode === "explore" ? 4 : 3}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground group-hover:underline">
                        Capas y análisis
                      </span>
                      <Badge variant="neutral" appearance="outline" className="text-[9px] font-mono uppercase px-2 py-0.5 border-primary/30 text-primary bg-primary/5 font-bold">
                        Opcional
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {openSections.includes("capas") ? (
                      <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
                    )}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent variant="primary" side="right" sideOffset={8} className="text-xs font-bold">
                {openSections.includes("capas") ? "Colapsar capas y análisis" : "Desplegar capas y análisis"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {openSections.includes("capas") && (
            <div className="space-y-4 pt-1 animate-in slide-in-from-top-2 duration-200">
              {/* Banner informativo: Paso Opcional */}
              <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-2.5 text-left text-[11px] text-muted-foreground">
                <Info className="size-4 text-primary shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong className="text-primary font-bold">Paso Opcional: </strong>
                  {analysisMode === "explore" && "Activa las categorías que quieras visualizar dentro del área a la que puedes llegar en el tiempo seleccionado."}
                  {analysisMode === "route" && "Encuentra servicios cercanos durante tu recorrido."}
                  {analysisMode === "compare" && "Compara los servicios disponibles cerca de cada recorrido."}
                </p>
              </div>
              {/* Profile Specific Controls inside Advanced */}
              <div className="space-y-2 pt-1 animate-in fade-in duration-300">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {analysisMode === "explore" && "Puntos de interés (POIs)"}
                    {analysisMode === "route" && "Servicios cerca de tu recorrido"}
                    {analysisMode === "compare" && "Servicios cerca de las rutas"}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("hospitals") ? "border-danger/50 bg-danger/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("hospitals") ? "bg-danger/20 text-danger" : "bg-muted text-muted-foreground")}>
                          <HeartPulse className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Hospitales / Salud</span>
                          {lastQueryTime !== null && activeServices.includes("hospitals") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("hospitals") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("hospitals")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("hospitals")}
                        onCheckedChange={() => toggleService("hospitals")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("schools") ? "border-primary/50 bg-primary/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("schools") ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                          <GraduationCap className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Colegios / Educación</span>
                          {lastQueryTime !== null && activeServices.includes("schools") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("schools") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("schools")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("schools")}
                        onCheckedChange={() => toggleService("schools")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("stores") || activeServices.includes("shopping") ? "border-warning/50 bg-warning/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("stores") || activeServices.includes("shopping") ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground")}>
                          <Store className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Tiendas / Comercio</span>
                          {lastQueryTime !== null && (activeServices.includes("stores") || activeServices.includes("shopping")) && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount(["stores", "shopping"]) === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount(["stores", "shopping"])} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("stores") || activeServices.includes("shopping")}
                        onCheckedChange={() => {
                          toggleService("stores");
                          toggleService("shopping");
                        }}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("pharmacies") ? "border-info/50 bg-info/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("pharmacies") ? "bg-info/20 text-info" : "bg-muted text-muted-foreground")}>
                          <Pill className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Droguerías / Farmacias</span>
                          {lastQueryTime !== null && activeServices.includes("pharmacies") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("pharmacies") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("pharmacies")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("pharmacies")}
                        onCheckedChange={() => toggleService("pharmacies")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("food") ? "border-secondary/50 bg-secondary/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("food") ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground")}>
                          <Utensils className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Comida / Restaurantes</span>
                          {lastQueryTime !== null && activeServices.includes("food") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("food") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("food")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("food")}
                        onCheckedChange={() => toggleService("food")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("parks") ? "border-success/50 bg-success/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("parks") ? "bg-success/20 text-success" : "bg-muted text-muted-foreground")}>
                          <TreePine className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Parques / Ocio</span>
                          {lastQueryTime !== null && activeServices.includes("parks") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("parks") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("parks")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("parks")}
                        onCheckedChange={() => toggleService("parks")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("tm") ? "border-danger/50 bg-danger/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("tm") ? "bg-danger/20 text-danger" : "bg-muted text-muted-foreground")}>
                          <Train className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Estaciones TM</span>
                          {lastQueryTime !== null && activeServices.includes("tm") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("tm") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("tm")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("tm")}
                        onCheckedChange={() => toggleService("tm")}
                      />
                    </label>

                    <label className={cn("flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors", activeServices.includes("sitp") ? "border-primary/50 bg-primary/5" : "border-border/50 bg-background/50 hover:bg-surface/50")}>
                      <div className="flex items-center gap-2">
                        <div className={cn("p-1.5 rounded-md", activeServices.includes("sitp") ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
                          <Bus className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Paraderos SITP</span>
                          {lastQueryTime !== null && activeServices.includes("sitp") && (
                            <span className={cn("text-[9px] font-bold leading-none mt-0.5", getPoiCount("sitp") === 0 ? "text-warning" : "text-muted-foreground")}>
                              {getPoiCount("sitp")} resultados
                            </span>
                          )}
                        </div>
                      </div>
                      <Checkbox 
                        checked={activeServices.includes("sitp")}
                        onCheckedChange={() => toggleService("sitp")}
                      />
                    </label>
                  </div>
                </div>
              {profile === "profesional" && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-300">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Capas de Negocio</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant={activeServices.includes("density") ? "warning" : "neutral"} 
                      size="sm" 
                      leftIcon={<Activity className="size-3" />}
                      onClick={() => toggleService("density")}
                    >
                      Densidad
                    </Button>
                    <Button 
                      variant={activeServices.includes("comp") ? "warning" : "neutral"} 
                      size="sm" 
                      leftIcon={<Target className="size-3" />}
                      onClick={() => toggleService("comp")}
                    >
                      Competencia
                    </Button>
                  </div>
                </div>
              )}

              {profile === "tecnico" && (
                <div className="space-y-3 pt-1 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Configuración GIS Avanzada</h4>
                    <Badge variant="info" appearance="soft" className="text-[9px] font-bold">Modo Técnico</Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Radio Límite (m) */}
                    <div className="p-2.5 rounded-xl bg-surface/50 border border-border/50 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor="limit" className="text-xs font-bold text-foreground cursor-pointer">Radio Máximo (m)</label>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-info" >
                                  <Trash2 className="size-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent variant="info" side="top" sideOffset={6} className="text-xs font-medium max-w-xs leading-relaxed">
                                Distancia tope en metros que delimita la cobertura máxima del análisis desde el punto de origen.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <input 
                          type="number" 
                          id="limit"
                          defaultValue={1200}
                          className="w-16 h-7 text-right px-2 rounded-md bg-background border border-border text-xs font-bold text-info focus:outline-none focus:ring-1 focus:ring-info"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Límite físico de alcance en metros.</p>
                    </div>

                    {/* Separación de Malla (m) */}
                    <div className="p-2.5 rounded-xl bg-surface/50 border border-border/50 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <label htmlFor="sep" className="text-xs font-bold text-foreground cursor-pointer">Resolución de Malla (m)</label>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon-xs" className="text-muted-foreground hover:text-info" >
                                  <Trash2 className="size-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent variant="info" side="top" sideOffset={6} className="text-xs font-medium max-w-xs leading-relaxed">
                                Precisión de los vértices del polígono en metros. Valores más bajos aumentan el detalle topológico.
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <input 
                          type="number" 
                          id="sep"
                          defaultValue={50}
                          className="w-16 h-7 text-right px-2 rounded-md bg-background border border-border text-xs font-bold text-info focus:outline-none focus:ring-1 focus:ring-info"
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground">Distancia entre nodos de cálculo.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Mensaje de estado desactualizado */}
        {isOutdated && (lastQueryTime !== null) && (
          <div className="p-3 mt-2 rounded-xl border border-warning/30 bg-warning/10 flex items-start gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
            <AlertTriangle className="size-4.5 text-warning shrink-0 mt-0.5" />
            <div className="space-y-1 text-[11px] text-foreground">
              <strong className="text-warning font-bold flex block">
                {outdatedReason === "mode" && "Cambiaste el modo de análisis"}
                {outdatedReason === "location" && "Has cambiado una ubicación"}
                {outdatedReason === "transport" && "Cambiaste el medio de transporte"}
                {outdatedReason === "time" && "Cambiaste el tiempo de viaje"}
              </strong>
              <p className="text-muted-foreground leading-snug">
                {outdatedReason === "mode" && "Actualiza el análisis para ver el nuevo modo."}
                {outdatedReason === "location" && "Genera nuevamente el análisis para actualizar el área de alcance."}
                {outdatedReason === "transport" && "Actualiza el análisis para ver el nuevo alcance."}
                {outdatedReason === "time" && "Actualiza el análisis para calcular la nueva zona de alcance."}
              </p>
            </div>
          </div>
        )}

        {/* Secciones Adicionales (Profesional y Técnico) */}
        {(profile === "profesional" || profile === "tecnico") && hasGenerated && (
          <>
            <Separator className="bg-border/50" />
            
            {/* Sección 5: Administrador de Capas */}
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => toggleSection("capasVisibles")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                          5
                        </span>
                        <span className="text-sm font-bold text-foreground group-hover:underline">
                          {profile === "tecnico" ? "Gestor avanzado de capas" : "Capas visibles"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {openSections.includes("capasVisibles") ? (
                          <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
                        ) : (
                          <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent variant="primary" side="right" sideOffset={8} className="text-xs font-bold">
                    {openSections.includes("capasVisibles") ? "Ocultar capas" : "Mostrar capas"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {openSections.includes("capasVisibles") && (
                <div className="space-y-3 pt-1 animate-in slide-in-from-top-2 duration-200">
                  {profile === "tecnico" ? (
                    <div className="p-3 rounded-xl bg-surface/50 border border-border text-sm space-y-3 divide-y divide-border/50">
                      {/* Advanced Layers List */}
                      <div className="space-y-2">
                        <span className="font-bold text-xs text-primary mb-2 block">Polígonos Isócronos</span>
                        {/* Layer Item 1 */}
                        <div className="flex flex-col gap-2 p-2 rounded-lg bg-background border border-border/80 group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col gap-0.5 cursor-grab opacity-40 hover:opacity-100 p-1">
                                <span className="size-1 rounded-full bg-foreground" />
                                <span className="size-1 rounded-full bg-foreground" />
                                <span className="size-1 rounded-full bg-foreground" />
                              </div>
                              <span className="text-xs font-bold">Isócrona {travelTime} min</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-sm bg-primary border border-primary/50 cursor-pointer" title="Cambiar color" />
                              <Switch defaultChecked className="scale-75" />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-6">
                            <span className="text-[9px] text-muted-foreground">Opacidad:</span>
                            <input type="range" min="0" max="100" defaultValue="80" className="flex-1 h-1 bg-border rounded-lg appearance-none cursor-pointer" />
                            <span className="text-[9px] font-mono w-6 text-right text-muted-foreground">80%</span>
                          </div>
                        </div>

                        {/* Layer Item 2 (if multiple intervals) */}
                        {technicalIntervals && technicalIntervals.map((interval, idx) => (
                          <div key={idx} className="flex flex-col gap-2 p-2 rounded-lg bg-background border border-border/80 group mt-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-0.5 cursor-grab opacity-40 hover:opacity-100 p-1">
                                  <span className="size-1 rounded-full bg-foreground" />
                                  <span className="size-1 rounded-full bg-foreground" />
                                  <span className="size-1 rounded-full bg-foreground" />
                                </div>
                                <span className="text-xs font-bold">Isócrona {interval} min</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={cn("size-3.5 rounded-sm border cursor-pointer", idx === 0 ? "bg-success border-success/50" : idx === 1 ? "bg-warning border-warning/50" : "bg-danger border-danger/50")} title="Cambiar color" />
                                <Switch defaultChecked className="scale-75" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pl-6">
                              <span className="text-[9px] text-muted-foreground">Opacidad:</span>
                              <input type="range" min="0" max="100" defaultValue="60" className="flex-1 h-1 bg-border rounded-lg appearance-none cursor-pointer" />
                              <span className="text-[9px] font-mono w-6 text-right text-muted-foreground">60%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {activeServices.length > 0 && (
                        <div className="space-y-2 pt-3">
                          <span className="font-bold text-xs text-primary mb-2 block">Capas de Puntos (POIs)</span>
                          {activeServices.map(s => (
                            <div key={s} className="flex flex-col gap-1 p-2 rounded-lg bg-background border border-border/80">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col gap-0.5 cursor-grab opacity-40 hover:opacity-100 p-1">
                                    <span className="size-1 rounded-full bg-foreground" />
                                    <span className="size-1 rounded-full bg-foreground" />
                                    <span className="size-1 rounded-full bg-foreground" />
                                  </div>
                                  <span className="text-[11px] font-bold capitalize">
                                    {s === "hospitals" ? "Salud" : 
                                     s === "schools" ? "Educación" : 
                                     s === "stores" ? "Comercio" : s}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch defaultChecked className="scale-75" />
                                </div>
                              </div>
                              {/* Subcategorías mock para perfil técnico */}
                              {(s === "hospitals" || s === "schools" || s === "stores") && (
                                <div className="pl-6 pr-2 py-1 space-y-1.5 border-l-2 border-border/30 ml-2 mt-1">
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>{s === "hospitals" ? "Hospitales Nivel III" : s === "schools" ? "Colegios Públicos" : "Centros Comerciales"}</span>
                                    <Checkbox defaultChecked className="size-3" />
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>{s === "hospitals" ? "Clínicas" : s === "schools" ? "Colegios Privados" : "Supermercados"}</span>
                                    <Checkbox defaultChecked className="size-3" />
                                  </div>
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>{s === "hospitals" ? "Centros de Salud" : s === "schools" ? "Universidades" : "Tiendas de Barrio"}</span>
                                    <Checkbox defaultChecked className="size-3" />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-surface/50 border border-border text-sm space-y-3">
                      {/* Isocronas */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">Capa: Isócrona ({travelTime} min)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="pl-4 space-y-2 border-l-2 border-border/50">
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>0 - 5 min (Alta)</span>
                            <Switch defaultChecked className="scale-75" />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>5 - 15 min (Media)</span>
                            <Switch defaultChecked className="scale-75" />
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>15 - 30 min (Baja)</span>
                            <Switch defaultChecked className="scale-75" />
                          </div>
                        </div>
                      </div>
                      {/* POIs */}
                      {activeServices.length > 0 && (
                        <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                          <span className="font-bold text-xs">Puntos de Interés</span>
                          {activeServices.map(s => (
                            <div key={s} className="flex items-center justify-between pl-4 text-[11px] text-muted-foreground">
                              <span>{s}</span>
                              <Switch defaultChecked className="scale-75" />
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Slider Opacidad */}
                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold">Opacidad general</span>
                          <span className="text-[10px] text-muted-foreground">80%</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="80" className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator className="bg-border/50" />
            
            {/* Sección 6: Resultados */}
            <div className="space-y-4">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => toggleSection("resultadosPanel")}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center size-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                          6
                        </span>
                        <span className="text-sm font-bold text-foreground group-hover:underline">
                          Resultados y Análisis
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {openSections.includes("resultadosPanel") ? (
                          <ChevronUp className="size-4 text-muted-foreground mt-0.5" />
                        ) : (
                          <ChevronDown className="size-4 text-muted-foreground mt-0.5" />
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent variant="primary" side="right" sideOffset={8} className="text-xs font-bold">
                    {openSections.includes("resultadosPanel") ? "Ocultar resultados" : "Ver resultados"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {openSections.includes("resultadosPanel") && (
                <div className="space-y-3 pt-1 animate-in slide-in-from-top-2 duration-200">
                  {analysisMode === "compare" ? (
                    <div className="p-3 rounded-xl bg-info/10 border border-info/30 space-y-2">
                      <h4 className="text-xs font-bold text-info flex items-center gap-2">
                        <Scale className="size-4" /> Comparación Profesional
                      </h4>
                      <div className="text-[11px] text-foreground space-y-1">
                        <p><strong>Ubicación A:</strong> 15,200 personas, 45 POIs.</p>
                        <p><strong>Ubicación B:</strong> 12,500 personas, 38 POIs.</p>
                        <div className="pt-2 border-t border-info/20 mt-2">
                          <p className="font-bold">Ganador: Ubicación A</p>
                          <p className="text-muted-foreground text-[10px]">Mayor cobertura demográfica en el mismo tiempo.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-success/10 border border-success/30 space-y-2">
                      <h4 className="text-xs font-bold text-success flex items-center gap-2">
                        <Activity className="size-4" /> Métricas del Área
                      </h4>
                      <div className="text-[11px] text-foreground space-y-1">
                        <p><strong>Área cubierta:</strong> 3.4 km²</p>
                        <p><strong>Población estimada:</strong> 15,200 hab.</p>
                        <p><strong>Tiempo promedio:</strong> {Math.round(travelTime * 0.8)} min a POIs cercanos.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Separator className="bg-border/50" />
          </>
        )}

        {/* Botones de acción respetando el UI Kit con Tooltips */}
        <TooltipProvider delayDuration={100}>
          <div className="space-y-3 pt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isOutdated ? "warning" : ((lastQueryTime !== null) ? "neutral" : "primary")}
                  size="lg"
                  onClick={onGenerate}
                  disabled={
                    isGenerating || 
                    ((lastQueryTime !== null) && !isOutdated) ||
                    (analysisMode === "explore" && !origin) ||
                    (analysisMode === "route" && (!origin || !destination)) ||
                    (analysisMode === "compare" && (!origin || !originB || !destination)) ||
                    !transportMode
                  }
                  className={cn(
                    "w-full transition-all duration-300",
                    (lastQueryTime !== null) && !isOutdated && "bg-success/10 text-success border-success/30 opacity-100 font-bold"
                  )}
                  leftIcon={
                    (lastQueryTime !== null) && !isOutdated ? <CheckCircle2 className="size-4" /> : undefined
                  }
                  rightIcon={
                    isGenerating ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : ((lastQueryTime !== null) && !isOutdated ? undefined : (
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ))
                  }
                >
                  {isGenerating ? (
                    "PROCESANDO..."
                  ) : (lastQueryTime !== null) && !isOutdated ? (
                    "Análisis actualizado"
                  ) : isOutdated ? (
                    "Actualizar análisis"
                  ) : (
                    <>
                      {analysisMode === "explore" && "Generar área de alcance"}
                      {analysisMode === "route" && "Calcular tiempo y ruta"}
                      {analysisMode === "compare" && "Comparar coberturas"}
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent variant={isOutdated ? "warning" : "primary"} side="right" sideOffset={8} className="text-xs font-bold">
                {isOutdated ? "Haz clic para actualizar la isócrona con los nuevos cambios" : ((lastQueryTime !== null) ? "El mapa muestra la versión más reciente" : "Calcular análisis de accesibilidad con los parámetros seleccionados")}
              </TooltipContent>
            </Tooltip>

            {/* Botón de exportación visible tras generar la isócrona */}
            {lastQueryTime !== null && onOpenExport && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="neutral"
                    size="lg"
                    onClick={onOpenExport}
                    className="w-full border-primary/40 text-primary bg-primary/5 hover:bg-primary/10 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300 font-bold"
                    leftIcon={<Download className="size-4 text-primary" />}
                  >
                    Exportar reporte multiformato
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="primary" side="right" sideOffset={8} className="text-xs font-bold">
                  Descargar informe multiformato de la isócrona calculada
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="neutral"
                  size="lg"
                  onClick={() => {
                    onReset();
                  }}
                  leftIcon={
                    <svg className="size-4 fill-none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                >
                  Limpiar mapa
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="neutral" side="right" sideOffset={8} className="text-xs font-bold">
                Restablecer todos los parámetros y remover capas del mapa
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
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

      {/* Modal de Confirmación para Reemplazar o Eliminar Ubicación */}
      <Dialog open={confirmAction !== null} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className="sm:max-w-md border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl p-6">
          <DialogHeader className="text-center space-y-2 border-b border-border/40 pb-4">
            <DialogTitle className="text-lg font-heading font-bold text-foreground">
              {confirmAction?.type === "replace" ? "¿Reemplazar ubicación?" : "¿Eliminar ubicación?"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {confirmAction?.type === "replace"
                ? `¿Deseas activar el modo de búsqueda para seleccionar una nueva dirección y reemplazar la Ubicación ${confirmAction?.target}?`
                : `¿Estás seguro de que deseas eliminar la Ubicación ${confirmAction?.target} del análisis?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2.5 border-t border-border/40 pt-4 w-full">
            <Button
              variant={confirmAction?.type === "delete" ? "danger" : "secondary"}
              size="lg"
              className="w-full font-bold shadow-md"
              onClick={() => {
                if (confirmAction?.type === "replace") {
                  setActiveInput(confirmAction.target);
                } else if (confirmAction?.type === "delete") {
                  if (confirmAction.target === "A") onOriginChange("");
                  else onDestinationChange("");
                }
                setConfirmAction(null);
              }}
            >
              {confirmAction?.type === "replace" ? "Sí, reemplazar" : "Sí, eliminar"}
            </Button>
            <Button 
              variant="neutral" 
              size="lg" 
              className="w-full font-bold"
              onClick={() => setConfirmAction(null)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
