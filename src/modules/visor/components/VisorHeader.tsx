"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Map, User, Briefcase, Terminal, Sun, Moon, ChevronDown, Check, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toggleTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const PROFILES = [
  { id: "ciudadano", label: "Ciudadano", description: "Exploración básica de accesibilidad urbana", icon: User },
  { id: "profesional", label: "Profesional", description: "Análisis comercial y métricas de negocio", icon: Briefcase },
  { id: "tecnico", label: "Técnico", description: "Consola avanzada, datos crudos y API", icon: Terminal },
] as const;

interface VisorHeaderProps {
  onOpenGuide: () => void;
  profile: string;
  onProfileChange: (profile: string) => void;
}

export function VisorHeader({ onOpenGuide, profile, onProfileChange }: VisorHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const current = document.documentElement.getAttribute("data-theme");
      setIsDark(current === "dark");
    }
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDark((prev) => !prev);
  };

  const currentProfile = PROFILES.find((p) => p.id === profile) ?? PROFILES[0];
  const ProfileIcon = currentProfile.icon;

  const handleSelectProfile = (id: string) => {
    if (id === profile) return;
    setDropdownOpen(false);
    setPendingProfile(id);
  };

  const confirmChange = () => {
    if (pendingProfile) {
      onProfileChange(pendingProfile);
      setPendingProfile(null);
    }
  };

  const cancelChange = () => {
    setPendingProfile(null);
  };

  const pendingProfileData = PROFILES.find((p) => p.id === pendingProfile);

  return (
    <>
      <header className="rounded-none border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 z-50 relative shrink-0">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6 w-full">
          {/* Izquierda: Título y descripción */}
          <div className="flex items-center gap-3 z-10">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-xs">
              <Map className="size-4.5" />
            </div>
            <div className="text-left">
              <h1 className="text-sm sm:text-base font-extrabold leading-none tracking-tight text-foreground">
                Isócronas
              </h1>
              <p className="text-[10.5px] text-muted-foreground mt-0.5 font-medium leading-none">
                Geovisor de accesibilidad
              </p>
            </div>
          </div>

          {/* Derecha: Perfil Selector + Guía + Toggle */}
          <div className="flex items-center gap-3 z-10">

            {/* Selector de perfil */}
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded-full border border-border/80 bg-surface/50 hover:bg-muted/60 transition-colors cursor-pointer outline-none">
                  <ProfileIcon className="size-3.5 text-primary" />
                  <span className="hidden md:block text-xs font-semibold text-foreground">{currentProfile.label}</span>
                  <ChevronDown className={cn("size-3 text-muted-foreground transition-transform duration-200", dropdownOpen && "rotate-180")} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-72 p-2 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl">
                <div className="px-3 py-2 mb-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Perfil de análisis</p>
                </div>
                {PROFILES.map((p) => {
                  const isActive = p.id === profile;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProfile(p.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer text-left",
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "border border-transparent hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "flex size-8 items-center justify-center rounded-lg shrink-0",
                        isActive ? "bg-primary/15 text-primary" : "bg-muted/60 text-muted-foreground"
                      )}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs font-bold", isActive ? "text-primary" : "text-foreground")}>{p.label}</p>
                        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{p.description}</p>
                      </div>
                      {isActive && (
                        <Check className="size-4 text-primary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="neutral" 
              size="sm" 
              onClick={onOpenGuide}
              className="size-7 md:h-8 md:w-auto text-xs px-0 md:px-3 rounded-full md:rounded-lg"
              leftIcon={
                <svg className="size-3.5 md:mr-1 text-muted-foreground group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            >
              <span className="hidden md:block">Guía de uso</span>
            </Button>

            {/* Toggle Modo Claro / Oscuro */}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="neutral" 
                    size="icon" 
                    onClick={handleToggleTheme}
                    className="size-7 rounded-full border border-border/80 bg-surface hover:bg-accent cursor-pointer shrink-0"
                    aria-label="Cambiar modo claro/oscuro"
                  >
                    {isDark ? (
                      <Sun className="size-3.5 text-amber-400 animate-in spin-in-90 duration-300" />
                    ) : (
                      <Moon className="size-3.5 text-primary animate-in spin-in-90 duration-300" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent variant="info" side="bottom" sideOffset={6} className="text-xs font-bold">
                  {isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Modal de confirmación de cambio de perfil */}
      <Dialog open={!!pendingProfile} onOpenChange={(open) => !open && cancelChange()}>
        <DialogContent variant="warning" size="sm">
          <DialogHeader>
            <DialogTitle>Cambiar perfil de análisis</DialogTitle>
            <DialogDescription>
              Estás a punto de cambiar de <strong className="text-foreground">{currentProfile.label}</strong> a <strong className="text-foreground">{pendingProfileData?.label}</strong>. 
              Esto puede modificar las herramientas y datos visibles en el visor.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/5 border border-warning/20">
            <AlertTriangle className="size-4 text-warning shrink-0" />
            <p className="text-[11px] text-muted-foreground leading-snug">
              Los filtros y configuraciones actuales se reiniciarán al cambiar de perfil.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="neutral" size="sm" onClick={cancelChange}>Cancelar</Button>
            </DialogClose>
            <Button variant="primary" size="sm" onClick={confirmChange}>
              Cambiar a {pendingProfileData?.label}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
