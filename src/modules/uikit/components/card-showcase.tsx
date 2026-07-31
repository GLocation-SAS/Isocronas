"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardIcon,
  CardDecorativeIcon,
  CardBadge,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  Zap,
  Sliders,
  Grid,
  Code2,
  Copy,
  Check,
  User,
  Shield,
  PenTool,
  Languages,
  Layers,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CardShowcase() {
  const [variant, setVariant] = useState<"default" | "featured">("featured");
  const [glow, setGlow] = useState<"none" | "primary-info" | "success-warning" | "danger-secondary">("none");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("catalog");

  const generatedCode = `<Card variant="${variant}" glow="${glow}">
  <CardBadge>Design</CardBadge>
  <CardTitle>Product Design</CardTitle>
  <CardDescription>320 lecciones interactivas</CardDescription>
</Card>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-border/80 bg-background shadow-xs overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="primary" appearance="soft">
              Componentes de Contención
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Ambient Bottom Glow</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Zap className="size-5 text-primary" />
            Cards & Contenedores
          </h2>
          <p className="text-sm text-muted-foreground">
            Paneles modulares para agrupar información con resplandor ambiental inferior pastel e iconos decorativos.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex p-1 rounded-2xl bg-surface border border-border w-fit shrink-0">
          <button
            onClick={() => setActiveTab("catalog")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
              activeTab === "catalog"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid className="size-3.5" />
            Catálogo & Muestras
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2",
              activeTab === "playground"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Sliders className="size-3.5" />
            Playground Interactivo
          </button>
        </div>
      </div>

      {/* CATÁLOGO DE CARDS — VARIANTES FEATURED CON ILUMINACIÓN INFERIOR COMO LA FOTO */}
      {activeTab === "catalog" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* FEATURED VARIANT — Exact to reference photo with soft bottom glow */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                Variante Featured (Iluminación Ambiental Inferior)
              </h3>
              <p className="text-xs text-muted-foreground">
                Cards suaves con resplandor pastel en la parte inferior e icono representativo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Product Design (Yellow Glow) */}
              <Card variant="featured" className="border-border/80">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-warning/15 flex items-center justify-center text-warning shrink-0">
                    <PenTool className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Victoria P.</h4>
                    <p className="text-[11px] text-muted-foreground">Team Lead</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    &quot;We prioritized a structured approach to enhance credit management features efficiently.&quot;
                  </p>
                </div>

                <CardDecorativeIcon className="opacity-15 text-warning">
                  <PenTool className="size-32" />
                </CardDecorativeIcon>

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 size-56 rounded-full bg-warning/35 blur-3xl pointer-events-none" />
              </Card>

              {/* Card 2: Iterative Design (Blue Glow) */}
              <Card variant="featured" className="border-border/80">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-info/15 flex items-center justify-center text-info shrink-0">
                    <Layers className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Dmitry K.</h4>
                    <p className="text-[11px] text-muted-foreground">UX/UI Designer</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    &quot;Iterative design sprints helped refine user experience based on continuous feedback.&quot;
                  </p>
                </div>

                <CardDecorativeIcon className="opacity-15 text-info">
                  <Layers className="size-32" />
                </CardDecorativeIcon>

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 size-56 rounded-full bg-info/35 blur-3xl pointer-events-none" />
              </Card>

              {/* Card 3: Interface Adaptation (Pink Glow) */}
              <Card variant="featured" className="border-border/80">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-danger/15 flex items-center justify-center text-danger shrink-0">
                    <Languages className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">Stan D.</h4>
                    <p className="text-[11px] text-muted-foreground">CIO</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    &quot;We adapted the interface to ensure seamless navigation across all devices.&quot;
                  </p>
                </div>

                <CardDecorativeIcon className="opacity-15 text-danger">
                  <Languages className="size-32" />
                </CardDecorativeIcon>

                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 size-56 rounded-full bg-danger/35 blur-3xl pointer-events-none" />
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* PLAYGROUND INTERACTIVO */}
      {activeTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          {/* Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative min-h-[300px] rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
              <div className="w-full max-w-sm relative z-10">
                <Card variant={variant} glow={glow}>
                  <CardHeader>
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <Zap className="size-6 text-primary" />
                    </div>
                    <CardTitle>Card Interactivo</CardTitle>
                    <CardDescription>
                      Previsualización en tiempo real con configuración de iluminación ambiental.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <Code2 className="size-4 text-primary shrink-0 ml-1" />
                <code className="text-xs font-mono text-foreground font-semibold truncate">
                  {generatedCode}
                </code>
              </div>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary/20 transition-all shrink-0"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3.5 text-success" />
                    <span className="text-success font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copiar JSX</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Inspector Panel */}
          <div className="lg:col-span-5 p-6 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Sliders className="size-4 text-primary" />
              Inspector de Propiedades
            </h3>

            {/* Variante */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Variante:</label>
              <div className="flex gap-2">
                {(["default", "featured"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border flex-1",
                      variant === v
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Resplandor (Glow) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Aura / Resplandor Ambient:</label>
              <div className="grid grid-cols-2 gap-2">
                {(["none", "primary-info", "success-warning", "danger-secondary"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGlow(g)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border text-center truncate",
                      glow === g
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
