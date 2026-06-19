"use client";

import * as React from "react";
import ChatAssistant from "@/components/ui/ChatAssistant";
import { MessageSquare, Sparkles, Send } from "lucide-react";

export function ChatAssistantShowcase() {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageSquare className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-h3 font-heading font-bold text-foreground">Chat Assistant</h3>
          <p className="text-caption text-muted-foreground">
            Asistente de IA flotante con animaciones y estados interactivos.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="grid gap-6">
        <div className="p-8 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="size-32 text-primary" />
          </div>

          <div className="text-center space-y-4 max-w-md relative z-10">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
              <Send className="size-8 text-primary animate-pulse" />
            </div>
            <h4 className="text-h4 font-heading font-semibold text-foreground">Chat Interactivo</h4>
            <p className="text-body-sm text-muted-foreground">
              Haz clic en el botón flotante en la esquina inferior derecha para interactuar con el asistente virtual.
            </p>
            <div className="pt-4">
              <p className="text-caption font-medium text-primary uppercase tracking-widest">
                Prueba la Interfaz →
              </p>
            </div>
          </div>

          {/* Note about position */}
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-[10px] text-muted-foreground/60 italic">
              * El componente se renderiza con posición fija (fixed) en la ventana global.
            </p>
          </div>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-background shadow-sm">
            <h5 className="text-body-sm font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-primary" />
              Diseño
            </h5>
            <p className="text-caption text-muted-foreground leading-relaxed">
              Uso de glassmorphism, gradientes suaves y sombras profundas para una apariencia moderna.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-background shadow-sm">
            <h5 className="text-body-sm font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-success" />
              Interactividad
            </h5>
            <p className="text-caption text-muted-foreground leading-relaxed">
              Animaciones de entrada/salida y transiciones fluidas en el botón disparador.
            </p>
          </div>
        </div>
      </div>

      {/* The actual component - it's fixed so it will appear in the corner of the whole page */}
      <ChatAssistant />
    </section>
  );
}
