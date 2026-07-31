"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sliders, Grid, Code2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info";
type CheckboxSize = "sm" | "md" | "lg";

export function CheckboxShowcase() {
  const [variant, setVariant] = useState<CheckboxVariant>("primary");
  const [size, setSize] = useState<CheckboxSize>("md");
  const [isChecked, setIsChecked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [label, setLabel] = useState("Acepto los términos y condiciones");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<Checkbox
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
            <span className="text-xs font-mono text-muted-foreground">Estado Binario</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Checkbox Component
          </h2>
          <p className="text-sm text-muted-foreground">
            Casillas de verificación con soporte para múltiples variantes de color semántico, tamaños y estados.
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
                <Checkbox
                  variant={variant}
                  size={size}
                  checked={isChecked}
                  onCheckedChange={(c) => setIsChecked(!!c)}
                  disabled={isDisabled}
                  id="playground-chk"
                />
                <label
                  htmlFor="playground-chk"
                  className="text-sm font-medium text-foreground cursor-pointer select-none"
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
                {(["sm", "md", "lg"] as const).map((s) => (
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

            {/* Label Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Etiqueta (Label):</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-foreground text-xs focus:outline-none focus:border-primary transition-colors"
              />
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
                  <span>Estado Seleccionado (checked)</span>
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
              <span className="text-sm font-bold text-foreground">Primario</span>
              <Badge variant="primary" appearance="soft" className="text-[10px]">
                Primary
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox variant="primary" defaultChecked />
              <span className="text-xs font-medium">Acepto los términos</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Éxito</span>
              <Badge variant="success" appearance="soft" className="text-[10px]">
                Success
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox variant="success" defaultChecked />
              <span className="text-xs font-medium">Verificación completada</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Error</span>
              <Badge variant="error" appearance="soft" className="text-[10px]">
                Error
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox variant="error" defaultChecked />
              <span className="text-xs font-medium">Campo requerido</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
