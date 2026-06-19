"use client";

import * as React from "react";
import { ChatIntranet } from "@/components/ui/chat-intranet";
import { MessageCircle, Sparkles } from "lucide-react";

export function ChatIntranetShowcase() {
  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-border">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageCircle className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-h3 font-heading font-bold text-foreground">Chat Intranet (GloAI)</h3>
          <p className="text-caption text-muted-foreground">
            Interfaz de asistente de IA para la intranet, moderno y amigable.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="grid gap-6">
        <div className="p-8 rounded-xl border border-border shadow-sm flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group bg-muted/10">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Sparkles className="size-32 text-primary" />
          </div>

          <div className="relative z-10 w-full flex justify-center">
            <ChatIntranet className="max-w-2xl" />
          </div>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-background shadow-sm">
            <h5 className="text-body-sm font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-primary" />
              Estilo Minimalista
            </h5>
            <p className="text-caption text-muted-foreground leading-relaxed">
              Colores suaves (blanco y mint), sombras sutiles y bordes redondeados para un aspecto limpio y profesional.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-background shadow-sm">
            <h5 className="text-body-sm font-bold text-foreground mb-1 flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-success" />
              Integración Fácil
            </h5>
            <p className="text-caption text-muted-foreground leading-relaxed">
              Estructura lista para integrarse en paneles laterales o modales dentro de la intranet corporativa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
