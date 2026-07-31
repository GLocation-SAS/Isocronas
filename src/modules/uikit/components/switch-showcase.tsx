"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Sliders, Grid, Code2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type SwitchVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info";
type SwitchSize = "sm" | "default" | "lg";

export function SwitchShowcase() {
  const [variant, setVariant] = useState<SwitchVariant>("primary");
  const [size, setSize] = useState<SwitchSize>("default");
  const [isChecked, setIsChecked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [label, setLabel] = useState("Notificaciones en tiempo real");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<Switch
  variant="${variant}"
  size="${size}"${isChecked ? " defaultChecked" : ""}${isDisabled ? " disabled" : ""}
/>`;

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
              Componentes de Selección
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Switch / Toggle</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Switch Component
          </h2>
          <p className="text-sm text-muted-foreground">
            Interruptores de estado tipo toggle con variantes de color semántico y tamaños adaptativos.
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
              <div className="flex items-center space-x-3 group relative z-10">
                <Switch
                  variant={variant}
                  size={size}
                  checked={isChecked}
                  onCheckedChange={setIsChecked}
                  disabled={isDisabled}
                  id="playground-switch"
                />
                <label
                  htmlFor="playground-switch"
                  className="text-sm font-semibold text-foreground cursor-pointer select-none"
                >
                  {label}
                </label>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  variant=&quot;{variant}&quot;
                </Badge>
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  size=&quot;{size}&quot;
                </Badge>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <Code2 className="size-4 text-primary shrink-0 ml-1" />
                <code className="text-xs font-mono text-foreground font-semibold truncate">
                  {generatedCode.replace(/\n/g, " ")}
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
              <div className="grid grid-cols-3 gap-2">
                {(["primary", "secondary", "success", "warning", "error", "info"] as const).map((v) => (
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

            {/* Tamaño */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Tamaño:</label>
              <div className="flex gap-2">
                {(["sm", "default", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border flex-1",
                      size === s
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Modificadores */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block">Modificadores:</label>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(c) => setIsChecked(!!c)}
                  />
                  <span>Estado Encendido (checked)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={isDisabled}
                    onCheckedChange={(c) => setIsDisabled(!!c)}
                  />
                  <span>Deshabilitado (disabled)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATÁLOGO COMPACTO */}
      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Primary</span>
              <Badge variant="primary" appearance="soft" className="text-[10px]">
                Default
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Modo Oscuro</span>
              <Switch variant="primary" defaultChecked />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Success</span>
              <Badge variant="success" appearance="soft" className="text-[10px]">
                Activo
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Geolocalización GPS</span>
              <Switch variant="success" defaultChecked />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Secondary</span>
              <Badge variant="secondary" appearance="soft" className="text-[10px]">
                Secundario
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Sonidos de alerta</span>
              <Switch variant="secondary" defaultChecked />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
