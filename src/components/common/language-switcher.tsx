"use client";

// components/common/language-switcher.tsx
// Componente de cambio de idioma moderno, compatible con SSR, transiciones suaves y dark/light mode.
// Utiliza los componentes de diseño de la aplicación y la configuración de next-intl.

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/routing";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGES = [
  { label: "Español", shortLabel: "ES", value: "es" },
  { label: "English", shortLabel: "EN", value: "en" },
  { label: "Português", shortLabel: "PT", value: "pt" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // router.replace de next-intl mantiene los parámetros de ruta y actualiza el idioma
      router.replace(pathname, { locale: newLocale });
    });
  };

  const currentLang = LANGUAGES.find((l) => l.value === locale) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          className={cn(
            "h-10 px-3 rounded-xl border border-transparent hover:border-border/60 hover:bg-surface/50 text-foreground transition-all duration-300 gap-2 flex items-center justify-center cursor-pointer",
            isPending && "opacity-70 pointer-events-none"
          )}
        >
          <Globe className="size-4 text-muted-foreground transition-colors" />
          <span className="font-semibold text-xs tracking-wider">{currentLang.shortLabel}</span>
          <ChevronDown className="size-3 text-muted-foreground transition-transform duration-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-xl border border-border/40 bg-background/95 backdrop-blur-lg shadow-xl min-w-32 animate-in fade-in-50 zoom-in-95 duration-100"
      >
        {LANGUAGES.map((l) => {
          const isSelected = l.value === locale;
          return (
            <DropdownMenuItem
              key={l.value}
              onClick={() => handleLanguageChange(l.value)}
              className={cn(
                "cursor-pointer flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors focus:bg-primary/10 focus:text-primary gap-4",
                isSelected ? "text-primary font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{l.label}</span>
              {isSelected && <Check className="size-3.5 text-primary stroke-[3]" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
