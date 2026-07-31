"use client";

import React, { useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Sliders, Grid, Code2, Copy, Check, Sparkles } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function ToggleShowcase() {
  const [variant, setVariant] = useState<"default" | "outline">("outline");
  const [size, setSize] = useState<"default" | "sm" | "lg">("default");
  const [isPressed, setIsPressed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<Toggle variant="${variant}" size="${size}"${isPressed ? " pressed" : ""}${isDisabled ? " disabled" : ""}>
  <Bold className="size-4" />
</Toggle>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-border/80 bg-background shadow-xs overflow-hidden">
      {/* HEADER CON SELECTOR DE MODO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="primary" appearance="soft">
              Componentes de Selección
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Toggle & Group</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Toggle & ToggleGroup
          </h2>
          <p className="text-sm text-muted-foreground">
            Botones de estado binario para activar u ordenar opciones individuales y agrupadas.
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
              <div className="relative z-10 flex items-center gap-4">
                <Toggle
                  variant={variant}
                  size={size}
                  pressed={isPressed}
                  onPressedChange={setIsPressed}
                  disabled={isDisabled}
                  aria-label="Toggle Bold"
                >
                  <Bold className="size-4" />
                </Toggle>
                <Toggle
                  variant={variant}
                  size={size}
                  disabled={isDisabled}
                  className="gap-2 px-3"
                >
                  <Underline className="size-4" />
                  Subrayado
                </Toggle>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  pressed={isPressed ? "true" : "false"}
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
              <label className="text-xs font-bold text-foreground">Variante:</label>
              <div className="flex gap-2">
                {(["default", "outline"] as const).map((v) => (
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
                    checked={isPressed}
                    onCheckedChange={(c) => setIsPressed(!!c)}
                  />
                  <span>Estado Presionado (pressed)</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Variantes Básicas</span>
              <Badge variant="neutral" appearance="soft" className="text-[10px]">
                Toggle
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Toggle variant="default" aria-label="Bold">
                <Bold className="size-4" />
              </Toggle>
              <Toggle variant="outline" aria-label="Italic">
                <Italic className="size-4" />
              </Toggle>
              <Toggle variant="outline" className="gap-2 px-3">
                <Underline className="size-4" />
                Subrayado
              </Toggle>
              <Toggle disabled aria-label="Disabled">
                <Bold className="size-4" />
              </Toggle>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">ToggleGroup (Single & Multiple)</span>
              <Badge variant="neutral" appearance="soft" className="text-[10px]">
                Group
              </Badge>
            </div>
            <div className="flex flex-col gap-4">
              <ToggleGroup type="single" variant="outline" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="size-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
