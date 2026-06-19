"use client";

import * as React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";
import {
  MousePointerClick,
  TextCursorInput,
  AlignLeft,
  Tag,
  ListFilter,
  Search,
  Terminal,
  CheckSquare,
  ToggleLeft,
  Layers,
  Bell,
  MessageSquare,
  LogOut,
  Layout,
  Table as TableIcon,
  Calendar as CalendarIcon,
  Folder as FolderIcon,
  MoreHorizontal,
  Palette,
  Sun,
  Moon,
} from "lucide-react";

/** Section definition for UIKit navigation */
export interface UIKitSection {
  id: string;
  label: string;
  icon: React.ElementType;
  group: "brand" | "actions" | "inputs" | "data" | "feedback" | "overlay";
}

/** All UIKit sections organized by category */
export const UIKIT_SECTIONS: UIKitSection[] = [
  // Brand & Tokens
  { id: "colors", label: "Colors", icon: Palette, group: "brand" },

  // Actions
  { id: "buttons", label: "Buttons", icon: MousePointerClick, group: "actions" },
  { id: "toggle", label: "Toggle", icon: ToggleLeft, group: "actions" },

  // Inputs
  { id: "inputs", label: "Input Group", icon: TextCursorInput, group: "inputs" },
  { id: "textarea", label: "Textarea", icon: AlignLeft, group: "inputs" },
  { id: "combobox", label: "Combobox", icon: ListFilter, group: "inputs" },
  { id: "search", label: "Search", icon: Search, group: "inputs" },
  { id: "command", label: "Command", icon: Terminal, group: "inputs" },
  { id: "checkbox", label: "Checkbox", icon: CheckSquare, group: "inputs" },
  { id: "switch", label: "Switch", icon: ToggleLeft, group: "inputs" },
  { id: "calendar", label: "Calendar", icon: CalendarIcon, group: "inputs" },

  // Data Display
  { id: "badges", label: "Badges", icon: Tag, group: "data" },
  { id: "breadcrumb", label: "Breadcrumb", icon: Layers, group: "data" },
  { id: "tabs", label: "Tabs", icon: Layout, group: "data" },
  { id: "table", label: "Table", icon: TableIcon, group: "data" },
  { id: "avatar", label: "Avatar", icon: Layout, group: "data" },
  { id: "pagination", label: "Pagination", icon: MoreHorizontal, group: "data" },

  // Overlay / Feedback
  { id: "dialog", label: "Dialog", icon: Layers, group: "overlay" },
  { id: "toast", label: "Toast", icon: Bell, group: "overlay" },
  { id: "tooltip", label: "Tooltip", icon: MessageSquare, group: "overlay" },
  { id: "chat-assistant", label: "Chat Assistant", icon: MessageSquare, group: "overlay" },
  { id: "chat-intranet", label: "Chat Intranet", icon: MessageSquare, group: "overlay" },
  { id: "folders", label: "Folders", icon: FolderIcon, group: "data" },
  { id: "cards", label: "Cards", icon: Layout, group: "data" },
];

const GROUP_LABELS: Record<UIKitSection["group"], string> = {
  brand: "Fundamentos",
  actions: "Acciones",
  inputs: "Entradas",
  data: "Visualización",
  feedback: "Retroalimentación",
  overlay: "Overlay & Feedback",
};

interface UIKitSidebarProps {
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
}

export function UIKitSidebar({ activeSection, onNavigate }: UIKitSidebarProps) {
  const { setOpenMobile } = useSidebar();

  // Local theme state
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    const active = document.documentElement.getAttribute("data-theme") as Theme | null;
    setTheme(stored ?? active ?? "light");
  }, []);

  const handleTheme = (next: Theme) => {
    setTheme(next);
    applyTheme(next);
  };

  const handleClick = (sectionId: string) => {
    onNavigate(sectionId);
    setOpenMobile(false);
  };

  // Group sections by category
  const groupedSections = React.useMemo(() => {
    const groups = new Map<UIKitSection["group"], UIKitSection[]>();
    for (const section of UIKIT_SECTIONS) {
      if (!groups.has(section.group)) {
        groups.set(section.group, []);
      }
      groups.get(section.group)!.push(section);
    }
    return groups;
  }, []);

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* ── Header: Logo + Trigger toggle ── */}
      <SidebarHeader className="relative px-3 pt-4 pb-3">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            {/* Expanded Logos */}
            <Image
              src="/Logotipo.svg"
              alt="GLocation Logo"
              width={150}
              height={35}
              className="h-[35px] w-auto dark:hidden group-data-[state=collapsed]:hidden animate-in fade-in duration-300"
            />
            <Image
              src="/LogotipoVersionNegativo.svg"
              alt="GLocation Logo"
              width={150}
              height={35}
              className="h-[35px] w-auto hidden dark:group-data-[state=expanded]:block group-data-[state=collapsed]:hidden animate-in fade-in duration-300"
            />

            {/* Collapsed Icons */}
            <Image
              src="/icon.svg"
              alt="GLocation Icon"
              width={27}
              height={27}
              className="h-[27px] w-auto dark:hidden group-data-[state=expanded]:hidden animate-in zoom-in-75 duration-300"
            />
            <Image
              src="/iconBlanco.svg"
              alt="GLocation Icon"
              width={27}
              height={27}
              className="h-[27px] w-auto hidden dark:group-data-[state=collapsed]:block group-data-[state=expanded]:hidden animate-in zoom-in-75 duration-300"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* ── Navigation ── */}
      <SidebarContent>
        {Array.from(groupedSections.entries()).map(([group, sections]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel className="text-caption uppercase tracking-widest font-bold text-sidebar-foreground/90">
              {GROUP_LABELS[group]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;

                  return (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={section.label}
                        onClick={() => handleClick(section.id)}
                      >
                        <Icon className="shrink-0" />
                        <span>{section.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* ── Footer: User info + Theme toggle + Logout ── */}
      <SidebarFooter className="px-3 py-3">
        <SidebarSeparator className="mb-3" />

        {/* Bottom controls: Theme toggle first */}
        <div className="flex flex-col gap-1 px-1 mb-3">
          {/* Expanded: full pill Light / Dark */}
          {mounted && (
            <>
              {/* Expanded pill */}
              <div className="group-data-[collapsible=icon]:hidden">
                <div className="flex items-center rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-0.5 gap-0.5">
                  <Button
                    onClick={() => handleTheme("light")}
                    variant="ghost"
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-caption font-medium transition-all duration-200 border-0 shadow-none h-auto",
                      theme === "light"
                        ? "bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar hover:text-sidebar-foreground"
                        : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                    )}
                  >
                    <Sun className="h-3 w-3" />
                    <span>Claro</span>
                  </Button>
                  <Button
                    onClick={() => handleTheme("dark")}
                    variant="ghost"
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-caption font-medium transition-all duration-200 border-0 shadow-none h-auto",
                      theme === "dark"
                        ? "bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar hover:text-sidebar-foreground"
                        : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                    )}
                  >
                    <Moon className="h-3 w-3" />
                    <span>Oscuro</span>
                  </Button>
                </div>
              </div>

              {/* Collapsed: single icon button */}
              <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <Button
                  onClick={() => handleTheme(theme === "light" ? "dark" : "light")}
                  aria-label="Toggle Theme"
                  variant="ghost"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar-accent/30 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 hover:border-sidebar-border transition-colors duration-200 p-0 shrink-0"
                >
                  {theme === "dark" ? (
                    <Moon className="h-3.5 w-3.5" />
                  ) : (
                    <Sun className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* User section below */}
        <div className="flex items-center gap-3 px-1 group-data-[collapsible=icon]:justify-center">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-heading font-bold text-caption group-data-[collapsible=icon]:size-8 transition-all duration-200">
              JM
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 size-2.5 rounded-full bg-success border-2 border-background group-data-[collapsible=icon]:size-2" />
          </div>

          {/* Name + Email + Logout (hidden when collapsed) */}
          <div className="flex flex-1 items-center justify-between gap-2 min-w-0 group-data-[collapsible=icon]:hidden animate-in fade-in slide-in-from-bottom-1 duration-300">
            <div className="flex flex-col min-w-0">
              <span className="text-body-sm font-heading font-semibold text-sidebar-foreground truncate">
                Jeimy Mateus
              </span>
              <span className="text-caption text-sidebar-foreground/60 truncate">
                jeimy@glocation.co
              </span>
            </div>
            <Button
              aria-label="Cerrar sesión"
              variant="ghost"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 hover:border-transparent transition-colors duration-200 border-0 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
