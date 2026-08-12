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
  Bike,
  Car,
  Footprints,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
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
  originB?: string;
  destination: string;
  activeServices: string[];
  isEmergency?: boolean;
  onLocateClick?: () => void;
  hasGenerated?: boolean;
  onMapClick?: (address: string) => void;
  analysisMode?: string;
  isOutdated?: boolean;
}

import { MOCK_POIS, getTransportFactor, getTransportSpeed, getRoadNetworkRadius, isPoiInsideIsochrone } from "@/modules/visor/utils/geo";
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

const isPoiNearSegment = (
  poi: { dx: number; dy: number },
  start: { x: number; y: number },
  end: { x: number; y: number },
  threshold: number = 65
) => {
  const px = poi.dx;
  const py = poi.dy;
  const ax = start.x;
  const ay = start.y;
  const bx = end.x;
  const by = end.y;
  
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  
  const abLen2 = abx * abx + aby * aby;
  if (abLen2 === 0) return Math.sqrt(apx * apx + apy * apy) <= threshold;
  
  let t = (apx * abx + apy * aby) / abLen2;
  t = Math.max(0, Math.min(1, t));
  
  const projx = ax + t * abx;
  const projy = ay + t * aby;
  
  const dx = px - projx;
  const dy = py - projy;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
};

const isochroneColorClasses: Record<string, { fill: string; fillSub: string; stroke: string; strokeSub: string }> = {
  "isochrone-5min": {
    fill: "fill-isochrone-5min",
    fillSub: "fill-isochrone-5min/40",
    stroke: "stroke-isochrone-5min",
    strokeSub: "stroke-white/20"
  },
  "isochrone-10min": {
    fill: "fill-isochrone-10min",
    fillSub: "fill-isochrone-10min/40",
    stroke: "stroke-isochrone-10min",
    strokeSub: "stroke-white/20"
  },
  "isochrone-15min": {
    fill: "fill-isochrone-15min",
    fillSub: "fill-isochrone-15min/40",
    stroke: "stroke-isochrone-15min",
    strokeSub: "stroke-white/20"
  },
  "isochrone-30min": {
    fill: "fill-isochrone-30min",
    fillSub: "fill-isochrone-30min/40",
    stroke: "stroke-isochrone-30min",
    strokeSub: "stroke-white/20"
  },
  "isochrone-maxmin": {
    fill: "fill-isochrone-maxmin",
    fillSub: "fill-isochrone-maxmin/40",
    stroke: "stroke-isochrone-maxmin",
    strokeSub: "stroke-white/20"
  }
};

export function VisorMap({ 
  transportMode, 
  travelTime, 
  origin, 
  originB,
  destination, 
  activeServices,
  isEmergency,
  onLocateClick,
  hasGenerated = false,
  analysisMode = "explore",
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
  const [originBPinOffset, setOriginBPinOffset] = useState({ x: -140, y: 90 });
  const [isDraggingOriginBPin, setIsDraggingOriginBPin] = useState(false);
  const [originBPinDragStart, setOriginBPinDragStart] = useState({ x: 0, y: 0 });
  const [isDraggingDestPin, setIsDraggingDestPin] = useState(false);
  const [destPinDragStart, setDestPinDragStart] = useState({ x: 0, y: 0 });

  const [showIsochroneLayer, setShowIsochroneLayer] = useState(true);

  const handlePinMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingPin(true);
    setPinDragStart({ x: e.clientX - pinOffset.x, y: e.clientY - pinOffset.y });
  };

  const handleOriginBPinMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDraggingOriginBPin(true);
    setOriginBPinDragStart({ x: e.clientX - originBPinOffset.x, y: e.clientY - originBPinOffset.y });
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
    if (isDraggingOriginBPin) {
      setOriginBPinOffset({
        x: e.clientX - originBPinDragStart.x,
        y: e.clientY - originBPinDragStart.y
      });
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
    setIsDraggingOriginBPin(false);
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


  const transportFactor = getTransportFactor(transportMode);
  const maxSize = (travelTime / 30) * 550 * transportFactor;

  const angles = Array.from({ length: 64 }, (_, i) => (i * 360) / 64);
  const radialAngles = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
  
  const getRadiiForZone = (baseR: number) => {
    return angles.map(angle => getRoadNetworkRadius(angle, baseR));
  };
  
  const R1 = getRadiiForZone(75);
  const R2 = getRadiiForZone(150);
  const R3 = getRadiiForZone(225);
  const R4 = getRadiiForZone(300);
  const R5 = getRadiiForZone(450);

  const getRingPath = (outerRadii: number[], innerRadii?: number[]) => {
    const outerPoints = outerRadii.map((r, idx) => {
      const angle = (idx * 360) / 64;
      const rad = (angle * Math.PI) / 180;
      const x = 500 + r * Math.cos(rad);
      const y = 500 + r * Math.sin(rad);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    
    let path = `M ${outerPoints.join(" L ")} Z`;
    
    if (innerRadii) {
      const innerPoints = innerRadii.map((r, idx) => {
        const angle = (idx * 360) / 64;
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

  const [hoveredPoi, setHoveredPoi] = useState<string | null>(null);
  const [selectedPoi, setSelectedPoi] = useState<string | null>(null);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);

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
        {hasGenerated && showIsochroneLayer && analysisMode === "explore" && (
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
                
                {(() => {
                  const T = travelTime;
                  
                  // Helper function to render a ring
                  const renderRing = (timeLimit: number, pathData: string, ringClassBase: string) => {
                    const isPrincipal = timeLimit === T;
                    const isHovered = hoveredRing === timeLimit;
                    const isAnyRingHovered = hoveredRing !== null;

                    const colorData = isochroneColorClasses[ringClassBase] || {
                      fill: `fill-${ringClassBase}`,
                      fillSub: `fill-${ringClassBase}/40`,
                      stroke: `stroke-${ringClassBase}`,
                      strokeSub: "stroke-white/20"
                    };

                    let ringClass = isPrincipal ? colorData.fill : colorData.fillSub;
                    let strokeClass = isPrincipal ? colorData.stroke : colorData.strokeSub;
                    let opacity = isPrincipal ? 0.45 : 0.25;
                    let strokeWidth = isPrincipal ? 2 : 1;
                    let strokeDash = isPrincipal ? "none" : "4 4";
                    
                    if (isAnyRingHovered) {
                      if (isHovered) {
                        opacity = 0.7;
                        strokeWidth = 3.5;
                        strokeClass = colorData.stroke; // pure color
                        strokeDash = "none";
                      } else {
                        opacity = 0.1;
                        strokeWidth = 0.5;
                        strokeDash = "2 2";
                      }
                    }

                    return (
                      <TooltipProvider delayDuration={50} key={timeLimit}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <path 
                              d={pathData} 
                              className={`${ringClass} pointer-events-auto cursor-pointer transition-all duration-200`} 
                              fillOpacity={opacity} 
                              onMouseEnter={() => setHoveredRing(timeLimit)}
                              onMouseLeave={() => setHoveredRing(null)}
                            />
                          </TooltipTrigger>
                          <TooltipContent variant="neutral" className="text-xs font-bold p-2 z-50">
                            {timeLimit} minutos
                          </TooltipContent>
                        </Tooltip>
                        <path 
                          d={pathData} 
                          fill="none" 
                          className={`${strokeClass} pointer-events-none transition-all duration-200`} 
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDash} 
                        />
                      </TooltipProvider>
                    );
                  };

                  const ringConfigs = [];
                  if (T >= 5) ringConfigs.push({ limit: 5, path: path1, color: "isochrone-5min" });
                  if (T >= 10) ringConfigs.push({ limit: 10, path: path2, color: "isochrone-10min" });
                  if (T >= 15) ringConfigs.push({ limit: 15, path: path3, color: "isochrone-15min" });
                  if (T >= 30) ringConfigs.push({ limit: 30, path: path4, color: "isochrone-30min" });
                  if (T > 30) ringConfigs.push({ limit: T, path: path5, color: "isochrone-maxmin" });

                  // Sort to bring hovered ring to DOM rendering end (on top visual layer)
                  const sortedConfigs = [...ringConfigs];
                  if (hoveredRing !== null) {
                    sortedConfigs.sort((a, b) => {
                      if (a.limit === hoveredRing) return 1;
                      if (b.limit === hoveredRing) return -1;
                      return b.limit - a.limit; // largest first
                    });
                  } else {
                    sortedConfigs.sort((a, b) => b.limit - a.limit); // largest first
                  }

                  return sortedConfigs.map(config => renderRing(config.limit, config.path, config.color));
                })()}
                
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

        
        {/* Capa independiente para la Ruta (Solo modo Trayecto) */}
        {hasGenerated && analysisMode === "route" && destination && (
          <div 
            className="absolute top-1/2 left-1/2 z-15 pointer-events-none overflow-visible"
            style={{
              width: 0,
              height: 0
            }}
          >
            <svg className="overflow-visible absolute" style={{ top: 0, left: 0 }}>
              <defs>
                <filter id="glow-route" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Línea principal que conecta exactamente A y B */}
              <path 
                d={`M ${pinOffset.x} ${pinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                className="stroke-primary stroke-[5] drop-shadow-2xl opacity-90" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                filter="url(#glow-route)"
              />
              <path 
                d={`M ${pinOffset.x} ${pinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinejoin="round" 
                strokeLinecap="round" 
                className="opacity-80 animate-[dash_1s_linear_infinite]"
              />
            </svg>
          </div>
        )}

        {/* Capas de Ruta para el Modo Comparación (2 Rutas) */}
        {hasGenerated && analysisMode === "compare" && destination && originB && (
          <div 
            className="absolute top-1/2 left-1/2 z-15 pointer-events-none overflow-visible"
            style={{
              width: 0,
              height: 0
            }}
          >
            <svg className="overflow-visible absolute" style={{ top: 0, left: 0 }}>
              <defs>
                <filter id="glow-compare" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Ruta A (Azul: Origen A -> Destino) */}
              <path 
                d={`M ${pinOffset.x} ${pinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                className="stroke-primary stroke-[5] drop-shadow-2xl opacity-90" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                filter="url(#glow-compare)"
              />
              <path 
                d={`M ${pinOffset.x} ${pinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinejoin="round" 
                strokeLinecap="round" 
                className="opacity-80 animate-[dash_1s_linear_infinite]"
              />

              {/* Ruta B (Morada: Origen B -> Destino) */}
              <path 
                d={`M ${-140 + originBPinOffset.x} ${90 + originBPinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                className="stroke-info stroke-[5] drop-shadow-2xl opacity-90" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                filter="url(#glow-compare)"
              />
              <path 
                d={`M ${-140 + originBPinOffset.x} ${90 + originBPinOffset.y} L ${140 + destPinOffset.x} ${-90 + destPinOffset.y}`}
                fill="none" 
                stroke="white"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinejoin="round" 
                strokeLinecap="round" 
                className="opacity-80 animate-[dash_1s_linear_infinite]"
              />
            </svg>
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

        
        {/* Marcador de Origen B interactivo (Modo Compare) */}
        {analysisMode === "compare" && originB && (
          <div 
            className="absolute top-1/2 left-1/2 flex flex-col items-center z-20 pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
            style={{
              transform: `translate(calc(-140px + ${originBPinOffset.x}px), calc(90px + ${originBPinOffset.y}px)) scale(${1 / zoom})`
            }}
            onMouseDown={handleOriginBPinMouseDown}
          >
            <Badge 
              variant="secondary" 
              appearance="default"
              className="mb-1.5 shadow-2xl bg-purple-500 text-white text-[11px] font-bold py-1 px-3 flex items-center gap-1.5 pointer-events-none animate-in fade-in zoom-in duration-300 border-none"
            >
              <MapPin className="size-3.5 shrink-0" />
              <span>Origen (B): {originB.replace(" (Reubicado)", "")}</span>
            </Badge>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div 
                    className={cn(
                      "p-2 rounded-full shadow-2xl border-none transition-all duration-300 hover:scale-125 bg-purple-500 text-white group active:scale-95",
                      isDraggingOriginBPin && "ring-4 ring-purple-500/50 scale-125"
                    )}
                  >
                    <MapPin className="size-4 animate-bounce" />
                  </div>
                </TooltipTrigger>
                <TooltipContent variant="secondary" side="bottom" sideOffset={6} className="text-xs font-bold">
                  Toca o arrastra para mover
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}


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

        {/* Renderizado de Puntos de Interés (POIs) con Filtro Espacial y Hover Card Premium */}
        {hasGenerated && activeServices.length > 0 && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {MOCK_POIS.filter(poi => activeServices.includes(poi.type) || (poi.type === "stores" && activeServices.includes("shopping"))).map((poi) => {
              const PoiIcon = poi.icon;
              
              // 1. Consulta espacial según el modo de análisis
              if (analysisMode === "explore") {
                if (!isPoiInsideIsochrone(poi, travelTime, transportMode)) return null;
              } else if (analysisMode === "route") {
                if (!isPoiNearSegment(poi, { x: pinOffset.x, y: pinOffset.y }, { x: 140 + destPinOffset.x, y: -90 + destPinOffset.y })) return null;
              } else if (analysisMode === "compare") {
                const nearA = isPoiNearSegment(poi, { x: pinOffset.x, y: pinOffset.y }, { x: 140 + destPinOffset.x, y: -90 + destPinOffset.y });
                const nearB = isPoiNearSegment(poi, { x: -140 + originBPinOffset.x, y: 90 + originBPinOffset.y }, { x: 140 + destPinOffset.x, y: -90 + destPinOffset.y });
                if (!nearA && !nearB) return null;
              }
              
              // 2. Calcular el tiempo y la distancia personalizados
              const boundaryR = getRoadNetworkRadius(Math.atan2(poi.dy, poi.dx) * (180 / Math.PI) < 0 ? Math.atan2(poi.dy, poi.dx) * (180 / Math.PI) + 360 : Math.atan2(poi.dy, poi.dx) * (180 / Math.PI), 450);
              const D = Math.sqrt(poi.dx * poi.dx + poi.dy * poi.dy);
              
              // 4. Calcular el tiempo y la distancia personalizados
              const poiTime = Math.round(travelTime * (D / boundaryR));
              const speed = getTransportSpeed(transportMode);
              const distanceKm = (speed * poiTime) / 60;
              
              // 5. Detalles de dirección y categoría
              const getPoiDetails = (p: typeof MOCK_POIS[0]) => {
                switch (p.type) {
                  case "hospitals":
                    return {
                      category: "Hospital / Salud",
                      address: p.name.includes("San Ignacio") ? "Cra. 7 # 40-62, Bogotá" : "Av. Caracas # 1-15, Bogotá"
                    };
                  case "schools":
                    return {
                      category: "Colegio / Educación",
                      address: "Calle 9 # 1-10, Bogotá"
                    };
                  case "stores":
                    return {
                      category: "Comercio / Tienda",
                      address: "Av. Carrera 14 # 53-22, Bogotá"
                    };
                  case "pharmacies":
                    return {
                      category: "Droguería / Farmacia",
                      address: "Carrera 15 # 85-12, Bogotá"
                    };
                  case "food":
                    return {
                      category: "Restaurante / Comida",
                      address: "Calle 82 # 11-50, Bogotá"
                    };
                  case "parks":
                    return {
                      category: "Parque / Recreación",
                      address: "Calle 26 # 19B-30, Bogotá"
                    };
                  default:
                    return {
                      category: "Transporte Público",
                      address: "Av. Jiménez con Cra. 10, Bogotá"
                    };
                }
              };
              
              
              // Asignar color de la isócrona correspondiente si el modo es "explore"
              let poiColorClass = "bg-primary";
              let poiTextClass = "text-primary-foreground";
              if (analysisMode === "explore") {
                const subTime = travelTime * (D / boundaryR);
                if (subTime <= 5) {
                  poiColorClass = "bg-isochrone-5min"; // Color 5min
                } else if (subTime <= 10) {
                  poiColorClass = "bg-isochrone-10min"; // Color 10min
                } else if (subTime <= 15) {
                  poiColorClass = "bg-isochrone-15min"; // Color 15min
                } else {
                  poiColorClass = "bg-isochrone-30min";
                }
              } else if (analysisMode === "compare") {
                const nearB = isPoiNearSegment(poi, { x: -140 + originBPinOffset.x, y: 90 + originBPinOffset.y }, { x: 140 + destPinOffset.x, y: -90 + destPinOffset.y });
                if (nearB) {
                  poiColorClass = "bg-info"; // Color de la Ruta B (Morado)
                }
              }
  
              const { category, address } = getPoiDetails(poi);

              return (
                <div
                  key={poi.id}
                  className="absolute flex items-center justify-center pointer-events-auto"
                  style={{
                    left: `calc(50% + ${pinOffset.x + poi.dx}px)`,
                    top: `calc(50% + ${pinOffset.y + poi.dy}px)`,
                    transform: `translate(-50%, -50%) scale(${1 / zoom})`,
                    zIndex: hoveredPoi === poi.id || selectedPoi === poi.id ? 40 : 20
                  }}
                  onMouseEnter={() => setHoveredPoi(poi.id)}
                  onMouseLeave={() => setHoveredPoi(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPoi(selectedPoi === poi.id ? null : poi.id);
                  }}
                >
                  <div className={cn("size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-all duration-300 hover:scale-110", poiColorClass)}>
                    <PoiIcon className={cn("size-4", poiTextClass)} />
                  </div>

                  {(hoveredPoi === poi.id || selectedPoi === poi.id) && (
                    <Card className="absolute bottom-full mb-3.5 left-1/2 -translate-x-1/2 w-80 p-4 bg-card/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl text-left pointer-events-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 relative">
                      {selectedPoi === poi.id && (
                        <button 
                          onClick={(e) => {
                             e.stopPropagation();
                             setSelectedPoi(null);
                          }}
                          className="absolute top-3.5 right-3.5 size-7 rounded-full border border-border/40 bg-surface/50 text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                        >
                          <X className="size-3.5" />
                        </button>
                      )}
                      
                      <div className="flex gap-4">
                        <div className={cn("size-14 rounded-full flex items-center justify-center shrink-0 text-white shadow-md bg-gradient-to-br from-white/10 to-transparent", poi.color)}>
                          <PoiIcon className="size-6 text-white drop-shadow-md" />
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="text-[15px] font-extrabold text-foreground leading-tight tracking-tight truncate">{poi.name}</h4>
                          <p className="text-[9px] font-bold text-primary tracking-wider uppercase mt-1 leading-none">{category}</p>
                          <p className="text-[10.5px] text-muted-foreground mt-2 flex items-center gap-1.5 leading-none">
                            <MapPin className="size-3.5 text-danger shrink-0" />
                            <span className="truncate">{address}</span>
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-border/40 my-3" />

                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Métrica 1: Tiempo */}
                        <div className="p-2.5 rounded-2xl border border-border/40 flex items-center gap-2.5 bg-surface/30">
                          <div className="text-primary shrink-0">
                            {transportMode === "walk" && <Footprints className="size-5" />}
                            {transportMode === "bike" && <Bike className="size-5" />}
                            {transportMode === "transit" && <Train className="size-5" />}
                            {transportMode === "car" && <Car className="size-5" />}
                            {transportMode === "motorcycle" && <MotorcycleIcon className="size-5" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-black text-foreground leading-none">{poiTime} min</span>
                            <span className="text-[9px] text-muted-foreground font-medium mt-0.5 leading-none">desde origen</span>
                          </div>
                        </div>

                        {/* Métrica 2: Distancia */}
                        <div className="p-2.5 rounded-2xl border border-border/40 flex items-center gap-2.5 bg-surface/30">
                          <div className="text-success shrink-0">
                            <MapPin className="size-5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[13px] font-black text-foreground leading-none">{distanceKm.toFixed(1)} km</span>
                            <span className="text-[9px] text-muted-foreground font-medium mt-0.5 leading-none">de distancia</span>
                          </div>
                        </div>
                      </div>

                      {selectedPoi === poi.id && (
                        <div className="mt-3 flex justify-end">
                          <Button 
                            size="sm" 
                            variant="primary" 
                            className="h-6 text-[9.5px] font-bold rounded-lg cursor-pointer px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`Consultando detalle completo de ${poi.name}...`);
                            }}
                          >
                            Ver detalle
                          </Button>
                        </div>
                      )}
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
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
