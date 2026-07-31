"use client";

import React, { useState } from "react";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Send, Mail, Sparkles, CheckCircle2, AlertCircle, Eye, Info, Sliders, Grid, Code2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function InputGroupShowcase() {
  const [stateId, setStateId] = useState<"default" | "success" | "error">("default");
  const [size, setSize] = useState<"sm" | "default" | "lg">("default");
  const [hasLeftIcon, setHasLeftIcon] = useState(true);
  const [hasRightButton, setHasRightButton] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<InputGroup state="${stateId}" size="${size}"${hasLeftIcon ? ' leftIcon={<Search />}' : ''}${isDisabled ? ' disabled' : ''}>
  <InputGroupInput placeholder="Buscar..." />
  ${hasRightButton ? `<InputGroupButton variant="ghost" size="icon-xs"><Send /></InputGroupButton>` : ''}
</InputGroup>`;

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
              Componentes de Entrada
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Radial Focus & Glow</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Input Group
          </h2>
          <p className="text-sm text-muted-foreground">
            Entradas de texto dinámicas con iconos integrados, botones adosados y efectos cromáticos radiales.
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
            <div className="relative min-h-[300px] rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
              <div className="w-full max-w-sm space-y-2 relative z-10">
                <label className="text-xs font-bold text-foreground block">
                  Campo de Entrada:
                </label>
                <InputGroup
                  state={stateId}
                  size={size}
                  disabled={isDisabled}
                  className="w-full"
                  leftIcon={hasLeftIcon ? <Search className="size-4 text-muted-foreground" /> : undefined}
                  rightIcon={
                    hasRightButton ? (
                      <InputGroupButton variant="ghost" size="icon-xs" disabled={isDisabled}>
                        <Send className="size-3.5" />
                      </InputGroupButton>
                    ) : undefined
                  }
                >
                  <InputGroupInput placeholder="Escribe tu consulta..." disabled={isDisabled} />
                </InputGroup>
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  state=&quot;{stateId}&quot;
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

            {/* Estado */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Estado de Validación:</label>
              <div className="flex gap-2">
                {(["default", "success", "error"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStateId(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border flex-1",
                      stateId === s
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground"
                    )}
                  >
                    {s}
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
                    checked={hasLeftIcon}
                    onCheckedChange={(c) => setHasLeftIcon(!!c)}
                  />
                  <span>Icono Izquierdo (<Search className="size-3 inline" />)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={hasRightButton}
                    onCheckedChange={(c) => setHasRightButton(!!c)}
                  />
                  <span>Botón Adosado (<Send className="size-3 inline" />)</span>
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
              <span className="text-sm font-bold text-foreground">Con Icono</span>
              <Badge variant="primary" appearance="soft" className="text-[10px]">
                Search
              </Badge>
            </div>
            <InputGroup leftIcon={<Search className="size-4" />}>
              <InputGroupInput placeholder="Búsqueda rápida..." />
            </InputGroup>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Con Botón de Envío</span>
              <Badge variant="secondary" appearance="soft" className="text-[10px]">
                Send
              </Badge>
            </div>
            <InputGroup
              leftIcon={<Mail className="size-4" />}
              rightIcon={
                <InputGroupButton variant="ghost" size="icon-xs">
                  <Send className="size-3.5" />
                </InputGroupButton>
              }
            >
              <InputGroupInput placeholder="Introduce tu email..." />
            </InputGroup>
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Estado Validado</span>
              <Badge variant="success" appearance="soft" className="text-[10px]">
                Success
              </Badge>
            </div>
            <InputGroup state="success" rightIcon={<CheckCircle2 className="size-4 text-success" />}>
              <InputGroupInput defaultValue="usuario_verificado@isocronas.com" />
            </InputGroup>
          </div>
        </div>
      )}
    </section>
  );
}
