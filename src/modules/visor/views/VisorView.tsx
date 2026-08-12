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
  const [originB, setOriginB] = useState("");
  const [destination, setDestination] = useState("");
  const [analysisMode, setAnalysisMode] = useState<"explore" | "route" | "compare">("explore");
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showFloatingCard, setShowFloatingCard] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [showExportModal, setShowExportModal] = useState(false);
  const [activeServices, setActiveServices] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastQueryTime, setLastQueryTime] = useState<number | null>(null);
  const [generatedParams, setGeneratedParams] = useState({
    origin: "",
    originB: "",
    destination: "",
    transportMode: "",
    travelTime: 0,
    analysisMode: "explore" as "explore" | "route" | "compare"
  });
  const [toast, setToast] = useState<{ message: string; type: "info" | "success" | "warning" } | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "[System] Iniciando servicio de grafos espaciales...",
    "[System] Mapa base cargado: CartoDB.Positron [BOG]"
  ]);

  const isOutdated = lastQueryTime !== null && (
    origin !== generatedParams.origin ||
    originB !== generatedParams.originB ||
    destination !== generatedParams.destination ||
    transportMode !== generatedParams.transportMode ||
    travelTime !== generatedParams.travelTime ||
    analysisMode !== generatedParams.analysisMode
  );
  
  const getOutdatedReason = () => {
    if (!isOutdated) return null;
    if (analysisMode !== generatedParams.analysisMode) return "mode";
    if (origin !== generatedParams.origin || destination !== generatedParams.destination || originB !== generatedParams.originB) return "location";
    if (transportMode !== generatedParams.transportMode) return "transport";
    if (travelTime !== generatedParams.travelTime) return "time";
    return null;
  };

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
      setGeneratedParams({ origin, originB, destination, transportMode, travelTime, analysisMode });
      showToast("Análisis generado con éxito", "success");
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
            transportMode={lastQueryTime !== null ? generatedParams.transportMode : transportMode}
            travelTime={lastQueryTime !== null ? generatedParams.travelTime : travelTime}
            origin={lastQueryTime !== null ? generatedParams.origin : origin}
            destination={lastQueryTime !== null ? generatedParams.destination : destination}
            analysisMode={lastQueryTime !== null ? generatedParams.analysisMode : analysisMode}
            activeServices={activeServices}
            isEmergency={profile === "profesional" && transportMode === "car" && destination !== ""}
            onLocateClick={() => setShowLocationModal(true)}
            hasGenerated={lastQueryTime !== null}
            isOutdated={isOutdated}
            onMapClick={(address, pinType = 'origin') => {
              if (pinType === 'origin') setOrigin(address);
              else if (pinType === 'originB') setOriginB(address);
              else if (pinType === 'destination') setDestination(address);
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
            origin={lastQueryTime !== null ? generatedParams.origin : origin}
            originB={lastQueryTime !== null ? generatedParams.originB : originB}
            destination={lastQueryTime !== null ? generatedParams.destination : destination}
            travelTime={lastQueryTime !== null ? generatedParams.travelTime : travelTime}
            transportMode={lastQueryTime !== null ? generatedParams.transportMode : transportMode}
            analysisMode={lastQueryTime !== null ? generatedParams.analysisMode : analysisMode}
            hasGenerated={lastQueryTime !== null}
            onOpenExport={() => setShowExportModal(true)}
          />
        </section>

        {/* Panel de Control Flotante Izquierdo sobre el mapa */}
        <div className="absolute top-4 left-4 bottom-4 z-20 w-[calc(100%-2rem)] max-w-[420px] pointer-events-none flex flex-col">
          <div className="pointer-events-auto h-full flex flex-col overflow-hidden">
            <VisorSidebar 
              profile={profile}
              analysisMode={analysisMode}
              onAnalysisModeChange={setAnalysisMode}
              transportMode={transportMode}
              onTransportChange={setTransportMode}
              travelTime={travelTime}
              onTimeChange={setTravelTime}
              origin={origin}
              onOriginChange={setOrigin}
          originB={originB}
          onOriginBChange={setOriginB}
              destination={destination}
              onDestinationChange={setDestination}
              onGenerate={handleGenerate}
              onReset={handleReset}
              isGenerating={isGenerating}
              lastQueryTime={lastQueryTime}
              activeServices={activeServices}
              onServicesChange={setActiveServices}
              onOpenExport={() => setShowExportModal(true)}
              isOutdated={isOutdated}
              outdatedReason={getOutdatedReason()}
              generatedTravelTime={lastQueryTime !== null ? generatedParams.travelTime : travelTime}
              generatedTransportMode={lastQueryTime !== null ? generatedParams.transportMode : transportMode}
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
