"use client"

import * as React from "react"
import { Search } from "@/components/ui/search"
import { Sparkles } from "lucide-react"

export function SearchShowcase() {
  const sizes = [
    { id: "sm", label: "Small (h-9)", sub: "size=\"sm\"" },
    { id: "default", label: "Standard (h-11)", sub: "size=\"default\"" },
    { id: "lg", label: "Large (h-14)", sub: "size=\"lg\"" },
  ] as const

  return (
    <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden">
      <div className="space-y-2">
        <h2 className="text-h3 font-bold flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Componente Search
        </h2>
        <p className="text-sm text-muted-foreground">
          Un componente de búsqueda especializado que hereda los efectos dinámicos de InputGroup, optimizado para ser sencillo y eficiente.
        </p>
      </div>

      <div className="space-y-12">
        {/* MATRIX OF SIZES */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
            Variantes de Tamaño
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {sizes.map((size) => (
              <div key={size.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{size.label}</span>
                  <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{size.sub}</code>
                </div>
                <Search
                  size={size.id as "default" | "sm" | "lg"}
                  placeholder="Escribe algo..."
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
