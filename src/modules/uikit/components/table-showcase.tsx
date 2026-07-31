"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Sparkles, Sliders, Grid, Code2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const USERS = [
  {
    id: "798",
    name: "Devon Lane",
    avatar: "https://i.pravatar.cc/150?u=798",
    balance: "$630.44",
    level: "MEDIO",
    status: "BANEADO",
    created: "23/12/2023 12:00",
  },
  {
    id: "492",
    name: "Wade Warren",
    avatar: "https://i.pravatar.cc/150?u=492",
    balance: "$202.87",
    level: "JUNIOR",
    status: "ACTIVO",
    created: "04/12/2023 17:22",
  },
  {
    id: "740",
    name: "Robert Fox",
    avatar: "https://i.pravatar.cc/150?u=740",
    balance: "$293.01",
    level: "SENIOR",
    status: "VERIFICACIÓN",
    created: "09/12/2023 08:00",
  },
  {
    id: "429",
    name: "Ronald Richards",
    avatar: "https://i.pravatar.cc/150?u=429",
    balance: "$406.27",
    level: "MEDIO",
    status: "VERIFICACIÓN",
    created: "27/12/2023 08:23",
  },
  {
    id: "738",
    name: "Dianne Russell",
    avatar: "https://i.pravatar.cc/150?u=738",
    balance: "$275.43",
    level: "SENIOR",
    status: "EN PROGRESO",
    created: "07/12/2023 16:35",
  },
];

const getLevelBadge = (level: string) => {
  switch (level) {
    case "SENIOR":
      return <Badge variant="primary" appearance="soft">SENIOR</Badge>;
    case "MEDIO":
      return <Badge variant="info" appearance="soft">MEDIO</Badge>;
    case "JUNIOR":
      return <Badge variant="success" appearance="soft">JUNIOR</Badge>;
    default:
      return <Badge variant="neutral" appearance="soft">{level}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return <Badge variant="success" appearance="soft">ACTIVO</Badge>;
    case "BANEADO":
      return <Badge variant="error" appearance="soft">BANEADO</Badge>;
    case "VERIFICACIÓN":
      return <Badge variant="warning" appearance="soft">VERIFICACIÓN</Badge>;
    case "EN PROGRESO":
      return <Badge variant="info" appearance="soft">EN PROGRESO</Badge>;
    case "ELIMINADO":
      return <Badge variant="neutral" appearance="soft">ELIMINADO</Badge>;
    default:
      return <Badge variant="neutral" appearance="soft">{status}</Badge>;
  }
};

export function TableShowcase() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<"catalog" | "playground">("catalog");

  const generatedCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Usuario</TableHead>
      <TableHead>Saldo</TableHead>
      <TableHead>Estado</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (...))}
  </TableBody>
</Table>`;

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
              Componentes de Datos
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">Mobile Modular Responsive</span>
          </div>
          <h2 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Tabla de Gestión (Adaptable Móvil)
          </h2>
          <p className="text-sm text-muted-foreground">
            Tabla modular que conmuta automáticamente entre vista de tabla en escritorio y tarjetas modulares en móvil.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex p-1 rounded-2xl bg-surface border border-border w-fit shrink-0">
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
            Catálogo & Móvil
          </button>
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
            Código JSX
          </button>
        </div>
      </div>

      {activeTab === "catalog" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* VISTA ESCRITORIO (TABLA TRADICIONAL) */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-xs">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border/60 bg-surface/50">
                  <TableHead className="w-[80px] font-bold">ID</TableHead>
                  <TableHead className="min-w-[200px] font-bold">Usuario</TableHead>
                  <TableHead className="font-bold">Saldo</TableHead>
                  <TableHead className="font-bold">Nivel</TableHead>
                  <TableHead className="font-bold">Estado</TableHead>
                  <TableHead className="font-bold">Fecha de Creación</TableHead>
                  <TableHead className="w-[80px] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user) => (
                  <TableRow key={user.id} className="hover:bg-surface/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{user.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="size-8 rounded-full object-cover border border-border"
                        />
                        <span className="font-semibold text-foreground text-xs">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-xs">{user.balance}</TableCell>
                    <TableCell>{getLevelBadge(user.level)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-xs tabular-nums">
                      {user.created}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl"
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-warning hover:bg-warning/10 rounded-xl"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* VISTA MÓVIL (TARJETAS MODULARES RESPONSIVAS) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {USERS.map((user) => (
              <div
                key={user.id}
                className="p-5 rounded-2xl border border-border/80 bg-card shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover border border-border"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{user.name}</h4>
                      <span className="text-[10px] font-mono text-muted-foreground">ID: #{user.id}</span>
                    </div>
                  </div>
                  {getStatusBadge(user.status)}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Saldo</span>
                    <span className="font-bold text-foreground">{user.balance}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Nivel</span>
                    {getLevelBadge(user.level)}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                  <span>{user.created}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2.5 rounded-xl text-primary">
                      <Pencil className="size-3 mr-1" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2.5 rounded-xl text-warning">
                      <Trash2 className="size-3 mr-1" /> Borrar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {activeTab === "playground" && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
            <pre className="text-xs font-mono text-foreground font-semibold overflow-x-auto p-2">
              {generatedCode}
            </pre>
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
      )}
    </section>
  );
}
