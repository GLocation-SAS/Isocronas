"use client";

// components/layout/navbar.tsx
// Barra de navegación premium con internacionalización completa.
// Utiliza routing inteligente para mantener la ruta activa al cambiar de idioma.

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/routing";
import {
  Menu,
  ChevronDown,
  LogIn
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const LANGUAGES = [
  { label: "ES", value: "es" },
  { label: "EN", value: "en" },
  { label: "PT", value: "pt" },
];

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [, startTransition] = React.useTransition();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("team"), href: "/equipo" },
    { label: t("demos"), href: "/demos" },
    { label: t("contact"), href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-border/60 py-3 shadow-lg shadow-black/5"
          : "bg-transparent border-transparent py-5"
      )}
    >
      {/* Tech glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />

      {/* Grid background structure */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
          backgroundSize: "32px 32px"
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <nav className="flex items-center justify-between">

          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="relative h-16 flex items-center justify-center px-2">
              <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg group-hover:bg-primary/20 transition-colors" />
              <Image
                src="/LogotipoSL.svg"
                alt="Glocation Logo Light"
                width={240}
                height={64}
                className="relative z-10 h-14 w-auto dark:hidden"
                priority
              />
              <Image
                src="/LogotipoSLNegativo.svg"
                alt="Glocation Logo Dark"
                width={240}
                height={64}
                className="relative z-10 h-14 w-auto hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center bg-surface/40 backdrop-blur-md border border-border/40 rounded-full px-2 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 lg:px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-background shadow-sm border border-border/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center lg:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />

            <Link href="/login">
              <Button
                variant="primary"
                size="sm"
                className="whitespace-nowrap group"
                leftIcon={<LogIn className="size-4 mr-1 group-hover:translate-x-0.5 transition-transform" />}
              >
                {t("login")}
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl border border-border/40" aria-label={t("menu")}>
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-border/40 bg-background/95 backdrop-blur-xl p-0">
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, var(--foreground) 1px, transparent 0)`,
                    backgroundSize: "32px 32px"
                  }}
                />
                <SheetHeader className="p-6 border-b border-border/40">
                  <div className="flex items-center gap-2">
                    <SheetTitle className="sr-only">Glocation</SheetTitle>
                    <Image
                      src="/LogotipoSL.svg"
                      alt="Glocation Logo Light"
                      width={180}
                      height={48}
                      className="relative z-10 h-12 w-auto dark:hidden"
                      priority
                    />
                    <Image
                      src="/LogotipoSLNegativo.svg"
                      alt="Glocation Logo Dark"
                      width={180}
                      height={48}
                      className="relative z-10 h-12 w-auto hidden dark:block"
                      priority
                    />
                  </div>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-4 md:p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-border/40"
                    >
                      <span className="font-semibold text-lg">{link.label}</span>
                      <ChevronDown className="-rotate-90 size-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
                <div className="mt-auto p-6 border-t border-border/40 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-muted-foreground font-medium">{t("theme")}</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex items-center flex-col justify-between px-2">
                    <span className="text-sm text-muted-foreground font-medium">{t("language")}</span>
                    <div className="flex gap-1 md:gap-2">
                      {LANGUAGES.map((l) => {
                        const isSelected = l.value === locale;
                        return (
                          <Button
                            key={l.value}
                            onClick={() => handleLanguageChange(l.value)}
                            variant={isSelected ? "primary" : "neutral"}
                            className="h-8 w-12 text-xs font-bold rounded-lg cursor-pointer"
                          >
                            {l.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <Link href="/login" className="w-full flex">
                    <Button variant="primary" className="w-full h-12 rounded-2xl">
                      {t("login")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </nav>
      </div>
    </header>
  );
}
