"use client";

import * as React from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleShowcase() {
  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-h3 font-heading font-bold text-foreground mb-1">
          Toggle
        </h3>
        <p className="text-muted-foreground text-body-sm">
          Botones de estado binario para activar o desactivar opciones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Toggles */}
        <div className="p-6 rounded-xl border border-border shadow-sm space-y-4">
          <h4 className="text-body-sm font-semibold text-primary uppercase tracking-wider">
            Variantes y Estados
          </h4>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Default</p>
              <Toggle aria-label="Toggle bold">
                <Bold className="size-4" />
              </Toggle>
            </div>
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Outline</p>
              <Toggle variant="outline" aria-label="Toggle italic">
                <Italic className="size-4" />
              </Toggle>
            </div>
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">With Text</p>
              <Toggle variant="outline" className="gap-2 px-3">
                <Underline className="size-4" />
                Underline
              </Toggle>
            </div>
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Disabled</p>
              <Toggle disabled aria-label="Disabled toggle">
                <Bold className="size-4" />
              </Toggle>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="p-6 rounded-xl border border-border shadow-sm space-y-4">
          <h4 className="text-body-sm font-semibold text-primary uppercase tracking-wider">
            Tamaños
          </h4>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Small</p>
              <Toggle size="sm" variant="outline">
                <Bold className="size-4" />
              </Toggle>
            </div>
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Default</p>
              <Toggle variant="outline">
                <Bold className="size-4" />
              </Toggle>
            </div>
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Large</p>
              <Toggle size="lg" variant="outline">
                <Bold className="size-4" />
              </Toggle>
            </div>
          </div>
        </div>

        {/* Toggle Group - Single */}
        <div className="p-6 rounded-xl border border-border shadow-sm space-y-4">
          <h4 className="text-body-sm font-semibold text-primary uppercase tracking-wider">
            Toggle Group (Single)
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Alineación</p>
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

        {/* Toggle Group - Multiple */}
        <div className="p-6 rounded-xl border border-border shadow-sm space-y-4">
          <h4 className="text-body-sm font-semibold text-primary uppercase tracking-wider">
            Toggle Group (Multiple)
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-caption text-muted-foreground">Formato de Texto</p>
              <ToggleGroup type="multiple" variant="outline">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="size-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                  <Underline className="size-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
