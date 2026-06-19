"use client";

import * as React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,

  AvatarBadge,
} from "@/components/ui/avatar";
import { User } from "lucide-react";

export function AvatarShowcase() {
  return (
    <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-h3 font-heading font-bold text-foreground">Avatar</h3>
        <p className="text-muted-foreground">
          Componentes de imagen de usuario con soporte para fallbacks, insignias y grupos.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Sizes */}
        <div className="space-y-4 p-6 rounded-xl border border-border shadow-sm">
          <h4 className="text-body font-semibold text-primary uppercase tracking-wider">Tamaños</h4>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar size="sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-caption text-muted-foreground">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-caption text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-caption text-muted-foreground">Large</span>
            </div>
          </div>
        </div>

        {/* Fallbacks & Badges */}
        <div className="space-y-4 p-6 rounded-xl border border-border shadow-sm">
          <h4 className="text-body font-semibold text-primary uppercase tracking-wider">Fallbacks e Insignias</h4>
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-caption text-muted-foreground">Iniciales</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  <User className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-caption text-muted-foreground">Icono</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar className="relative">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-success" />
              </Avatar>
              <span className="text-caption text-muted-foreground">Online</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Avatar size="lg" className="relative">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-danger" />
              </Avatar>
              <span className="text-caption text-muted-foreground">Busy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
