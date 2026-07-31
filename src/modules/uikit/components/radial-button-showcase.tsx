"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  Plus,
  ArrowRight,
  Copy,
  Check,
  Sliders,
  Grid,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info" | "neutral"
  | "ghost";

type ButtonSize = "lg" | "default" | "sm" | "icon" | "icon-xs";

const VARIANTS: { id: ButtonVariant; label: string; badge: string }[] = [
  { id: "primary", label: "Primary", badge: "Azul Principal" },
  { id: "secondary", label: "Secondary", badge: "Verde Petróleo" },
  { id: "success", label: "Success", badge: "Verde Éxito" },
  { id: "warning", label: "Warning", badge: "Ámbar Preventivo" },
  { id: "danger", label: "Danger", badge: "Rojo Crítico" },
  { id: "info", label: "Info", badge: "Azul Informativo" },
  { id: "neutral", label: "Neutral", badge: "Gris Neutro" },
  { id: "ghost", label: "Ghost", badge: "Transparente" },
];

const SIZES: { id: ButtonSize; label: string; px: string }[] = [
  { id: "lg", label: "Large", px: "56px" },
  { id: "default", label: "Default", px: "44px" },
  { id: "sm", label: "Small", px: "36px" },
  { id: "icon", label: "Icon", px: "44px" },
  { id: "icon-xs", label: "Icon XS", px: "28px" },
];

export function RadialButtonShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<ButtonVariant>("primary");
  const [selectedSize, setSelectedSize] = useState<ButtonSize>("default");
  const [hasLeftIcon, setHasLeftIcon] = useState(false);
  const [hasRightIcon, setHasRightIcon] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Acción Principal");
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const isIconOnly = selectedSize === "icon" || selectedSize === "icon-xs";

  // Generar código JSX dinámico
  const iconProps = [];
  if (hasLeftIcon && !isIconOnly) iconProps.push('leftIcon={<Plus />}');
  if (hasRightIcon && !isIconOnly) iconProps.push('rightIcon={<ArrowRight />}');
  if (isIconOnly) iconProps.push('leftIcon={<Plus />}');
  if (isDisabled) iconProps.push('disabled');

  const generatedCode = `<Button variant="${selectedVariant}" size="${selectedSize}"${
    iconProps.length > 0 ? " " + iconProps.join(" ") : ""
  }>${isIconOnly ? "" : buttonText}</Button>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="grid gap-8 p-6 sm:p-8 rounded-3xl border border-border/80 bg-background shadow-xs overflow-hidden">
      {/* ── HEADER CON SELECTOR DE MODO DE VISTA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="primary" appearance="soft">
              Componentes Radiales
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">v2.0</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Botones & Acciones Interactivas
          </h2>
          <p className="text-sm text-muted-foreground">
            Inspecciona componentes en vivo o explora el catálogo completo de variantes.
          </p>
        </div>

        {/* View Mode Tabs */}
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

      {/* ── MODALIDAD 1: PLAYGROUND INTERACTIVO ── */}
      {activeTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          {/* Canvas de Previsualización en Vivo */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative min-h-[320px] rounded-3xl border border-border/80 bg-surface/40 backdrop-blur-xl flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner group">
              <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

              {/* Botón Renderizado en Tiempo Real */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <Button
                  variant={selectedVariant}
                  size={selectedSize}
                  disabled={isDisabled}
                  leftIcon={
                    hasLeftIcon || isIconOnly ? (
                      <Plus className={selectedSize === "icon-xs" ? "size-3" : "size-4"} />
                    ) : undefined
                  }
                  rightIcon={
                    hasRightIcon && !isIconOnly ? <ArrowRight className="size-4" /> : undefined
                  }
                >
                  {!isIconOnly && buttonText}
                </Button>
              </div>

              {/* Etiqueta flotante con especificaciones */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  variant=&quot;{selectedVariant}&quot;
                </Badge>
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  size=&quot;{selectedSize}&quot;
                </Badge>
              </div>
            </div>

            {/* Generador de Código JSX */}
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

          {/* Panel de Controles (Inspector) */}
          <div className="lg:col-span-5 p-6 rounded-3xl border border-border/80 bg-card space-y-6 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b border-border/50 pb-3">
              <Sliders className="size-4 text-primary" />
              Inspector de Propiedades
            </h3>

            {/* Control 1: Variante */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Variante de Color:</label>
              <div className="grid grid-cols-4 gap-2">
                {VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={cn(
                      "px-2.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all border text-center truncate",
                      selectedVariant === v.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                    )}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Tamaño */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground">Tamaño:</label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5",
                      selectedSize === s.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-surface text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
                    )}
                  >
                    <span>{s.label}</span>
                    <span className="text-[9px] opacity-70 font-mono">({s.px})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Texto (solo si no es icono solo) */}
            {!isIconOnly && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Texto del Botón:</label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface border border-border text-foreground text-xs focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}

            {/* Control 4: Switches de Iconos y Estados */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block">Modificadores:</label>
              <div className="flex flex-wrap gap-4">
                {!isIconOnly && (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                      <Checkbox
                        checked={hasLeftIcon}
                        onCheckedChange={(c) => setHasLeftIcon(!!c)}
                      />
                      <span>Icono Izquierdo</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                      <Checkbox
                        checked={hasRightIcon}
                        onCheckedChange={(c) => setHasRightIcon(!!c)}
                      />
                      <span>Icono Derecho</span>
                    </label>
                  </>
                )}

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

      {/* ── MODALIDAD 2: CATÁLOGO COMPACTO REORGANIZADO ── */}
      {activeTab === "catalog" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VARIANTS.map((variant) => (
              <div
                key={variant.id}
                className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold capitalize text-foreground">
                      {variant.id}
                    </span>
                    <Badge variant="neutral" appearance="soft" className="text-[10px]">
                      {variant.badge}
                    </Badge>
                  </div>
                  <code className="text-[10px] font-mono text-muted-foreground">
                    variant=&quot;{variant.id}&quot;
                  </code>
                </div>

                {/* Fila de Tamaños Compacta */}
                <div className="flex flex-wrap items-center gap-3 py-1">
                  <Button variant={variant.id} size="lg">
                    Large (56px)
                  </Button>

                  <Button variant={variant.id} size="default">
                    Default (44px)
                  </Button>

                  <Button variant={variant.id} size="sm">
                    Small (36px)
                  </Button>

                  <Button variant={variant.id} size="icon">
                    <Plus className="size-4" />
                  </Button>

                  <Button variant={variant.id} size="icon-xs">
                    <Plus className="size-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
