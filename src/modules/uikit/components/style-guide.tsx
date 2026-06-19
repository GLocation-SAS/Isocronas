"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SEMANTIC_COLORS = [
  { name: "Primary", variable: "--primary", class: "bg-primary", foreground: "text-primary-foreground", description: "Color principal de la marca para acciones destacadas." },
  { name: "Secondary", variable: "--secondary", class: "bg-secondary", foreground: "text-secondary-foreground", description: "Color secundario para elementos de soporte." },
  { name: "Success", variable: "--success", class: "bg-success", foreground: "text-success-foreground", description: "Indica éxito, validación o completado." },
  { name: "Warning", variable: "--warning", class: "bg-warning", foreground: "text-warning-foreground", description: "Avisos, alertas preventivas o estados pendientes." },
  { name: "Danger", variable: "--danger", class: "bg-danger", foreground: "text-danger-foreground", description: "Errores, acciones destructivas o alertas críticas." },
  { name: "Info", variable: "--info", class: "bg-info", foreground: "text-info-foreground", description: "Información general, ayuda o estados neutrales informativos." },
  { name: "Surface", variable: "--surface", class: "bg-surface", foreground: "text-surface-foreground", description: "Color de fondo para tarjetas, modales y paneles." },
  { name: "Muted", variable: "--muted", class: "bg-muted", foreground: "text-muted-foreground", description: "Color para textos secundarios o elementos de menor importancia." },
  { name: "Accent", variable: "--accent", class: "bg-accent", foreground: "text-accent-foreground", description: "Color de énfasis para resaltar elementos específicos." },
];

const FULL_SCALES = [
  {
    name: "Primary",
    prefix: "primary",
    colors: [
      { level: "50", hex: "#F6F2FF" },
      { level: "100", hex: "#EEE5FF" },
      { level: "200", hex: "#DCCBFF" },
      { level: "300", hex: "#C2A3FF" },
      { level: "400", hex: "#9B6DFF" },
      { level: "500", hex: "#5A3988" },
      { level: "600", hex: "#4D2EF5" },
      { level: "700", hex: "#4025CC" },
      { level: "800", hex: "#321D9E" },
      { level: "900", hex: "#24156F" },
    ]
  },
  {
    name: "Secondary",
    prefix: "secondary",
    colors: [
      { level: "50", hex: "#DBEAF2" },
      { level: "100", hex: "#B8D4E5" },
      { level: "200", hex: "#94BFD8" },
      { level: "300", hex: "#70AACB" },
      { level: "400", hex: "#4C94BE" },
      { level: "500", hex: "#2D5F7C" },
      { level: "600", hex: "#295671" },
      { level: "700", hex: "#254E65" },
      { level: "800", hex: "#21455A" },
      { level: "900", hex: "#0C3B52" },
    ]
  },
  {
    name: "Success",
    prefix: "success",
    colors: [
      { level: "50", hex: "#F0FDF4" },
      { level: "100", hex: "#DCFCE7" },
      { level: "200", hex: "#BBF7D0" },
      { level: "300", hex: "#86EFAC" },
      { level: "400", hex: "#4ADE80" },
      { level: "500", hex: "#67DC67" },
      { level: "600", hex: "#51B051" },
      { level: "700", hex: "#3C863C" },
      { level: "800", hex: "#295C29" },
      { level: "900", hex: "#183718" },
    ]
  },
  {
    name: "Warning",
    prefix: "warning",
    colors: [
      { level: "50", hex: "#FFF9F1" },
      { level: "100", hex: "#FFEFDB" },
      { level: "200", hex: "#FFDAB3" },
      { level: "300", hex: "#FFBE7D" },
      { level: "400", hex: "#FF9F47" },
      { level: "500", hex: "#DE7411" },
      { level: "600", hex: "#C2610A" },
      { level: "700", hex: "#A14E07" },
      { level: "800", hex: "#823D05" },
      { level: "900", hex: "#662F04" },
    ]
  },
  {
    name: "Danger",
    prefix: "danger",
    colors: [
      { level: "50", hex: "#FEF2F2" },
      { level: "100", hex: "#FEE2E2" },
      { level: "200", hex: "#FECACA" },
      { level: "300", hex: "#FCA5A5" },
      { level: "400", hex: "#F87171" },
      { level: "500", hex: "#E43241" },
      { level: "600", hex: "#DC2626" },
      { level: "700", hex: "#B91C1C" },
      { level: "800", hex: "#991B1B" },
      { level: "900", hex: "#7F1D1D" },
    ]
  },
  {
    name: "Info",
    prefix: "info",
    colors: [
      { level: "50", hex: "#F0F9FF" },
      { level: "100", hex: "#E0F2FE" },
      { level: "200", hex: "#BAE6FD" },
      { level: "300", hex: "#7DD3FC" },
      { level: "400", hex: "#38BDF8" },
      { level: "500", hex: "#38BDF8" },
      { level: "600", hex: "#0284C7" },
      { level: "700", hex: "#0369A1" },
      { level: "800", hex: "#075985" },
      { level: "900", hex: "#0C4A6E" },
    ]
  },
  {
    name: "Neutral",
    prefix: "neutral",
    colors: [
      { level: "50", hex: "#FFFFFF" },
      { level: "100", hex: "#E8EBEC" },
      { level: "200", hex: "#D1D9DA" },
      { level: "300", hex: "#B9C6C8" },
      { level: "400", hex: "#A1B3B5" },
      { level: "500", hex: "#728588" },
      { level: "600", hex: "#5B6A6D" },
      { level: "700", hex: "#444F51" },
      { level: "800", hex: "#2D3536" },
      { level: "900", hex: "#171A1B" },
    ]
  }
];

const TYPOGRAPHY_SCALE = [
  { level: "H1", style: "Título Principal", size: "32px", weight: "700", usage: "Encabezados principales de página", className: "text-h1 font-heading font-bold" },
  { level: "H2", style: "Título Secundario", size: "24px", weight: "600", usage: "Secciones dentro de una página", className: "text-h2 font-heading font-semibold" },
  { level: "H3", style: "Título Terciario", size: "20px", weight: "600", usage: "Subsecciones o tarjetas", className: "text-h3 font-heading font-semibold" },
  { level: "Body", style: "Texto del Cuerpo", size: "16px", weight: "400", usage: "Contenido principal y párrafos", className: "text-body font-normal" },
  { level: "Caption", style: "Nota al Pie", size: "12px", weight: "400", usage: "Metadatos, avisos legales", className: "text-caption font-normal" },
  { level: "Button", style: "Texto del Botón", size: "14px", weight: "500", usage: "Etiquetas de botones y acciones", className: "text-body-sm font-medium" },
];

export function StyleGuide() {
  return (
    <Card className="p-8 rounded-xl shadow-lg border-border overflow-hidden">
      {/* Header */}
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-h1 font-heading font-bold text-foreground">GUÍA DE ESTILOS - ANTIGRAVITY</h1>
        <p className="text-muted-foreground mt-2">Definición de tokens visuales y escala tipográfica (Montserrat & Nunito) extraída de globals.css</p>
      </div>

      {/* Section 1: Semantic Colors */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-h2 font-heading font-bold text-foreground">COLORES DE MARCA (SEMÁNTICOS)</h2>
          <p className="text-muted-foreground">Colores mapeados a variables CSS para consistencia en toda la aplicación.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEMANTIC_COLORS.map((color) => (
            <div key={color.name} className="flex flex-col gap-3 p-4 rounded-lg bg-background border border-border shadow-sm">
              <div className={cn("h-16 w-full rounded-md flex items-center justify-center font-bold shadow-inner", color.class, color.foreground)}>
                {color.name}
              </div>
              <div className="space-y-1">
                <p className="text-body-sm font-bold text-foreground">{color.variable}</p>
                <p className="text-caption text-muted-foreground">{color.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Primitive Scales */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-h2 font-heading font-bold text-foreground">SISTEMA DE COLOR (PRIMITIVOS)</h2>
          <p className="text-muted-foreground">Escalas cromáticas completas definidas en globals.css.</p>
        </div>

        <div className="space-y-10">
          {FULL_SCALES.map((scale) => (
            <div key={scale.name} className="space-y-4">
              <h3 className="text-body-sm font-bold text-muted-foreground uppercase tracking-widest pl-2 border-l-4 border-primary/40">
                {scale.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4">
                {scale.colors.map((color) => (
                  <div key={color.level} className="flex flex-col items-center gap-2 group">
                    <div
                      className={cn(
                        "w-full aspect-square rounded-lg shadow-md border border-border/10 transition-transform group-hover:scale-105",
                        `bg-${scale.prefix}-${color.level}`
                      )}
                      style={{
                        // Fallback mechanism in case tailwind classes aren't generated
                        backgroundColor: `var(--primitive-${scale.prefix}-${color.level})`
                      }}
                    />
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[11px] font-bold text-foreground">{color.level}</span>
                      <span className="text-[9px] text-muted-foreground uppercase font-mono">{color.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Typography System */}
      <section>
        <div className="mb-8">
          <h2 className="text-h2 font-heading font-bold text-foreground">SISTEMA TIPOGRÁFICO</h2>
          <p className="text-muted-foreground">Jerarquía visual utilizando Montserrat para títulos y Nunito para cuerpo de texto.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-background">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border text-left bg-muted/30">
                <th className="py-4 px-6 text-caption font-bold text-muted-foreground uppercase">Nivel</th>
                <th className="py-4 px-6 text-caption font-bold text-muted-foreground uppercase">Estilo</th>
                <th className="py-4 px-6 text-caption font-bold text-muted-foreground uppercase">Tamaño</th>
                <th className="py-4 px-6 text-caption font-bold text-muted-foreground uppercase">Peso</th>
                <th className="py-4 px-6 text-caption font-bold text-muted-foreground uppercase">Uso Sugerido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {TYPOGRAPHY_SCALE.map((type) => (
                <tr key={type.level} className="hover:bg-muted/20 transition-colors group">
                  <td className="py-6 px-6 text-caption font-bold text-primary">{type.level}</td>
                  <td className="py-6 px-6">
                    <span className={cn(type.className, "text-foreground group-hover:text-primary transition-colors")}>
                      {type.style}
                    </span>
                  </td>
                  <td className="py-6 px-6 text-body-sm text-muted-foreground">{type.size}</td>
                  <td className="py-6 px-6 text-body-sm text-muted-foreground">{type.weight}</td>
                  <td className="py-6 px-6 text-body-sm text-foreground/80 max-w-xs">{type.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Card>
  );
}
