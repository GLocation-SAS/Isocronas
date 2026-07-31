"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  PieChart,
  CircleDashed,
  Sliders,
  Grid,
  Code2,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral";
type BadgeAppearance = "default" | "outline" | "soft";

export function BadgeShowcase() {
  const [variant, setVariant] = useState<BadgeVariant>("success");
  const [appearance, setAppearance] = useState<BadgeAppearance>("soft");
  const [showIcon, setShowIcon] = useState(true);
  const [iconOnly, setIconOnly] = useState(false);
  const [text, setText] = useState("Completed");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<Badge variant="${variant}" appearance="${appearance}">${
    showIcon ? '<CheckCircle2 /> ' : ''
  }${iconOnly ? '' : text}</Badge>`;

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
              Componentes de Estado
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Pill & Icon Centered</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Badges & Status Tags
          </h2>
          <p className="text-sm text-muted-foreground">
            Indicadores visuales compactos para estados, categorías y etiquetas con soporte para icono e icono solo.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex p-1 rounded-2xl bg-surface border border-border w-fit shrink-0">
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
            Catálogo Compacto
          </button>
        </div>
      </div>

      {/* PLAYGROUND INTERACTIVO */}
      {activeTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          {/* Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative min-h-[260px] rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
              <div className="relative z-10 flex items-center justify-center">
                <Badge
                  variant={variant}
                  appearance={appearance}
                  className={cn(iconOnly && "size-8 p-0 flex items-center justify-center rounded-full")}
                >
                  {showIcon && <CheckCircle2 />}
                  {!iconOnly && text}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  variant=&quot;{variant}&quot;
                </Badge>
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  appearance=&quot;{appearance}&quot;
                </Badge>
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
              <label className="text-xs font-bold text-foreground">Variante Semántica:</label>
              <div className="grid grid-cols-4 gap-2">
                {(["primary", "secondary", "success", "warning", "error", "info", "neutral"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border text-center truncate",
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

            {/* Apariencia */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Apariencia:</label>
              <div className="flex gap-2">
                {(["soft", "default", "outline"] as const).map((app) => (
                  <button
                    key={app}
                    onClick={() => setAppearance(app)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border flex-1",
                      appearance === app
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>

            {/* Texto */}
            {!iconOnly && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Texto del Badge:</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-foreground text-xs focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {/* Modificadores */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block">Modificadores:</label>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={showIcon}
                    onCheckedChange={(c) => setShowIcon(!!c)}
                  />
                  <span>Mostrar Icono</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={iconOnly}
                    onCheckedChange={(c) => setIconOnly(!!c)}
                  />
                  <span>Solo Icono (Modo Circular)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATÁLOGO COMPACTO — INSPIRADO EN LA FOTO */}
      {activeTab === "catalog" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs flex flex-col items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Badges de Estado (Como la Referencia Visual)
            </h3>

            {/* Stack de Badges de la Foto */}
            <div className="grid grid-cols-2 gap-8 items-center justify-items-center">
              {/* Draft */}
              <Badge variant="neutral" appearance="soft" className="size-8 p-0 flex items-center justify-center rounded-full">
                <CircleDashed className="size-4" />
              </Badge>
              <Badge variant="neutral" appearance="soft">
                <CircleDashed className="size-3.5" />
                Draft
              </Badge>

              {/* In-progress */}
              <Badge variant="warning" appearance="soft" className="size-8 p-0 flex items-center justify-center rounded-full">
                <PieChart className="size-4" />
              </Badge>
              <Badge variant="warning" appearance="soft">
                <PieChart className="size-3.5" />
                In-progress
              </Badge>

              {/* In-review */}
              <Badge variant="info" appearance="soft" className="size-8 p-0 flex items-center justify-center rounded-full">
                <Clock className="size-4" />
              </Badge>
              <Badge variant="info" appearance="soft">
                <Clock className="size-3.5" />
                In-review
              </Badge>

              {/* Completed */}
              <Badge variant="success" appearance="soft" className="size-8 p-0 flex items-center justify-center rounded-full">
                <CheckCircle2 className="size-4" />
              </Badge>
              <Badge variant="success" appearance="soft">
                <CheckCircle2 className="size-3.5" />
                Completed
              </Badge>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
