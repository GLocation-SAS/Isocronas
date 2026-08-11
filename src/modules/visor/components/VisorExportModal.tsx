"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Globe, 
  Table, 
  Code2, 
  Download, 
  Sparkles,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VisorExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string) => void;
}

const EXPORT_FORMATS = [
  {
    id: "pdf",
    title: "PDF / Reporte Visual (PNG)",
    userType: "General / Negocios",
    desc: "Ficha técnica completa con mapa visual, leyenda de colores y resumen ejecutivo.",
    icon: FileText,
    badgeVariant: "primary" as const,
    badgeText: "Recomendado",
    iconBg: "bg-primary/10 text-primary",
  },
  {
    id: "kml",
    title: "KML / KMZ (Google Earth)",
    userType: "Arquitectos / Urbanistas",
    desc: "Abre el área de alcance directamente en Google Earth de forma rápida.",
    icon: Globe,
    badgeVariant: "success" as const,
    badgeText: "Visual 3D",
    iconBg: "bg-success/10 text-success",
  },
  {
    id: "csv",
    title: "CSV / Excel (Datos Tabulares)",
    userType: "Analistas / Marketing",
    desc: "Tabla con tiempos, área en km² y equipamientos encontrados dentro de la zona.",
    icon: Table,
    badgeVariant: "warning" as const,
    badgeText: "Tabular",
    iconBg: "bg-warning/10 text-warning",
  },
  {
    id: "geojson",
    title: "GeoJSON / Shapefile (SHP)",
    userType: "GIS / Desarrolladores",
    desc: "Polígonos vectoriales estándar para integración con QGIS o ArcGIS.",
    icon: Code2,
    badgeVariant: "neutral" as const,
    badgeText: "Técnico GIS",
    iconBg: "bg-surface text-muted-foreground",
  },
];

export function VisorExportModal({ isOpen, onClose, onExport }: VisorExportModalProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleCardClick = (formatId: string) => {
    setDownloadingId(formatId);
    setTimeout(() => {
      setDownloadingId(null);
      onExport(formatId);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl p-6">
        <DialogHeader className="text-left space-y-1.5 border-b border-border/40 pb-4">
          <div className="flex items-center gap-2">
            <Badge variant="primary" appearance="soft" className="text-[10px] font-mono uppercase font-bold">
              Matriz de Exportación
            </Badge>
            <span className="text-xs text-muted-foreground">• Descarga directa al hacer clic</span>
          </div>
          <DialogTitle className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
            <Download className="size-5 text-primary" />
            Exportar Resultados del Análisis
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Haz clic directamente sobre cualquier opción para descargar el reporte de forma inmediata en el formato deseado.
          </DialogDescription>
        </DialogHeader>

        {/* Grid de Formatos de Exportación con descarga directa al hacer clic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
          {EXPORT_FORMATS.map((fmt) => {
            const FmtIcon = fmt.icon;
            const isThisDownloading = downloadingId === fmt.id;
            return (
              <div
                key={fmt.id}
                onClick={() => handleCardClick(fmt.id)}
                className={cn(
                  "relative flex flex-col p-4 rounded-2xl border transition-all cursor-pointer select-none text-left gap-2.5 group hover:border-primary hover:bg-primary/5 hover:shadow-lg active:scale-98",
                  isThisDownloading
                    ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                    : "border-border/60 bg-surface/30"
                )}
              >
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0 border shadow-xs transition-transform group-hover:scale-110", fmt.iconBg)}>
                      <FmtIcon className="size-4" />
                    </div>
                    <Badge variant={fmt.badgeVariant} appearance="soft" className="text-[9px] font-bold">
                      {fmt.badgeText}
                    </Badge>
                  </div>

                  {/* Icono de Descarga / Spinner */}
                  <div className="flex items-center gap-1 text-primary">
                    {isThisDownloading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Download className="size-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-125 duration-200" />
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{fmt.title}</span>
                  </h4>
                  <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                    Para: {fmt.userType}
                  </p>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {fmt.desc}
                </p>

                <div className="mt-1 flex items-center justify-end text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Clic para descargar →
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-border/40 pt-3 text-[10.5px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary shrink-0" />
            <span>Generación instantánea sin marcas de agua.</span>
          </div>
          <Button 
            variant="neutral"
            size="sm"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
