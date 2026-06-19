"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupInput, InputGroupButton } from "@/components/ui/input-group";
import { Moon, Sun, Contrast, Copy, Download, Image as ImageIcon, Circle } from "lucide-react";

type LogoVariant = "normal" | "blanco" | "alternativo" | "negro";

interface LogoGroupProps {
    title: string;
    description: string;
    badges: string[];
    logos: {
        normal: string;
        blanco: string;
        alternativo: string;
        negro: string;
    };
    basePath: string;
}

const LogoCard = ({ title, description, badges, logos, basePath }: LogoGroupProps) => {
    const [activeVariant, setActiveVariant] = useState<LogoVariant>("normal");

    const activeLogoPath = `/${logos[activeVariant]}`;

    // Determine background based on variant
    const getBgClass = () => {
        if (activeVariant === "blanco") return "bg-neutral-900";
        if (activeVariant === "alternativo") return "bg-primary-50 dark:bg-primary-900/30";
        if (activeVariant === "negro") return "bg-white dark:bg-neutral-200";
        return "bg-neutral-50 dark:bg-neutral-900/50";
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = activeLogoPath;
        link.download = logos[activeVariant];
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-col border border-border rounded-xl bg-background shadow-xs overflow-hidden">
            {/* Viewer Area */}
            <div className={`relative flex flex-col items-center justify-center p-12 min-h-[300px] transition-colors duration-300 ${getBgClass()}`}>
                
                {/* Dot Pattern Background (subtle) */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                {/* Controls */}
                <div className="absolute top-3 right-3 z-10 grid grid-cols-2 gap-1 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 p-1.5 shadow-sm">
                    <button
                        onClick={() => setActiveVariant("blanco")}
                        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors ${activeVariant === "blanco" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                        title="Blanco"
                    >
                        <Moon className="size-3 shrink-0" />
                        <span className="hidden sm:inline-block">Blanco</span>
                    </button>
                    <button
                        onClick={() => setActiveVariant("normal")}
                        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors ${activeVariant === "normal" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                        title="Normal"
                    >
                        <Sun className="size-3 shrink-0" />
                        <span className="hidden sm:inline-block">Normal</span>
                    </button>
                    <button
                        onClick={() => setActiveVariant("alternativo")}
                        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors ${activeVariant === "alternativo" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                        title="Alternativo"
                    >
                        <Contrast className="size-3 shrink-0" />
                        <span className="hidden sm:inline-block">Alternat.</span>
                    </button>
                    <button
                        onClick={() => setActiveVariant("negro")}
                        className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-colors ${activeVariant === "negro" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}
                        title="Negro"
                    >
                        <Circle className="size-3 fill-current shrink-0" />
                        <span className="hidden sm:inline-block">Negro</span>
                    </button>
                </div>

                {/* Logo Image */}
                <div className="relative z-10 w-full max-w-[280px] flex items-center justify-center animate-in fade-in zoom-in-95 duration-300" key={activeVariant}>
                    <img
                        src={encodeURI(activeLogoPath)}
                        alt={`${title} - ${activeVariant}`}
                        className="w-auto h-auto max-w-full max-h-[120px] object-contain drop-shadow-sm"
                    />
                </div>

                {/* Badges */}
                <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2">
                    {badges.map((badge, idx) => (
                        <Badge key={idx} variant={idx === 0 ? "info" : "warning"} appearance="soft">
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Info Area */}
            <div className="p-6 flex flex-col gap-6 bg-background h-full">
                <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <Button onClick={handleDownload} className="w-full gap-2" variant="primary">
                        <Download className="size-4" />
                        Descargar SVG
                    </Button>
                </div>
            </div>
        </div>
    );
};

export function LogoShowcase() {
    return (
        <section className="grid gap-8 p-6 md:p-8 rounded-xl border border-border bg-surface shadow-xs overflow-hidden">
            <div className="space-y-2">
                <h2 className="text-h3 font-bold flex items-center gap-2">
                    <ImageIcon className="size-5 text-primary" />
                    Recursos de Marca: Logotipos
                </h2>
                <p className="text-sm text-muted-foreground">
                    Versiones oficiales del logotipo para uso en distintos formatos, fondos y resoluciones.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <LogoCard
                    title="Logotipo Horizontal"
                    description="Versión horizontal oficial de la marca. Incluye variantes para impresión de alta neutralidad, la versión principal en color y la variante negativa para fondos oscuros."
                    badges={["HORIZONTAL", "PRINCIPAL"]}
                    basePath="/RF-Planner"
                    logos={{
                        normal: "Logo horizontal.svg",
                        blanco: "Logo horizontal blanco.svg",
                        alternativo: "Logo horizontal alternativo.svg",
                        negro: "Logo horizontal negro.svg"
                    }}
                />

                <LogoCard
                    title="Logotipo Vertical"
                    description="Versión apilada o vertical de la marca. Ideal para espacios cuadrados, perfiles de redes sociales o avatares donde la variante horizontal no es legible."
                    badges={["VERTICAL", "SECUNDARIO"]}
                    basePath="/RF-Planner"
                    logos={{
                        normal: "Logo vertical.svg",
                        blanco: "Logo vertical blanco.svg",
                        alternativo: "Logo vertical alternativo.svg",
                        negro: "Logo vertical negro.svg"
                    }}
                />

                <LogoCard
                    title="Símbolo / Ícono"
                    description="El isotipo puro de la marca, sin la tipografía. Útil para favicons, botones pequeños o elementos de UI donde el logo completo pierde visibilidad."
                    badges={["ÍCONO", "MÍNIMO"]}
                    basePath="/RF-Planner"
                    logos={{
                        normal: "Icon.svg",
                        blanco: "Icon Blanco.svg",
                        alternativo: "Icon alternativo.svg",
                        negro: "Icon oscuro.svg"
                    }}
                />
            </div>
        </section>
    );
}
