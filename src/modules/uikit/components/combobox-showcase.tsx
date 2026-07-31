"use client";

import React, { useState, useMemo } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
} from "@/components/ui/combobox";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, CheckCircle2, AlertCircle, Info, Sliders, Grid, Code2, Copy, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const fruits = [
  { value: "apple", label: "Manzana" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Arándano" },
  { value: "grapes", label: "Uvas" },
  { value: "orange", label: "Naranja" },
  { value: "strawberry", label: "Fresa" },
  { value: "kiwi", label: "Kiwi" },
  { value: "mango", label: "Mango" },
];

function ComboboxExample({
  stateId = "default",
  showSearchIcon = true,
  disabled = false,
  showClear = true,
  placeholder = "Buscar fruta...",
}: {
  stateId?: "default" | "success" | "error";
  showSearchIcon?: boolean;
  disabled?: boolean;
  showClear?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredFruits = useMemo(() => {
    return fruits.filter((fruit) =>
      fruit.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleValueChange = (val: string | null) => {
    setValue(val);
    if (val) {
      const fruit = fruits.find((f) => f.value === val);
      if (fruit) setSearch(fruit.label);
    } else {
      setSearch("");
    }
  };

  const handleInputValueChange = (newSearch: string) => {
    const fruit = fruits.find((f) => f.value === newSearch);
    if (fruit) {
      setSearch(fruit.label);
    } else {
      setSearch(newSearch);
    }
  };

  return (
    <Combobox
      value={disabled ? null : value}
      onValueChange={handleValueChange}
      disabled={disabled}
      inputValue={search}
      onInputValueChange={handleInputValueChange}
    >
      <ComboboxInput
        state={stateId}
        placeholder={placeholder}
        showClear={showClear}
        showSearchIcon={showSearchIcon}
        disabled={disabled}
        className="w-full"
      />
      <ComboboxContent state={stateId}>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frutas Disponibles</ComboboxLabel>
            {filteredFruits.map((fruit) => (
              <ComboboxItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
          {filteredFruits.length === 0 && (
            <ComboboxEmpty>No se encontraron resultados.</ComboboxEmpty>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export function ComboboxShowcase() {
  const [stateId, setStateId] = useState<"default" | "success" | "error">("default");
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [showClear, setShowClear] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");

  const generatedCode = `<Combobox value={value} onValueChange={setValue}>
  <ComboboxInput
    state="${stateId}"
    placeholder="Buscar opción..."
    showSearchIcon={${showSearchIcon}}
    showClear={${showClear}}${isDisabled ? " disabled" : ""}
  />
  <ComboboxContent state="${stateId}">
    <ComboboxList>
      <ComboboxGroup>
        <ComboboxLabel>Categoría</ComboboxLabel>
        <ComboboxItem value="1">Opción 1</ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;

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
            <span className="text-xs font-mono text-muted-foreground">Buscador Integrado</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Combobox con Buscador
          </h2>
          <p className="text-sm text-muted-foreground">
            Buscadores inteligentes con autocompletado en tiempo real, icono de búsqueda integrado y validaciones visuales.
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
                  Selecciona o busca una fruta:
                </label>
                <ComboboxExample
                  stateId={stateId}
                  showSearchIcon={showSearchIcon}
                  showClear={showClear}
                  disabled={isDisabled}
                  placeholder="Buscar en el catálogo..."
                />
              </div>

              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                <Badge variant="neutral" appearance="soft" className="font-mono text-[10px]">
                  state=&quot;{stateId}&quot;
                </Badge>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <Code2 className="size-4 text-primary shrink-0 ml-1" />
                <code className="text-xs font-mono text-foreground font-semibold truncate">
                  {generatedCode.split("\n")[1]}
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

            {/* Estado Visual */}
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

            {/* Modificadores */}
            <div className="space-y-3 pt-3 border-t border-border/50">
              <label className="text-xs font-bold text-foreground block">Opciones del Buscador:</label>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={showSearchIcon}
                    onCheckedChange={(c) => setShowSearchIcon(!!c)}
                  />
                  <span>Icono de Búsqueda Integrado (<Search className="size-3 inline" />)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={showClear}
                    onCheckedChange={(c) => setShowClear(!!c)}
                  />
                  <span>Boton de Limpieza Rápida</span>
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
              <span className="text-sm font-bold text-foreground">Estado Default</span>
              <Badge variant="primary" appearance="soft" className="text-[10px]">
                Standard
              </Badge>
            </div>
            <ComboboxExample stateId="default" showSearchIcon={true} showClear={true} />
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Estado Success</span>
              <Badge variant="success" appearance="soft" className="text-[10px]">
                Validado
              </Badge>
            </div>
            <ComboboxExample stateId="success" showSearchIcon={true} showClear={true} />
          </div>

          <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Estado Error</span>
              <Badge variant="error" appearance="soft" className="text-[10px]">
                Requerido
              </Badge>
            </div>
            <ComboboxExample stateId="error" showSearchIcon={true} showClear={true} />
          </div>
        </div>
      )}
    </section>
  );
}
