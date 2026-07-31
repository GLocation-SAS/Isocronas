"use client";

import React from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisorLocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllowAlways: () => void;
  onAllowOnce: () => void;
  onDeny: () => void;
  domain?: string;
}

export function VisorLocationPermissionModal({
  isOpen,
  onClose,
  onAllowAlways,
  onAllowOnce,
  onDeny,
  domain = "glocation.com",
}: VisorLocationPermissionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 flex flex-col gap-2 max-w-sm w-full animate-in fade-in slide-in-from-top-4 duration-300">
      {/* Indicator Pill in Header / Address Bar style */}
      <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-popover/90 backdrop-blur-md border border-border text-popover-foreground text-xs font-semibold shadow-lg">
        <MapPin className="size-3.5 text-primary" />
        <span>¿Deseas usar tu ubicación?</span>
      </div>

      {/* Main Modal Card */}
      <div className="bg-popover text-popover-foreground border border-border rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-4">
        {/* Header: Title + Close */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-sm font-bold tracking-tight">
            {domain} quiere
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Cerrar"
            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Content: Subtitle / Purpose */}
        <div className="flex items-center gap-2.5 text-sm text-foreground font-medium">
          <MapPin className="size-4 text-primary shrink-0" />
          <span>Conocer tu ubicación</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <Button
            onClick={onAllowAlways}
            variant="primary"
            className="w-full rounded-full font-semibold text-xs h-10 shadow-md"
          >
            Permitir mientras visito el sitio
          </Button>

          <Button
            onClick={onAllowOnce}
            variant="secondary"
            className="w-full rounded-full font-semibold text-xs h-10"
          >
            Permitir esta vez
          </Button>

          <Button
            onClick={onDeny}
            variant="secondary"
            className="w-full rounded-full font-semibold text-xs h-10"
          >
            No permitir nunca
          </Button>
        </div>
      </div>
    </div>
  );
}
