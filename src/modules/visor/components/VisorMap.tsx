"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Minus, 
  Layers, 
  LocateFixed, 
  MapPin, 
  Navigation,
  HeartPulse,
  GraduationCap,
  Store,
  Pill,
  Utensils,
  TreePine,
  Train,
  Bus,
  Hospital,
  Sun,
  Moon,
  Globe,
  Target,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    L: any;
  }
}

interface VisorMapProps {
  transportMode: string;
  travelTime: number;
  origin: string;
  destination: string;
  activeServices: string[];
  isEmergency?: boolean;
  onLocateClick?: () => void;
  hasGenerated?: boolean;
  onMapClick?: (address: string) => void;
}

const MOCK_POIS = [
  // Hospitales / Salud (Carmesí / HeartPulse icon como foto de referencia)
  { id: "h1", type: "hospitals", name: "Hospital San Ignacio", dx: -120, dy: -80, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h2", type: "hospitals", name: "Clínica Marly", dx: 80, dy: -140, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h3", type: "hospitals", name: "Centro de Salud La Candelaria", dx: -40, dy: 110, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h4", type: "hospitals", name: "Hospital Santa Clara", dx: 160, dy: 90, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h5", type: "hospitals", name: "Clínica del Country (Sede)", dx: -180, dy: 60, icon: HeartPulse, color: "bg-[#e11d48]" },
  { id: "h6", type: "hospitals", name: "Centro Médico Teusaquillo", dx: 140, dy: -60, icon: HeartPulse, color: "bg-[#e11d48]" },

  // Colegios / Educación (Indigo / GraduationCap icon)
  { id: "e1", type: "schools", name: "Colegio Mayor de San Bartolomé", dx: -90, dy: 40, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e2", type: "schools", name: "Universidad de los Andes", dx: 110, dy: -110, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e3", type: "schools", name: "Universidad del Rosario", dx: -30, dy: -70, icon: GraduationCap, color: "bg-[#6366f1]" },
  { id: "e4", type: "schools", name: "Colegio Manuela Beltrán", dx: 180, dy: 130, icon: GraduationCap, color: "bg-[#6366f1]" },

  // Tiendas / Comercio (Carmesí / Store icon)
  { id: "s1", type: "stores", name: "Éxito Calle 53", dx: -150, dy: -130, icon: Store, color: "bg-[#e11d48]" },
  { id: "s2", type: "stores", name: "Centro Comercial Santafé", dx: 60, dy: 60, icon: Store, color: "bg-[#e11d48]" },
  { id: "s3", type: "stores", name: "Supermercado Carulla", dx: -60, dy: -30, icon: Store, color: "bg-[#e11d48]" },
  { id: "s4", type: "stores", name: "Plaza de Mercado Paloquemao", dx: 130, dy: 160, icon: Store, color: "bg-[#e11d48]" },

  // Droguerías / Farmacias (Teal / Pill icon)
  { id: "p1", type: "pharmacies", name: "Droguería Cruz Verde", dx: -70, dy: -120, icon: Pill, color: "bg-[#0284c7]" },
  { id: "p2", type: "pharmacies", name: "Farmatodo Septima", dx: 40, dy: -50, icon: Pill, color: "bg-[#0284c7]" },
  { id: "p3", type: "pharmacies", name: "Droguerías La Rebaja", dx: 90, dy: 80, icon: Pill, color: "bg-[#0284c7]" },

  // Comida / Restaurantes (Orange / Utensils icon)
  { id: "f1", type: "food", name: "Restaurante Andrés DC", dx: 30, dy: -150, icon: Utensils, color: "bg-[#ea580c]" },
  { id: "f2", type: "food", name: "Café Pasaje", dx: -110, dy: 20, icon: Utensils, color: "bg-[#ea580c]" },
  { id: "f3", type: "food", name: "Crepes & Waffles Centro", dx: -10, dy: 80, icon: Utensils, color: "bg-[#ea580c]" },

  // Parques (Green / TreePine icon)
  { id: "pk1", type: "parks", name: "Parque de la Independencia", dx: -130, dy: -50, icon: TreePine, color: "bg-[#10b981]" },
  { id: "pk2", type: "parks", name: "Parque Tercer Milenio", dx: 120, dy: 120, icon: TreePine, color: "bg-[#10b981]" },

  // TM (Red / Train icon)
  { id: "tm1", type: "tm", name: "Estación Museo del Oro", dx: -20, dy: -90, icon: Train, color: "bg-[#ef4444]" },
  { id: "tm2", type: "tm", name: "Estación San Victorino", dx: 70, dy: 40, icon: Train, color: "bg-[#ef4444]" },

  // SITP (Blue / Bus icon)
  { id: "st1", type: "sitp", name: "Paradero Cra 7 Cl 19", dx: 50, dy: -80, icon: Bus, color: "bg-[#3b82f6]" },
  { id: "st2", type: "sitp", name: "Paradero Av Jiménez", dx: -80, dy: 10, icon: Bus, color: "bg-[#3b82f6]" },
];

export function VisorMap({ 
  transportMode, 
  travelTime, 
  origin, 
  destination, 
  activeServices,
  isEmergency,
  onLocateClick,
  hasGenerated = false,
  onMapClick
}: VisorMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayersRef = useRef<any>({});

  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapMode, setMapMode] = useState<"dark" | "light" | "satellite">("dark");
  const [showMapGallery, setShowMapGallery] = useState(false);
  const [markerPos, setMarkerPos] = useState({ x: 600, y: 400 });
  const [markerDestPos, setMarkerDestPos] = useState({ x: 800, y: 320 });

  const [pinOffset, setPinOffset] = useState({ x: 0, y: 0 });
  const [isDraggingPin, setIsDraggingPin] = useState(false);
  const [pinDragStart, setPinDragStart] = useState({ x: 0, y: 0 });

  const [destPinOffset, setDestPinOffset] = useState({ x: 0, y: 0 });
  const [isDraggingDestPin, setIsDraggingDestPin] = useState(false);
  const [destPinDragStart, setDestPinDragStart] = useState({ x: 0, y: 0 });

  const [showIsochroneLayer, setShowIsochroneLayer] = useState(true);

  const handlePinMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingPin(true);
    setPinDragStart({ x: e.clientX - pinOffset.x, y: e.clientY - pinOffset.y });
  };

  const handleDestPinMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingDestPin(true);
    setDestPinDragStart({ x: e.clientX - destPinOffset.x, y: e.clientY - destPinOffset.y });
  };

  // Carga e inicialización de Leaflet con los mapas de CartoDB y Esri
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      if (!mapContainerRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      try {
        const map = L.map(mapContainerRef.current, {
          center: [4.5981, -74.0760],
          zoom: 13,
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
        });

        const tileLayers = {
          dark: L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
            subdomains: "abcd",
          }),
          light: L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
            subdomains: "abcd",
          }),
          satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
            maxZoom: 18,
          }),
        };

        tileLayers.dark.addTo(map);
        mapInstanceRef.current = map;
        tileLayersRef.current = tileLayers;
      } catch (err) {
        console.warn("Leaflet init fallback:", err);
      }
    };

    if (!window.L && !document.getElementById("leaflet-js")) {
      const script = document.createElement("script");
      script.id = "leaflet-js";
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else if (window.L) {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Cambio dinámico de capas de mapa
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayersRef.current) return;
    const map = mapInstanceRef.current;
    const layers = tileLayersRef.current;

    Object.values(layers).forEach((layer: any) => {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    if (layers[mapMode]) {
      layers[mapMode].addTo(map);
    }
  }, [mapMode]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2.5, prev + 0.15));
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.6, prev - 0.15));
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const zoomFactor = 0.08;
    setZoom((prev) => {
      const delta = e.deltaY < 0 ? zoomFactor : -zoomFactor;
      return Math.max(0.5, Math.min(3.0, prev + delta));
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest(".pointer-events-auto")) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingPin) {
      setPinOffset({
        x: e.clientX - pinDragStart.x,
        y: e.clientY - pinDragStart.y,
      });
      return;
    }
    if (isDraggingDestPin) {
      setDestPinOffset({
        x: e.clientX - destPinDragStart.x,
        y: e.clientY - destPinDragStart.y,
      });
      return;
    }
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingPin) {
      setIsDraggingPin(false);
      onMapClick?.("Cra. 7 con Calle 26 (Reubicado)");
      return;
    }
    if (isDraggingDestPin) {
      setIsDraggingDestPin(false);
      onMapClick?.("Centro Comercial Gran Estación (Destino Reubicado)");
      return;
    }
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const getIsochroneStyle = (time: number) => {
    if (time <= 5) return { fill: "fill-isochrone-5min/20", stroke: "stroke-isochrone-5min" };
    if (time <= 10) return { fill: "fill-isochrone-10min/20", stroke: "stroke-isochrone-10min" };
    if (time <= 15) return { fill: "fill-isochrone-15min/20", stroke: "stroke-isochrone-15min" };
    if (time <= 30) return { fill: "fill-isochrone-30min/20", stroke: "stroke-isochrone-30min" };
    return { fill: "fill-isochrone-maxmin/20", stroke: "stroke-isochrone-maxmin" };
  };
  const getTransportFactor = (mode: string) => {
    switch (mode) {
      case "walk": return 0.65;
      case "bike": return 1.0;
      case "transit": return 1.2;
      case "car": return 1.6;
      case "motorcycle": return 1.7;
      default: return 1.0;
    }
  };

  const transportFactor = getTransportFactor(transportMode);
  const maxSize = (travelTime / 30) * 550 * transportFactor;

  const angles = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  const factors = [0.85, 0.65, 0.95, 1.1, 0.75, 0.55, 0.8, 1.05, 0.9, 0.7, 1.0, 1.15, 0.8, 0.6, 0.9, 1.0];
  
  const R1 = factors.map(f => 75 * f);
  const R2 = factors.map(f => 150 * f);
  const R3 = factors.map(f => 225 * f);
  const R4 = factors.map(f => 300 * f);
  const R5 = factors.map(f => 450 * f);

  const getRingPath = (outerRadii: number[], innerRadii?: number[]) => {
    const outerPoints = outerRadii.map((r, idx) => {
      const angle = (idx * 360) / 16;
      const rad = (angle * Math.PI) / 180;
      const x = 500 + r * Math.cos(rad);
      const y = 500 + r * Math.sin(rad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    
    let path = `M ${outerPoints.join(" L ")} Z`;
    
    if (innerRadii) {
      const innerPoints = innerRadii.map((r, idx) => {
        const angle = (idx * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x = 500 + r * Math.cos(rad);
        const y = 500 + r * Math.sin(rad);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).reverse();
      path += ` M ${innerPoints.join(" L ")} Z`;
    }
    
    return path;
  };

  const path1 = getRingPath(R1);
  const path2 = getRingPath(R2, R1);
  const path3 = getRingPath(R3, R2);
  const path4 = getRingPath(R4, R3);
  const path5 = getRingPath(R5, R4);

  return (
    <div 
      className={cn(
        "absolute inset-0 overflow-hidden select-none cursor-grab active:cursor-grabbing transition-colors duration-500",
        mapMode === "dark" && "bg-[#0f172a]",
        mapMode === "light" && "bg-[#f8fafc]",
        mapMode === "satellite" && "bg-[#061810]"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
      onWheel={handleWheel}
    >
      {/* Contenedor Unificado de Capas y Pines Geográficos con Pan y Zoom */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transformOrigin: "center center"
        }}
      >
        {/* Fondo del Mapa */}
        <div 
          ref={mapContainerRef} 
          className="absolute inset-0 z-0 w-full h-full bg-cover bg-center transition-all duration-300 pointer-events-auto"
          style={{
            backgroundImage: mapMode === "light" ? "url('/Isocronas/bogota_map.png')" : "url('/Isocronas/bogota_map_dark.png')",
            filter: mapMode === "satellite" ? "contrast(1.2) brightness(0.85) saturate(1.4)" : "none",
          }}
        />

        {/* Capa de Polígonos e Isócronas por encima de Leaflet (solo tras generar) */}
        {hasGenerated && showIsochroneLayer && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div 
              className="absolute top-1/2 left-1/2 flex items-center justify-center transition-all duration-300 ease-out"
              style={{ 
                width: `${maxSize}px`, 
                height: `${maxSize}px`,
                transform: `translate(calc(-50% + ${pinOffset.x}px), calc(-50% + ${pinOffset.y}px))`
              }}
            >
              <svg viewBox="0 0 1000 1000" className="w-full h-full drop-shadow-2xl pointer-events-none" fillRule="evenodd">
                {/* 5 Polígonos irregulares / Anillos concéntricos sin solapamientos con tooltips */}
                {(() => {
                  const T = travelTime;
                  const t1 = Math.round(T / 6);
                  const t2 = Math.round(T / 3);
                  const t3 = Math.round(T / 2);
                  const t4 = Math.round((T * 2) / 3);

                  const getTransportLabel = (mode: string) => {
                    switch (mode) {
                      case "walk": return "caminando";
                      case "bike": return "en bicicleta";
                      case "transit": return "en transporte público";
                      case "car": return "en carro";
                      case "motorcycle": return "en moto";
                      default: return "desplazándose";
                    }
                  };
                  const transportLabel = getTransportLabel(transportMode);

                  return (
                    <TooltipProvider delayDuration={50}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <path d={path1} className="fill-isochrone-5min pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-opacity-40" fillOpacity={0.3} />
                        </TooltipTrigger>
                        <TooltipContent variant="primary" className="text-xs font-bold p-2 bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                          Muy cercano: 0 a {t1} min {transportLabel} (Acceso excelente)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <path d={path2} className="fill-isochrone-10min pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-opacity-40" fillOpacity={0.3} />
                        </TooltipTrigger>
                        <TooltipContent variant="primary" className="text-xs font-bold p-2 bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                          Cercano: {t1} a {t2} min {transportLabel} (Acceso rápido)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <path d={path3} className="fill-isochrone-15min pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-opacity-40" fillOpacity={0.3} />
                        </TooltipTrigger>
                        <TooltipContent variant="primary" className="text-xs font-bold p-2 bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                          Estándar: {t2} a {t3} min {transportLabel} (Acceso moderado)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <path d={path4} className="fill-isochrone-30min pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-opacity-40" fillOpacity={0.3} />
                        </TooltipTrigger>
                        <TooltipContent variant="primary" className="text-xs font-bold p-2 bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                          Extendido: {t3} a {t4} min {transportLabel} (Límite sugerido)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <path d={path5} className="fill-isochrone-maxmin pointer-events-auto cursor-pointer transition-all duration-200 hover:fill-opacity-40" fillOpacity={0.3} />
                        </TooltipTrigger>
                        <TooltipContent variant="primary" className="text-xs font-bold p-2 bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                          Límite: {t4} a {T} min {transportLabel} (Alcance máximo)
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })()}

                {/* Contornos punteados de cada límite temporal */}
                <path d={getRingPath(R1)} fill="none" className="stroke-isochrone-5min stroke-[2] pointer-events-none" strokeDasharray="4 4" />
                <path d={getRingPath(R2)} fill="none" className="stroke-isochrone-10min stroke-[2] pointer-events-none" strokeDasharray="4 4" />
                <path d={getRingPath(R3)} fill="none" className="stroke-isochrone-15min stroke-[2] pointer-events-none" strokeDasharray="4 4" />
                <path d={getRingPath(R4)} fill="none" className="stroke-isochrone-30min stroke-[2] pointer-events-none" strokeDasharray="4 4" />
                <path d={getRingPath(R5)} fill="none" className="stroke-isochrone-maxmin stroke-[2] pointer-events-none" strokeDasharray="4 4" />

                {/* Líneas radiales punteadas compuestas por tramos coloreados */}
                {angles.map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const cos = Math.cos(rad);
                  const sin = Math.sin(rad);
                  
                  const p0 = { x: 500, y: 500 };
                  const p1 = { x: 500 + R1[i] * cos, y: 500 + R1[i] * sin };
                  const p2 = { x: 500 + R2[i] * cos, y: 500 + R2[i] * sin };
                  const p3 = { x: 500 + R3[i] * cos, y: 500 + R3[i] * sin };
                  const p4 = { x: 500 + R4[i] * cos, y: 500 + R4[i] * sin };
                  const p5 = { x: 500 + R5[i] * cos, y: 500 + R5[i] * sin };
                  
                  return (
                    <g key={i} className="pointer-events-none">
                      <line x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} className="stroke-isochrone-5min" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 6" />
                      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className="stroke-isochrone-10min" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 6" />
                      <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} className="stroke-isochrone-15min" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 6" />
                      <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} className="stroke-isochrone-30min" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 6" />
                      <line x1={p4.x} y1={p4.y} x2={p5.x} y2={p5.y} className="stroke-isochrone-maxmin" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 6" />
                    </g>
                  );
                })}

                {/* Marcador circular central de origen removido del SVG */}
              </svg>
            </div>
            {/* Marcador central premium independiente con escala corregida */}
            <div 
              className="absolute top-1/2 left-1/2 flex items-center justify-center pointer-events-none z-15"
              style={{
                transform: `translate(calc(-50% + ${pinOffset.x}px), calc(-50% + ${pinOffset.y}px)) scale(${1 / zoom})`
              }}
            >
              <div className="size-6.5 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center">
                <div className="size-4.5 rounded-full bg-white flex items-center justify-center shadow-md">
                  <div className="size-2 rounded-full bg-blue-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marcador Central de Origen (A) SIEMPRE VISIBLE */}
        <div 
          className="absolute top-1/2 left-1/2 flex flex-col items-center z-20 pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
          style={{
            transform: `translate(calc(-50% + ${pinOffset.x}px), calc(-50% + ${pinOffset.y}px)) scale(${1 / zoom})`
          }}
          onMouseDown={handlePinMouseDown}
        >
          {/* Label Permanente de Origen (A) con Badge UI Kit con relleno de color */}
          <Badge 
            variant="primary" 
            appearance="default"
            className="mb-1.5 shadow-2xl bg-primary text-primary-foreground text-[11px] font-bold py-1 px-3 flex items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in duration-300 border-none"
          >
            <MapPin className="size-3.5 shrink-0" />
            <span>Origen (A): {origin ? origin.replace(" (Reubicado)", "") : "Parque Central Simón Bolívar"}</span>
          </Badge>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={cn(
                    "p-2 rounded-full shadow-2xl border-none transition-all duration-300 hover:scale-125 group active:scale-95",
                    isDraggingPin && "ring-4 ring-primary/50 scale-125",
                    isEmergency ? "bg-danger text-white" : `bg-primary text-primary-foreground`
                  )}
                >
                  <MapPin className="size-4 animate-bounce" />
                </div>
              </TooltipTrigger>
              <TooltipContent variant="primary" side="bottom" sideOffset={6} className="text-xs font-bold">
                Toca o arrastra para mover
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Marcador de Destino (B) interactivo */}
        {destination && (
          <div 
            className="absolute top-1/2 left-1/2 flex flex-col items-center z-20 pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
            style={{
              transform: `translate(calc(140px + ${destPinOffset.x}px), calc(-90px + ${destPinOffset.y}px)) scale(${1 / zoom})`
            }}
            onMouseDown={handleDestPinMouseDown}
          >
            {/* Label Permanente de Destino (B) con Badge UI Kit con relleno de color */}
            <Badge 
              variant="warning" 
              appearance="default"
              className="mb-1.5 shadow-2xl bg-warning text-warning-foreground text-[11px] font-bold py-1 px-3 flex items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in duration-300 border-none"
            >
              <Target className="size-3.5 shrink-0" />
              <span>Destino (B): {destination.replace(" (Destino Reubicado)", "")}</span>
            </Badge>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "p-2 rounded-full shadow-2xl border-none transition-all duration-300 hover:scale-125 bg-warning text-warning-foreground group active:scale-95",
                      isDraggingDestPin && "ring-4 ring-warning/50 scale-125"
                    )}
                  >
                    <Target className="size-4 animate-bounce" />
                  </div>
                </TooltipTrigger>
                <TooltipContent variant="warning" side="bottom" sideOffset={6} className="text-xs font-bold">
                  Toca o arrastra para mover
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Renderizado de Puntos de Interés (POIs) con Tooltips del UI Kit */}
        {activeServices.length > 0 && (
          <TooltipProvider delayDuration={100}>
            <div className="absolute inset-0 pointer-events-none z-20">
              {MOCK_POIS.filter(poi => activeServices.includes(poi.type) || (poi.type === "stores" && activeServices.includes("shopping"))).map((poi) => {
                const PoiIcon = poi.icon;
                const D = Math.sqrt(poi.dx * poi.dx + poi.dy * poi.dy);
                const poiTime = Math.round(travelTime * (D / 450));

                const getTransportVerb = (mode: string) => {
                  switch (mode) {
                    case "walk": return "caminando";
                    case "bike": return "en bicicleta";
                    case "transit": return "en transporte público";
                    case "car": return "en carro";
                    case "motorcycle": return "en moto";
                    default: return "desplazándose";
                  }
                };
                const transportVerb = getTransportVerb(transportMode);

                const tooltipText = hasGenerated
                  ? poiTime <= travelTime
                    ? `${poi.name} — Llegas en ${poiTime} min ${transportVerb}`
                    : `${poi.name} — Fuera de alcance (a más de ${travelTime} min ${transportVerb})`
                  : poi.name;

                return (
                  <div
                    key={poi.id}
                    className="absolute flex items-center justify-center pointer-events-auto"
                    style={{
                      left: `${markerPos.x + poi.dx}px`,
                      top: `${markerPos.y + poi.dy}px`,
                      transform: `translate(-50%, -50%) scale(${1 / zoom})`
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className={cn(
                          "flex items-center justify-center size-7 sm:size-8 rounded-full border-2 border-white text-white shadow-xl transition-all duration-300 hover:scale-125 cursor-pointer",
                          poi.color
                        )}>
                          <PoiIcon className="size-3.5 sm:size-4 text-white drop-shadow" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent variant="primary" side="top" sideOffset={6} className="text-xs font-bold bg-card/95 backdrop-blur-xl border border-border shadow-md text-foreground">
                        {tooltipText}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          </TooltipProvider>
        )}
      </div>

      {/* Herramientas Flotantes del Mapa en la parte superior derecha (Controles UI Kit de alta visibilidad) */}
      <TooltipProvider delayDuration={100}>
        <div className="absolute right-6 top-6 flex flex-col gap-2.5 pointer-events-auto z-20">
          <div className="flex flex-col p-1 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl space-y-1">
            {/* Zoom In */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleZoomIn} 
                  variant="ghost" 
                  size="icon" 
                  className="size-9 rounded-xl hover:bg-primary/15 hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  <Plus className="size-4.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="info" side="left" sideOffset={10} className="text-xs font-bold">
                Acercar mapa
              </TooltipContent>
            </Tooltip>

            {/* Zoom Out */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={handleZoomOut} 
                  variant="ghost" 
                  size="icon" 
                  className="size-9 rounded-xl hover:bg-primary/15 hover:text-primary transition-all duration-200 cursor-pointer"
                >
                  <Minus className="size-4.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="info" side="left" sideOffset={10} className="text-xs font-bold">
                Alejar mapa
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Ubicación GPS */}
          <div className="p-1 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onLocateClick} 
                  variant="neutral" 
                  size="icon" 
                  className="size-9 rounded-xl hover:bg-primary/15 hover:text-primary transition-all duration-200 cursor-pointer border border-border/50"
                >
                  <LocateFixed className="size-4.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="info" side="left" sideOffset={10} className="text-xs font-bold">
                Mi ubicación GPS
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Galería de Mapas */}
          <div className="p-1 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={() => setShowMapGallery(!showMapGallery)} 
                  variant={showMapGallery ? "primary" : "neutral"} 
                  size="icon" 
                  className={cn(
                    "size-9 rounded-xl transition-all duration-200 cursor-pointer border border-border/50",
                    showMapGallery ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/15 hover:text-primary"
                  )}
                >
                  <Layers className="size-4.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent variant="primary" side="left" sideOffset={10} className="text-xs font-bold">
                Galería de Mapas (Claro, Oscuro, Satelital)
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Ocultar / Mostrar Capa Isócrona */}
          {hasGenerated && (
            <div className="p-1 rounded-2xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl animate-in zoom-in duration-200">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={() => setShowIsochroneLayer(!showIsochroneLayer)} 
                    variant={showIsochroneLayer ? "primary" : "neutral"} 
                    size="icon" 
                    className={cn(
                      "size-9 rounded-xl transition-all duration-200 cursor-pointer border border-border/50",
                      showIsochroneLayer ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {showIsochroneLayer ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="info" side="left" sideOffset={10} className="text-xs font-bold">
                  {showIsochroneLayer ? "Ocultar capa de isócrona" : "Mostrar capa de isócrona"}
                </TooltipContent>
              </Tooltip>
            </div>
          )}
        </div>
      </TooltipProvider>

      {/* Popover Galería de Mapas (3 modos: Claro, Oscuro, Satelital de CartoDB y Esri) */}
      {showMapGallery && (
        <div className="absolute right-20 top-6 z-50 w-80 p-4 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl space-y-3 animate-in fade-in slide-in-from-right-2 duration-200 pointer-events-auto text-left">
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Layers className="size-4 text-primary" />
              <span>Galería de Mapas</span>
            </div>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="neutral"
                    size="icon-xs"
                    onClick={() => setShowMapGallery(false)}
                    className="size-7 rounded-lg hover:bg-surface border border-border/60"
                    leftIcon={<X className="size-3.5" />}
                  />
                </TooltipTrigger>
                <TooltipContent variant="neutral" side="left" sideOffset={8} className="text-xs font-bold">
                  Cerrar galería
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              {
                id: "dark" as const,
                name: "Modo Oscuro",
                desc: "CartoDB Dark Matter (Alto contraste)",
                icon: Moon,
                bgClass: "bg-slate-900 border-slate-700 text-white"
              },
              {
                id: "light" as const,
                name: "Modo Claro",
                desc: "CartoDB Positron (Alta legibilidad)",
                icon: Sun,
                bgClass: "bg-slate-100 border-slate-300 text-slate-900"
              },
              {
                id: "satellite" as const,
                name: "Vista Satelital",
                desc: "Esri World Imagery (Imágenes aéreas)",
                icon: Globe,
                bgClass: "bg-emerald-950 border-emerald-800 text-emerald-100"
              }
            ].map((mode) => {
              const isSelected = mapMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setMapMode(mode.id);
                    setShowMapGallery(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer group relative",
                    isSelected
                      ? "border-primary bg-primary/10 ring-1 ring-primary/30 shadow-xs"
                      : "border-border/60 bg-surface/40 hover:bg-surface hover:border-border"
                  )}
                >
                  <div className={cn("size-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs transition-transform group-hover:scale-105", mode.bgClass)}>
                    <mode.icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-foreground flex items-center justify-between gap-1">
                      <span>{mode.name}</span>
                      {isSelected && (
                        <Badge variant="primary" appearance="soft" className="text-[9px] font-bold py-0.5 px-2">
                          Activo
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight truncate mt-0.5">
                      {mode.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
