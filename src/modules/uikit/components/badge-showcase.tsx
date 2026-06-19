import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sparkles, Check, AlertCircle, Info, Zap, Star, ShieldCheck } from "lucide-react";

export function BadgeShowcase() {
    const semanticVariants = [
        { id: "primary", label: "Primary" },
        { id: "secondary", label: "Secondary" },
        { id: "success", label: "Success" },
        { id: "warning", label: "Warning" },
        { id: "error", label: "Error" },
        { id: "info", label: "Info" },
    ] as const;

    const specialVariants = [
        { id: "ghost", label: "Ghost" },
        { id: "link", label: "Link" },
    ] as const;

    return (
        <section className="grid gap-8 p-8 rounded-xl border border-border bg-background shadow-xs overflow-hidden">
            <div className="space-y-2">
                <h2 className="text-h3 font-bold flex items-center gap-2">
                    <Zap className="size-5 text-primary" />
                    Componentes de Estado: Badges
                </h2>
                <p className="text-sm text-muted-foreground">
                    Indicadores visuales compactos para estados, categorías y etiquetas con soporte para variantes semánticas y estilos de contorno.
                </p>
            </div>

            <div className="space-y-8">
                {/* DEFAULT APPEARANCE */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Estado: Default (Relleno)
                    </h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        {semanticVariants.map((v) => (
                            <div key={`default-${v.id}`} className="flex flex-col items-center gap-2">
                                <Badge variant={v.id as React.ComponentProps<typeof Badge>["variant"]} appearance="default">{v.label}</Badge>
                                <span className="text-[10px] font-mono text-muted-foreground">{v.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OUTLINE APPEARANCE */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Estado: Outline (Contorno)
                    </h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        {semanticVariants.map((v) => (
                            <div key={`outline-${v.id}`} className="flex flex-col items-center gap-2">
                                <Badge variant={v.id as React.ComponentProps<typeof Badge>["variant"]} appearance="outline">{v.label}</Badge>
                                <span className="text-[10px] font-mono text-muted-foreground">{v.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OPACITY VARIANTS */}
                <div className="space-y-6 pt-4 border-t border-border">
                    <div className="space-y-1">
                        <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                            Variantes de Opacidad (Glassmorphism)
                        </h3>
                        <p className="text-[10px] text-muted-foreground italic">
                            Visualización de escalas desde 10% hasta 90% para jerarquías sutiles.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {semanticVariants.map((v) => (
                            <div key={`opacity-group-${v.id}`} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground/60 w-20">{v.label}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {[10, 20, 30, 40, 50].map((opacity) => {
                                            const bgClasses: Record<string, Record<number, string>> = {
                                                primary: {
                                                    10: "bg-primary/10", 20: "bg-primary/20", 30: "bg-primary/30", 40: "bg-primary/40", 50: "bg-primary/50"
                                                },
                                                secondary: {
                                                    10: "bg-secondary/10", 20: "bg-secondary/20", 30: "bg-secondary/30", 40: "bg-secondary/40", 50: "bg-secondary/50"
                                                },
                                                success: {
                                                    10: "bg-success/10", 20: "bg-success/20", 30: "bg-success/30", 40: "bg-success/40", 50: "bg-success/50"
                                                },
                                                warning: {
                                                    10: "bg-warning/10", 20: "bg-warning/20", 30: "bg-warning/30", 40: "bg-warning/40", 50: "bg-warning/50"
                                                },
                                                error: {
                                                    10: "bg-danger/10", 20: "bg-danger/20", 30: "bg-danger/30", 40: "bg-danger/40", 50: "bg-danger/50"
                                                },
                                                info: {
                                                    10: "bg-info/10", 20: "bg-info/20", 30: "bg-info/30", 40: "bg-info/40", 50: "bg-info/50"
                                                }
                                            };

                                            return (
                                                <Badge 
                                                    key={`${v.id}-${opacity}`}
                                                    variant={v.id as React.ComponentProps<typeof Badge>["variant"]} 
                                                    appearance="outline" 
                                                    className={cn(
                                                        "border-transparent h-7 px-3",
                                                        bgClasses[v.id]?.[opacity],
                                                        "dark:text-white"
                                                    )}
                                                >
                                                    {opacity}%
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SPECIAL VARIANTS */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Variantes Especiales
                    </h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        {specialVariants.map((v) => (
                            <div key={v.id} className="flex flex-col items-center gap-2">
                                <Badge variant={v.id as React.ComponentProps<typeof Badge>["variant"]}>{v.label}</Badge>
                                <span className="text-[10px] font-mono text-muted-foreground">{v.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CON ICONOS */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Composiciones con Iconos
                    </h3>
                    <div className="flex flex-wrap gap-6">
                        <div className="space-y-2">
                            <span className="text-[10px] text-muted-foreground block font-medium">Icono Start</span>
                            <div className="flex gap-2">
                                <Badge variant="success" data-icon="inline-start">
                                    <Check />
                                    Completado
                                </Badge>
                                <Badge variant="info" appearance="outline" data-icon="inline-start">
                                    <Info />
                                    Detalles
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] text-muted-foreground block font-medium">Icono End</span>
                            <div className="flex gap-2">
                                <Badge variant="error" data-icon="inline-end">
                                    Falla
                                    <AlertCircle />
                                </Badge>
                                <Badge variant="warning" appearance="outline" data-icon="inline-end">
                                    Alerta
                                    <Sparkles />
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-[10px] text-muted-foreground block font-medium">Casos de Uso</span>
                            <div className="flex gap-2">
                                <Badge variant="primary" data-icon="inline-start">
                                    <ShieldCheck className="size-3" />
                                    Verificado
                                </Badge>
                                <Badge variant="secondary" appearance="outline">
                                    <Star className="size-3" />
                                    Info
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INTERACTIVOS */}
                <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Badges Interactivos (asChild)
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="primary" appearance="outline" asChild className="cursor-pointer hover:bg-primary/5 transition-colors">
                            <a href="#">Ver Documentación</a>
                        </Badge>
                        <Badge variant="link" asChild>
                            <a href="#">Leer términos y condiciones</a>
                        </Badge>
                        <Badge variant="secondary" appearance="outline" className="cursor-help" title="Ayuda adicional">
                            <Info className="size-3" />
                            Help Center
                        </Badge>
                    </div>
                </div>
            </div>

            {/* DESIGN NOTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-border pt-8">
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Arquitectura de Tokens
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Los badges utilizan la escala semántica de <code className="text-foreground">globals.css</code>. La variante <code className="text-foreground">error</code> mapea automáticamente al token <code className="text-foreground">danger</code> para consistencia con el sistema de diseño.
                    </p>
                </div>
                <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-widest">
                        Modos de Visualización
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Soportan dos estados principales: <code className="text-foreground">default</code> (relleno sólido) y <code className="text-foreground">outline</code> (borde y texto coloreado), permitiendo jerarquizar la información visualmente.
                    </p>
                </div>
            </div>
        </section>
    );
}
