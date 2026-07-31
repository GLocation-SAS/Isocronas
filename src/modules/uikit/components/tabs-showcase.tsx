"use client";

import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles,
  Sliders,
  Grid,
  Code2,
  Copy,
  Check,
  User,
  Shield,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TabsShowcase() {
  const [showIcons, setShowIcons] = useState(true);
  const [activeTab, setActiveTab] = useState<"playground" | "catalog">("playground");
  const [copiedCode, setCopiedCode] = useState(false);

  const generatedCode = `<Tabs defaultValue="profile" className="w-full">
  <TabsList>
    <TabsTrigger value="profile">${showIcons ? '<User className="size-3.5" /> ' : ''}PROFILE</TabsTrigger>
    <TabsTrigger value="security">${showIcons ? '<Shield className="size-3.5" /> ' : ''}SECURITY</TabsTrigger>
    <TabsTrigger value="config">${showIcons ? '<Settings className="size-3.5" /> ' : ''}CONFIG</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Perfil del usuario</TabsContent>
  <TabsContent value="security">Opciones de seguridad</TabsContent>
  <TabsContent value="config">Configuración general</TabsContent>
</Tabs>`;

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
              Componentes de Organización
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Capsule Glassmorphism</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Tabs Component
          </h2>
          <p className="text-sm text-muted-foreground">
            Navegación por pestañas con estética de cápsula y glassmorphism, coherente con el sistema de Breadcrumbs.
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
              <div className="w-full max-w-md relative z-10">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="w-full justify-center">
                    <TabsTrigger value="profile">
                      {showIcons && <User className="size-3.5" />}
                      PROFILE
                    </TabsTrigger>
                    <TabsTrigger value="security">
                      {showIcons && <Shield className="size-3.5" />}
                      SECURITY
                    </TabsTrigger>
                    <TabsTrigger value="config">
                      {showIcons && <Settings className="size-3.5" />}
                      CONFIG
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6 p-6 rounded-2xl border border-border/70 bg-card shadow-xs">
                    <TabsContent value="profile" className="animate-in fade-in duration-300 space-y-2">
                      <h4 className="text-sm font-bold text-foreground">Información del Perfil</h4>
                      <p className="text-xs text-muted-foreground">
                        Detalles personales, avatar e información del usuario activo.
                      </p>
                    </TabsContent>
                    <TabsContent value="security" className="animate-in fade-in duration-300 space-y-2">
                      <h4 className="text-sm font-bold text-foreground">Seguridad Avanzada</h4>
                      <p className="text-xs text-muted-foreground">
                        Autenticación de dos factores, tokens y sesiones activas.
                      </p>
                    </TabsContent>
                    <TabsContent value="config" className="animate-in fade-in duration-300 space-y-2">
                      <h4 className="text-sm font-bold text-foreground">Configuración del Sistema</h4>
                      <p className="text-xs text-muted-foreground">
                        Ajustes técnicos y parámetros globales del módulo de isócronas.
                      </p>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="flex items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border/80 shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto min-w-0">
                <Code2 className="size-4 text-primary shrink-0 ml-1" />
                <code className="text-xs font-mono text-foreground font-semibold truncate">
                  {generatedCode.replace(/\n/g, " ")}
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

            {/* Modificadores */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-foreground block">Modificadores:</label>
              <div className="flex flex-col gap-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-foreground font-medium select-none">
                  <Checkbox
                    checked={showIcons}
                    onCheckedChange={(c) => setShowIcons(!!c)}
                  />
                  <span>Mostrar Iconos en Pestañas</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATÁLOGO COMPACTO */}
      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Estilo Cápsula (Texto Solo)</span>
              <Badge variant="primary" appearance="soft" className="text-[10px]">
                Default
              </Badge>
            </div>
            <Tabs defaultValue="acc" className="w-full">
              <TabsList>
                <TabsTrigger value="acc">ACCOUNT</TabsTrigger>
                <TabsTrigger value="pass">PASSWORD</TabsTrigger>
                <TabsTrigger value="set">SETTINGS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-sm font-bold text-foreground">Con Iconos Ilustrativos</span>
              <Badge variant="secondary" appearance="soft" className="text-[10px]">
                Icon + Label
              </Badge>
            </div>
            <Tabs defaultValue="notif" className="w-full">
              <TabsList>
                <TabsTrigger value="notif">
                  <Bell className="size-3.5" />
                  ALERTS
                </TabsTrigger>
                <TabsTrigger value="sec">
                  <Shield className="size-3.5" />
                  SECURITY
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}
    </section>
  );
}
