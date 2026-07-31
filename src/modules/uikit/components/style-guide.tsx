"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Palette,
  Copy,
  Check,
  Sparkles,
  Type,
  Layers,
  Code2,
  Terminal,
  Clock,
  MapPin,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SemanticColorItem {
  name: string;
  variable: string;
  tailwindClass: string;
  tailwindTextClass: string;
  hex: string;
  badgeVariant: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral" | "ghost";
  colorClass: string;
  textClass: string;
  description: string;
  usage: string;
}

const SEMANTIC_COLORS: SemanticColorItem[] = [
  {
    name: "Primary",
    variable: "--primary",
    tailwindClass: "bg-primary",
    tailwindTextClass: "text-primary",
    hex: "#235E7F",
    badgeVariant: "primary",
    colorClass: "bg-primary",
    textClass: "text-white",
    description: "Azul Principal",
    usage: "Botones primarios, enlaces activos, elementos destacados de la marca.",
  },
  {
    name: "Secondary",
    variable: "--secondary",
    tailwindClass: "bg-secondary",
    tailwindTextClass: "text-secondary",
    hex: "#1C3A44",
    badgeVariant: "secondary",
    colorClass: "bg-secondary",
    textClass: "text-white",
    description: "Verde Oscuro Grisáceo",
    usage: "Acciones secundarias, chips de filtros, badges informativos.",
  },
  {
    name: "Accent",
    variable: "--accent",
    tailwindClass: "bg-accent-500",
    tailwindTextClass: "text-accent-500",
    hex: "#6F7BF7",
    badgeVariant: "primary",
    colorClass: "bg-accent-500",
    textClass: "text-white",
    description: "Azul Lavanda",
    usage: "Énfasis especial, estados seleccionados, resalta elementos clave.",
  },
  {
    name: "Success",
    variable: "--success",
    tailwindClass: "bg-success",
    tailwindTextClass: "text-success",
    hex: "#2A9D8F",
    badgeVariant: "success",
    colorClass: "bg-success",
    textClass: "text-white",
    description: "Verde Éxito",
    usage: "Notificaciones de éxito, indicadores de estado positivo o completado.",
  },
  {
    name: "Warning",
    variable: "--warning",
    tailwindClass: "bg-warning",
    tailwindTextClass: "text-warning",
    hex: "#E9A63B",
    badgeVariant: "warning",
    colorClass: "bg-warning",
    textClass: "text-slate-950",
    description: "Ámbar Preventivo",
    usage: "Alertas preventivas, advertencias de riesgo o estados en espera.",
  },
  {
    name: "Danger",
    variable: "--danger",
    tailwindClass: "bg-danger",
    tailwindTextClass: "text-danger",
    hex: "#D95D5D",
    badgeVariant: "error",
    colorClass: "bg-danger",
    textClass: "text-white",
    description: "Rojo Crítico",
    usage: "Errores del sistema, acciones destructivas, avisos de alta prioridad.",
  },
  {
    name: "Info",
    variable: "--info",
    tailwindClass: "bg-info",
    tailwindTextClass: "text-info",
    hex: "#B05994",
    badgeVariant: "info",
    colorClass: "bg-info",
    textClass: "text-white",
    description: "Malva Orquídea",
    usage: "Mensajes informativos, guías contextuales, tooltips interactivos.",
  },
  {
    name: "Surface",
    variable: "--surface",
    tailwindClass: "bg-surface",
    tailwindTextClass: "text-surface-foreground",
    hex: "#F4F7F9",
    badgeVariant: "neutral",
    colorClass: "bg-surface border border-border",
    textClass: "text-slate-900",
    description: "Fondo de Tarjetas",
    usage: "Superficies elevadas, paneles y tarjetas contenedoras.",
  },
  {
    name: "Muted",
    variable: "--muted",
    tailwindClass: "bg-muted",
    tailwindTextClass: "text-muted-foreground",
    hex: "#6F7F8F",
    badgeVariant: "ghost",
    colorClass: "bg-muted-foreground",
    textClass: "text-white",
    description: "Gris Azulado",
    usage: "Textos secundarios, bordes deshabilitados, metadatos desfasados.",
  },
];

const FULL_SCALES = [
  {
    name: "Primary",
    label: "Azul Petróleo",
    baseHex: "#235E7F",
    prefix: "primary",
    colors: [
      { level: "50", hex: "#EDF5F9" },
      { level: "100", hex: "#D4E6F0" },
      { level: "200", hex: "#A8CCE0" },
      { level: "300", hex: "#7BB3CF" },
      { level: "400", hex: "#4E99BF" },
      { level: "500", hex: "#235E7F" },
      { level: "600", hex: "#1D4E69" },
      { level: "700", hex: "#173E54" },
      { level: "800", hex: "#112D3E" },
      { level: "900", hex: "#0B1D29" },
    ],
  },
  {
    name: "Secondary",
    label: "Verde Oscuro Grisáceo",
    baseHex: "#1C3A44",
    prefix: "secondary",
    colors: [
      { level: "50", hex: "#ECEFF1" },
      { level: "100", hex: "#CFD8DC" },
      { level: "200", hex: "#9FAEB5" },
      { level: "300", hex: "#6F838D" },
      { level: "400", hex: "#425761" },
      { level: "500", hex: "#1C3A44" },
      { level: "600", hex: "#162E37" },
      { level: "700", hex: "#11232A" },
      { level: "800", hex: "#0B171B" },
      { level: "900", hex: "#050B0E" },
      { level: "950", hex: "#020507" },
    ],
  },
  {
    name: "Success",
    label: "Esmeralda",
    baseHex: "#2A9D8F",
    prefix: "success",
    colors: [
      { level: "50", hex: "#EDF8F7" },
      { level: "100", hex: "#D2EFEC" },
      { level: "200", hex: "#A5DFD8" },
      { level: "300", hex: "#77CEC4" },
      { level: "400", hex: "#4ABEB0" },
      { level: "500", hex: "#2A9D8F" },
      { level: "600", hex: "#228075" },
      { level: "700", hex: "#196259" },
      { level: "800", hex: "#11453F" },
      { level: "900", hex: "#082724" },
    ],
  },
  {
    name: "Warning",
    label: "Ámbar Cálido",
    baseHex: "#E9A63B",
    prefix: "warning",
    colors: [
      { level: "50", hex: "#FDF8EE" },
      { level: "100", hex: "#FAF0D7" },
      { level: "200", hex: "#F4E0AE" },
      { level: "300", hex: "#EFD085" },
      { level: "400", hex: "#EDB763" },
      { level: "500", hex: "#E9A63B" },
      { level: "600", hex: "#C78726" },
      { level: "700", hex: "#9C671B" },
      { level: "800", hex: "#6E4711" },
      { level: "900", hex: "#3F2708" },
    ],
  },
  {
    name: "Danger",
    label: "Rojo Crítico",
    baseHex: "#D95D5D",
    prefix: "danger",
    colors: [
      { level: "50", hex: "#FCEFEF" },
      { level: "100", hex: "#FADFDF" },
      { level: "200", hex: "#F4BFBF" },
      { level: "300", hex: "#EE9F9F" },
      { level: "400", hex: "#E97E7E" },
      { level: "500", hex: "#D95D5D" },
      { level: "600", hex: "#B84444" },
      { level: "700", hex: "#8F3333" },
      { level: "800", hex: "#642222" },
      { level: "900", hex: "#3B1111" },
    ],
  },
  {
    name: "Info",
    label: "Malva Orquídea",
    baseHex: "#B05994",
    prefix: "info",
    colors: [
      { level: "50", hex: "#FBF4F8" },
      { level: "100", hex: "#F5E5F0" },
      { level: "200", hex: "#EBCCE2" },
      { level: "300", hex: "#DDA6CE" },
      { level: "400", hex: "#CB7CB6" },
      { level: "500", hex: "#B05994" },
      { level: "600", hex: "#98447D" },
      { level: "700", hex: "#7E3566" },
      { level: "800", hex: "#652A51" },
      { level: "900", hex: "#4D1E3C" },
      { level: "950", hex: "#341128" },
    ],
  },
  {
    name: "Accent",
    label: "Azul Lavanda",
    baseHex: "#6F7BF7",
    prefix: "accent",
    colors: [
      { level: "50", hex: "#F1F2FE" },
      { level: "100", hex: "#E3E5FD" },
      { level: "200", hex: "#C7CBFC" },
      { level: "300", hex: "#ABB1FA" },
      { level: "400", hex: "#8D96F9" },
      { level: "500", hex: "#6F7BF7" },
      { level: "600", hex: "#4F5DE0" },
      { level: "700", hex: "#3643B8" },
      { level: "800", hex: "#232D8F" },
      { level: "900", hex: "#121866" },
    ],
  },
  {
    name: "Neutral & Surface",
    label: "Gris Azulado & Fondos",
    baseHex: "#6F7F8F",
    prefix: "neutral",
    colors: [
      { level: "50", hex: "#FFFFFF" },
      { level: "100", hex: "#F4F7F9" },
      { level: "200", hex: "#E2E9EF" },
      { level: "300", hex: "#CBD7E2" },
      { level: "400", hex: "#9EB0C2" },
      { level: "500", hex: "#6F7F8F" },
      { level: "600", hex: "#536678" },
      { level: "700", hex: "#3A4A59" },
      { level: "800", hex: "#232E3A" },
      { level: "900", hex: "#111821" },
    ],
  },
];

const TYPOGRAPHY_SCALE = [
  {
    level: "Display",
    style: "Título Gigante",
    size: "48px (3rem)",
    font: "Montserrat",
    weight: "800 (ExtraBold)",
    usage: "Hero sections y landing headers de gran impacto",
    className: "text-display font-heading font-extrabold",
    codeSnippet: '<h1 className="text-display font-heading font-extrabold">Título</h1>',
  },
  {
    level: "H1",
    style: "Título Principal",
    size: "32px (2rem)",
    font: "Montserrat",
    weight: "700 (Bold)",
    usage: "Encabezados principales de página",
    className: "text-h1 font-heading font-bold",
    codeSnippet: '<h1 className="text-h1 font-heading font-bold">Título</h1>',
  },
  {
    level: "H2",
    style: "Título Secundario",
    size: "24px (1.5rem)",
    font: "Montserrat",
    weight: "600 (SemiBold)",
    usage: "Secciones dentro de una página",
    className: "text-h2 font-heading font-semibold",
    codeSnippet: '<h2 className="text-h2 font-heading font-semibold">Subtítulo</h2>',
  },
  {
    level: "H3",
    style: "Título Terciario",
    size: "20px (1.25rem)",
    font: "Montserrat",
    weight: "600 (SemiBold)",
    usage: "Subsecciones o tarjetas de información",
    className: "text-h3 font-heading font-semibold",
    codeSnippet: '<h3 className="text-h3 font-heading font-semibold">Tarjeta</h3>',
  },
  {
    level: "Body",
    style: "Texto de Cuerpo",
    size: "16px (1rem)",
    font: "Nunito",
    weight: "400 (Regular)",
    usage: "Contenido principal, artículos y párrafos",
    className: "text-body font-normal",
    codeSnippet: '<p className="text-body font-normal">Contenido de párrafo...</p>',
  },
  {
    level: "Caption",
    style: "Nota al Pie",
    size: "12px (0.75rem)",
    font: "Nunito",
    weight: "400 (Regular)",
    usage: "Metadatos, etiquetas secundarias y avisos legales",
    className: "text-caption font-normal",
    codeSnippet: '<span className="text-caption font-normal">Metadato</span>',
  },
];

export function StyleGuide() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeScaleTab, setActiveScaleTab] = useState<string>("Primary");
  const [customText, setCustomText] = useState<string>("El rápido zorro marrón salta sobre el perro perezoso.");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface/50 backdrop-blur-xl p-8 sm:p-12 shadow-xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 size-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <Badge variant="primary" appearance="soft" data-icon="inline-start">
            <Sparkles className="size-3.5" />
            Sistema de Diseño Isocronas
          </Badge>
          <h1 className="text-display font-heading font-black tracking-tight text-foreground">
            Isocronas UI KIT
          </h1>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            Explora la arquitectura visual, tokens semánticos, guía cromática de tiempo para isócronas y componentes interactivos del sistema de diseño.
          </p>
        </div>
      </section>

      {/* ── SECCIÓN 1: COLORES SEMÁNTICOS CON BADGES Y COPIA PARA DEVS ── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-h2 font-heading font-bold text-foreground flex items-center gap-3">
              <Palette className="size-6 text-primary" />
              Colores de Marca (Semánticos)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Componentes <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">Badge</code> del UI Kit integrados. Selecciona cualquier chip de código para copiarlo al portapapeles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEMANTIC_COLORS.map((color) => (
            <div
              key={color.name}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
            >
              {/* Header Box con Badges del UI Kit */}
              <div
                className="h-28 w-full p-4 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                style={{ backgroundColor: color.hex }}
              >
                <div className="flex items-center justify-between z-10">
                  {/* BADGE DEL NOMBRE DE COLOR (ALTO CONTRASTE GLASS) */}
                  <Badge className={cn(
                    "font-bold backdrop-blur-md shadow-xs border-0",
                    color.name === "Surface" 
                      ? "bg-slate-900/15 text-slate-900" 
                      : "bg-black/35 text-white"
                  )}>
                    {color.name}
                  </Badge>

                  {/* BADGE DEL HEX (ALTO CONTRASTE GLASS) */}
                  <Badge className={cn(
                    "font-mono text-[11px] backdrop-blur-md shadow-xs border-0",
                    color.name === "Surface" 
                      ? "bg-slate-900/15 text-slate-900 font-semibold" 
                      : "bg-black/45 text-white/90 font-medium"
                  )}>
                    {color.hex}
                  </Badge>
                </div>

                <div className="flex items-center justify-between z-10">
                  <span className={cn(
                    "text-sm font-bold tracking-wide",
                    color.name === "Surface" ? "text-slate-900 font-extrabold" : "text-white drop-shadow-xs"
                  )}>
                    {color.description}
                  </span>
                </div>
              </div>

              {/* Developer Toolkit Body */}
              <div className="p-5 space-y-4 bg-card flex-1 flex flex-col justify-between">
                <p className="text-caption text-muted-foreground leading-relaxed">
                  {color.usage}
                </p>

                {/* Developer Copy Chips */}
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-1.5">
                    <Code2 className="size-3 text-primary" />
                    Chips para Desarrolladores (Copiar)
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {/* Copy Tailwind BG */}
                    <button
                      onClick={() => handleCopy(color.tailwindClass)}
                      className="group/btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-border/70 text-[11px] font-mono hover:border-primary hover:bg-primary/10 transition-all"
                      title="Copiar clase de fondo en Tailwind"
                    >
                      <span className="text-primary font-bold">{color.tailwindClass}</span>
                      {copiedText === color.tailwindClass ? (
                        <Check className="size-3 text-success" />
                      ) : (
                        <Copy className="size-3 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Copy Tailwind Text */}
                    <button
                      onClick={() => handleCopy(color.tailwindTextClass)}
                      className="group/btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-border/70 text-[11px] font-mono hover:border-primary hover:bg-primary/10 transition-all"
                      title="Copiar clase de texto en Tailwind"
                    >
                      <span className="text-foreground font-bold">{color.tailwindTextClass}</span>
                      {copiedText === color.tailwindTextClass ? (
                        <Check className="size-3 text-success" />
                      ) : (
                        <Copy className="size-3 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Copy CSS Variable */}
                    <button
                      onClick={() => handleCopy(`var(${color.variable})`)}
                      className="group/btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-border/70 text-[11px] font-mono hover:border-primary hover:bg-primary/10 transition-all"
                      title="Copiar variable CSS"
                    >
                      <span className="text-foreground/80 font-semibold">var({color.variable})</span>
                      {copiedText === `var(${color.variable})` ? (
                        <Check className="size-3 text-success" />
                      ) : (
                        <Copy className="size-3 text-muted-foreground group-hover/btn:text-foreground transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECCIÓN: COLORES PARA TIEMPO (ISÓCRONAS) ── */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-h2 font-heading font-bold text-foreground flex items-center gap-3">
              <Clock className="size-6 text-success" />
              Colores para Tiempo (Isócronas)
            </h2>
            <p className="text-sm text-muted-foreground">
              Escala cromática especializada para representar los rangos de tiempo de acceso en las isócronas del mapa.
            </p>
          </div>
        </div>

        {/* Card Principal con Gradiente e Indicadores */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card space-y-8 shadow-sm relative overflow-hidden">
          {/* Barra de Gradiente de Tiempo */}
          <div className="space-y-2">
            <div className="h-5 w-full rounded-full bg-gradient-to-r from-[#2A9D8F] via-[#F2C14E] via-[#F28F3B] to-[#D95D5D] shadow-inner" />
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">
              <span className="flex items-center gap-1 text-success">
                <Sparkles className="size-3" /> Más rápido
              </span>
              <span className="text-danger">Límite de tiempo</span>
            </div>
          </div>

          {/* Grid de Tarjetas de Tiempo (5 Rangos) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { time: "0–5 min", hex: "#2A9D8F", variable: "--isochrone-5min" },
              { time: "5–10 min", hex: "#72BDA3", variable: "--isochrone-10min" },
              { time: "10–15 min", hex: "#F2C14E", variable: "--isochrone-15min" },
              { time: "15–30 min", hex: "#F28F3B", variable: "--isochrone-30min" },
              { time: "+30 min", hex: "#D95D5D", variable: "--isochrone-maxmin" },
            ].map((item) => (
              <div
                key={item.time}
                onClick={() => handleCopy(item.hex)}
                className="group p-4 rounded-2xl border border-border/70 bg-surface/50 hover:bg-surface hover:border-primary/50 transition-all duration-300 flex flex-col items-center gap-3 cursor-pointer text-center shadow-2xs hover:-translate-y-1"
                title={`Copiar código HEX: ${item.hex}`}
              >
                {/* Swatch Box */}
                <div
                  className="h-14 w-full rounded-xl shadow-xs transition-transform group-hover:scale-105"
                  style={{ backgroundColor: item.hex }}
                />
                
                <div>
                  <div className="text-sm font-bold text-foreground font-heading">
                    {item.time}
                  </div>
                  <div className="text-xs font-mono font-semibold text-muted-foreground mt-0.5">
                    {copiedText === item.hex ? (
                      <span className="text-success font-bold">¡Copiado!</span>
                    ) : (
                      item.hex
                    )}
                  </div>
                </div>

                <Badge variant="neutral" appearance="soft" className="text-[9px] font-mono w-full justify-center">
                  {item.variable}
                </Badge>
              </div>
            ))}
          </div>

          {/* Fila Inferior: Nota Importante */}
          <div className="pt-4 border-t border-border/50">
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Info className="size-4 shrink-0" />
                  <span>Nota Importante</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Estos colores se utilizan únicamente para los rangos de tiempo en el mapa (isócronas). Son independientes de los colores semánticos de la interfaz de usuario.
                </p>
              </div>
              <div className="text-[10px] text-muted-foreground/80 font-mono italic shrink-0 flex items-center gap-1 bg-surface/60 px-3 py-2 rounded-xl border border-border/40">
                <Sparkles className="size-3 text-primary shrink-0" />
                <span>Uso: representación visual del tiempo de acceso. De más rápido (verde) a límite de tiempo (rojo).</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: ESCALAS PRIMITIVAS (50..900) ── */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="space-y-1">
          <h2 className="text-h2 font-heading font-bold text-foreground flex items-center gap-3">
            <Layers className="size-6 text-secondary" />
            Escalas Cromáticas Primitivas (50..900)
          </h2>
          <p className="text-sm text-muted-foreground">
            Tonalidades para desarrolladores. Haz clic en cada muestra para copiar la clase Tailwind <code className="text-xs bg-muted px-1 rounded text-foreground font-mono">bg-[color]-[level]</code>.
          </p>
        </div>

        {/* Scale selector tabs con Badges */}
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-surface/60 border border-border w-fit">
          {FULL_SCALES.map((scale) => (
            <button
              key={scale.name}
              onClick={() => setActiveScaleTab(scale.name)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
                activeScaleTab === scale.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              )}
            >
              <span
                className="size-3 rounded-full border border-white/20"
                style={{ backgroundColor: scale.baseHex }}
              />
              {scale.name}
            </button>
          ))}
        </div>

        {/* Selected Scale Display */}
        {FULL_SCALES.filter((s) => s.name === activeScaleTab).map((scale) => (
          <div
            key={scale.name}
            className="p-6 rounded-2xl border border-border/80 bg-card space-y-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <Badge variant="primary" appearance="outline">
                  {scale.name}
                </Badge>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{scale.label}</h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Clase base: <span className="text-primary font-bold">bg-{scale.prefix}-500</span> ({scale.baseHex})
                  </p>
                </div>
              </div>

              {/* Gradient Strip Bar */}
              <div className="h-4 w-48 rounded-full overflow-hidden flex border border-border shadow-inner">
                {scale.colors.map((c) => (
                  <div key={c.level} className="flex-1 h-full" style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            </div>

            {/* Color Swatch Grid con interactividad Dev */}
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-3">
              {scale.colors.map((color) => {
                const twClass = `bg-${scale.prefix}-${color.level}`;

                return (
                  <div
                    key={color.level}
                    onClick={() => handleCopy(twClass)}
                    className="group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-border/40 hover:border-primary/50 bg-background/50 hover:bg-background cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    title={`Copiar clase Tailwind: ${twClass}`}
                  >
                    <div
                      className="size-12 rounded-full border border-black/10 shadow-inner transition-transform group-hover:scale-110 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {copiedText === twClass ? (
                        <Check className="size-4 text-white drop-shadow-md" />
                      ) : null}
                    </div>

                    <div className="text-center flex flex-col items-center gap-0.5">
                      {copiedText === twClass || copiedText === color.hex ? (
                        <Badge variant="success" appearance="soft" className="text-[9px] h-4 px-1.5 animate-in zoom-in duration-200 font-bold">
                          ¡Copiado!
                        </Badge>
                      ) : (
                        <>
                          <div className="text-xs font-bold text-foreground">{color.level}</div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase">
                            {color.hex}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* ── SECCIÓN 3: SISTEMA TIPOGRÁFICO INTERACTIVO CON SNIPPETS ── */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-h2 font-heading font-bold text-foreground flex items-center gap-3">
              <Type className="size-6 text-primary" />
              Sistema Tipográfico & Snippets
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Montserrat para Títulos y Nunito para Cuerpo de texto. Copia el código JSX de cada nivel.
            </p>
          </div>
        </div>

        {/* Live Input Field */}
        <div className="p-4 rounded-2xl bg-surface/50 border border-border space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Terminal className="size-3.5 text-primary" />
            Probador de Texto en Vivo:
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
            placeholder="Escribe algo..."
          />
        </div>

        {/* Lista Compacta de Tipografía */}
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card divide-y divide-border/40 shadow-xs">
          {TYPOGRAPHY_SCALE.map((item) => (
            <div
              key={item.level}
              className="p-4 hover:bg-surface/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Información e Identificador */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 min-w-[240px]">
                <Badge variant="primary" appearance="soft" className="w-20 justify-center shrink-0 font-mono text-[10px] shadow-2xs">
                  {item.level}
                </Badge>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{item.style}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {item.font} · {item.size} · {item.weight.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Muestra de Texto en Vivo */}
              <div className="flex-1 overflow-x-auto py-1 min-w-0">
                <p className={cn(item.className, "text-foreground truncate leading-tight")}>
                  {customText || item.style}
                </p>
              </div>

              {/* Acciones de Copia de Código JSX */}
              <div className="shrink-0">
                <button
                  onClick={() => handleCopy(item.codeSnippet)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border/70 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                  title={`Copiar JSX: ${item.codeSnippet}`}
                >
                  {copiedText === item.codeSnippet ? (
                    <>
                      <Check className="size-3.5 text-success" />
                      <span className="text-success font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span className="font-semibold">Copiar JSX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
