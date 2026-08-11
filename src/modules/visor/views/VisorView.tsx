"use client";

import { useState, useEffect } from "react";
import { 
  VisorHeader, 
  VisorSidebar, 
  VisorMap, 
  VisorLegend, 
  VisorQuickGuide,
  VisorQuickStepsCard,
  VisorBusinessMetrics,
  VisorTechnicalConsole,
  VisorLocationPermissionModal,
  VisorExportModal
} from "../components";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Info, AlertTriangle, Terminal as TerminalIcon, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function VisorView() {
  // --- ESTADO GLOBAL DEL PROTOTIPO ---
  const [profile, setProfile] = useState("ciudadano"); // ciudadano | profesional | tecnico
  const [transportMode, setTransportMode] = useState("walk");
  const [travelTime, setTravelTime] = useState(15);
  const [origin, setOrigin] = useState("Plaza de Bolívar");
  const [destination, setDestination] = useState("");
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showFloatingCard, setShowFloatingCard] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastQueryTime, setLastQueryTime] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "info" | "success" | "warning" } | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "[System] Iniciando servicio de grafos espaciales...",
    "[System] Mapa base cargado: CartoDB.Positron [BOG]"
  ]);

  // --- LOCATION HANDLERS ---
  const handleAllowLocationAlways = () => {
    setShowLocationModal(false);
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setOrigin(`Mi Ubicación (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
          showToast("Ubicación GPS sincronizada con éxito", "success");
        },
        () => {
          setOrigin("Plaza de Bolívar (GPS)");
          showToast("Ubicación permitida. Usando centro de visor", "success");
        }
      );
    } else {
      setOrigin("Plaza de Bolívar (GPS)");
      showToast("Ubicación permitida para la sesión", "success");
    }
  };

  const handleAllowLocationOnce = () => {
    setShowLocationModal(false);
    showToast("Ubicación permitida para esta vista", "info");
  };

  const handleDenyLocation = () => {
    setShowLocationModal(false);
    showToast("Permiso de ubicación denegado", "warning");
  };

  // --- HANDLERS ---
  const showToast = (message: string, type: "info" | "success" | "warning" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setLastQueryTime(116);
      showToast("Isócrona generada con éxito", "success");
      if (profile === "tecnico") {
        setLogs(prev => [
          ...prev, 
          `[API] GET /api/v3/isocrona - 200 OK (${116}ms)`,
          `[LOG] r=${travelTime*100}m, m=${transportMode}, v=${transportMode === 'walk' ? 4.5 : 15}km/h`
        ]);
      }
    }, 800);
  };

  const handleReset = () => {
    setProfile("ciudadano");
    setTransportMode("walk");
    setTravelTime(15);
    setOrigin("Plaza de Bolívar");
    setDestination("");
    setActiveServices([]);
    setLastQueryTime(null);
    showToast("Prototipo reiniciado al estado inicial", "info");
  };

  const handlePreset = (caseId: number) => {
    setShowGuideModal(false);
    switch(caseId) {
      case 0: // Vivienda
        setProfile("ciudadano");
        setTransportMode("walk");
        setTravelTime(10);
        setOrigin("Portal 80");
        setDestination("Barrio Quirigua");
        showToast("Caso aplicado: Búsqueda de vivienda", "success");
        break;
      case 1: // Local
        setProfile("profesional");
        setTransportMode("walk");
        setTravelTime(15);
        setOrigin("Parque de la 93");
        setDestination("");
        showToast("Caso aplicado: Ubicación de local", "success");
        break;
      case 2: // Emergencia
        setProfile("profesional");
        setTransportMode("car");
        setTravelTime(10);
        setOrigin("Clínica del Country");
        setDestination("Calle 72");
        showToast("Caso aplicado: Cobertura de emergencia", "warning");
        break;
      case 3: // Redes
        setProfile("tecnico");
        setTransportMode("bike");
        setTravelTime(15);
        setOrigin("Calle 100 con Carrera 15");
        setDestination("");
        showToast("Caso aplicado: Planeación de redes", "info");
        break;
    }
  };
  return (
    <section className="flex flex-col h-screen h-svh w-full overflow-hidden bg-background text-foreground font-sans">
      {/* Header Fijo */}
      <VisorHeader 
        onOpenGuide={() => setShowGuideModal(true)} 
        profile={profile}
        onProfileChange={setProfile}
      />

      <main className="relative flex-1 w-full overflow-hidden">
        {/* Área de Mapa (Canvas Completo de Fondo) */}
        <section className="absolute inset-0 z-0 overflow-hidden">
          <VisorMap 
            transportMode={transportMode}
            travelTime={travelTime}
            origin={origin}
            destination={destination}
            activeServices={activeServices}
            isEmergency={profile === "profesional" && transportMode === "car" && destination !== ""}
            onLocateClick={() => setShowLocationModal(true)}
            hasGenerated={lastQueryTime !== null}
            onMapClick={(address) => {
              setOrigin(address);
              showToast(`Chincheta movida: ${address}`, "success");
            }}
          />
          
          {/* Modal de Permiso de Ubicación */}
          <VisorLocationPermissionModal
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
            onAllowAlways={handleAllowLocationAlways}
            onAllowOnce={handleAllowLocationOnce}
            onDeny={handleDenyLocation}
            domain="isocronas.com"
          />

          {/* Componentes Flotantes Condicionales */}
          {profile === "profesional" && <VisorBusinessMetrics isGenerating={isGenerating} />}
          {profile === "tecnico" && <VisorTechnicalConsole logs={logs} onCopy={() => showToast("GeoJSON copiado (Mock)", "success")} />}
          
          <VisorLegend 
            origin={origin}
            destination={destination}
            travelTime={travelTime}
            transportMode={transportMode}
            hasGenerated={lastQueryTime !== null}
            onOpenExport={() => setShowExportModal(true)}
          />
        </section>

        {/* Panel de Control Flotante Izquierdo sobre el mapa */}
        <div className="absolute top-4 left-4 bottom-4 z-20 w-[calc(100%-2rem)] max-w-[420px] pointer-events-none flex flex-col">
          <div className="pointer-events-auto h-full flex flex-col overflow-hidden">
            <VisorSidebar 
              profile={profile}
              transportMode={transportMode}
              onTransportChange={setTransportMode}
              travelTime={travelTime}
              onTimeChange={setTravelTime}
              origin={origin}
              onOriginChange={setOrigin}
              destination={destination}
              onDestinationChange={setDestination}
              onGenerate={handleGenerate}
              onReset={handleReset}
              isGenerating={isGenerating}
              lastQueryTime={lastQueryTime}
              activeServices={activeServices}
              onServicesChange={setActiveServices}
              onOpenExport={() => setShowExportModal(true)}
            />
          </div>
        </div>
      </main>

      {/* Guía Rápida Flotante en 3 Pasos */}
      {showFloatingCard && (
        <VisorQuickStepsCard 
          onClose={() => setShowFloatingCard(false)} 
          profile={profile} 
        />
      )}

      {/* Modal Completo de Guía de Inicio */}
      {showGuideModal && (
        <VisorQuickGuide 
          onClose={() => setShowGuideModal(false)} 
        />
      )}

      {/* Modal de Matriz de Exportación (PDF, KML, CSV, GeoJSON) */}
      <VisorExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={(fmt) => showToast(`Reporte ${fmt.toUpperCase()} descargado exitosamente`, "success")}
      />

      {/* Toast Mock */}
      {toast && (
        <div className={cn(
          "fixed bottom-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl animate-in slide-in-from-bottom-10 duration-300",
          toast.type === "success" && "bg-success/10 border-success text-success",
          toast.type === "info" && "bg-info/10 border-info text-info",
          toast.type === "warning" && "bg-warning/10 border-warning text-warning"
        )}>
          {toast.type === "success" && <CheckCircle2 className="size-5" />}
          {toast.type === "info" && <Info className="size-5" />}
          {toast.type === "warning" && <AlertTriangle className="size-5" />}
          <span className="text-sm font-bold">{toast.message}</span>
        </div>
      )}
    </section>
  );
}
