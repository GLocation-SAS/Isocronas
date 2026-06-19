import { Button } from "@/components/ui/button";
import { Sparkles, Plus } from "lucide-react";

export function RadialButtonShowcase() {
  const variants = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "neutral",
    "ghost",
    "info",
  ] as const;

  const sizes = [
    { id: "lg", label: "Large", px: "56px" },
    { id: "default", label: "Default", px: "44px" },
    { id: "sm", label: "Small", px: "36px" },
    { id: "icon", label: "Icon", px: "44px" },
    { id: "icon-xs", label: "Icon XS", px: "28px" },
  ] as const;

  return (
    <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden">
      <div className="space-y-2">
        <h2 className="text-h3 font-bold flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Matriz de Botones Radiales
        </h2>
        <p className="text-sm text-muted-foreground">
          Referencia visual de todas las variantes y tamaños disponibles con sus alturas en píxeles.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
          {/* HEADER ROW */}
          <div className="grid grid-cols-[140px_repeat(5,1fr)] gap-4 items-end mb-6 border-b border-border pb-4">
            <div className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
              Variante
            </div>
            {sizes.map((size) => (
              <div key={size.id} className="text-center space-y-1">
                <div className="text-xs font-bold text-foreground">{size.label}</div>
                <div className="text-[11px] text-primary-300 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 inline-block font-mono">
                  {size.px}
                </div>
              </div>
            ))}
          </div>

          {/* CONTENT ROWS */}
          <div className="space-y-6">
            {variants.map((variant) => (
              <div key={variant} className="grid grid-cols-[140px_repeat(5,1fr)] gap-4 items-center">
                {/* VARIANT LABEL */}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold capitalize text-foreground">{variant}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">variant=&quot;{variant}&quot;</span>
                </div>

                {/* SIZE CELLS */}
                {sizes.map((size) => (
                  <div key={`${variant}-${size.id}`} className="flex justify-center">
                    <Button
                      variant={variant}
                      size={size.id as "default" | "sm" | "lg" | "icon" | "icon-xs"}
                      leftIcon={size.id.includes("icon") ? <Plus className={size.id === "icon-xs" ? "size-3" : "size-5"} /> : undefined}
                    >
                      {!size.id.includes("icon") && "Action"}
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-xl border border-border/50">
        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-3">Notas de Implementación</h3>
        <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
          <li>Todos los botones usan <code className="text-primary font-mono bg-primary/5 px-1 rounded">rounded-full</code> por defecto.</li>
          <li>El efecto radial es acelerado por GPU y se activa en <code className="text-foreground">hover</code>.</li>
          <li>Los iconos escalan automáticamente según el tamaño del botón (ej: size-3 para XS).</li>
        </ul>
      </div>
    </section>
  );
}

