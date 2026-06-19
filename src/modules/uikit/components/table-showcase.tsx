"use client";

import * as React from "react";
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
import { Pencil, Trash2 } from "lucide-react";
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
  {
    id: "816",
    name: "Kristin Watson",
    avatar: "https://i.pravatar.cc/150?u=816",
    balance: "$767.50",
    level: "JUNIOR",
    status: "VERIFICACIÓN",
    created: "15/12/2023 21:54",
  },
  {
    id: "647",
    name: "Theresa Webb",
    avatar: "https://i.pravatar.cc/150?u=647",
    balance: "$450.54",
    level: "MEDIO",
    status: "ELIMINADO",
    created: "08/12/2023 11:15",
  },
  {
    id: "556",
    name: "Jenny Wilson",
    avatar: "https://i.pravatar.cc/150?u=556",
    balance: "$105.55",
    level: "SENIOR",
    status: "ELIMINADO",
    created: "14/12/2023 10:09",
  },
  {
    id: "177",
    name: "Marvin McKinney",
    avatar: "https://i.pravatar.cc/150?u=177",
    balance: "$473.85",
    level: "JUNIOR",
    status: "EN PROGRESO",
    created: "09/12/2023 15:33",
  },
  {
    id: "447",
    name: "Darlene Robertson",
    avatar: "https://i.pravatar.cc/150?u=447",
    balance: "$854.08",
    level: "JUNIOR",
    status: "ACTIVO",
    created: "20/12/2023 09:20",
  },
];

const getLevelBadge = (level: string) => {
  switch (level) {
    case "SENIOR":
      return (
        <Badge
          className="bg-primary/10 text-primary border-transparent"
          variant="secondary"
        >
          SENIOR
        </Badge>
      );
    case "MEDIO":
      return (
        <Badge
          className="bg-info/10 text-info border-transparent"
          variant="secondary"
        >
          MEDIO
        </Badge>
      );
    case "JUNIOR":
      return (
        <Badge
          className="bg-success/10 text-success border-transparent"
          variant="secondary"
        >
          JUNIOR
        </Badge>
      );
    default:
      return <Badge variant="secondary">{level}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return (
        <Badge
          className="bg-success/10 text-success border-transparent"
          variant="secondary"
        >
          ACTIVO
        </Badge>
      );
    case "BANEADO":
      return (
        <Badge
          className="bg-danger/10 text-danger border-transparent"
          variant="secondary"
        >
          BANEADO
        </Badge>
      );
    case "VERIFICACIÓN":
      return (
        <Badge
          className="bg-warning/10 text-warning border-transparent"
          variant="secondary"
        >
          VERIFICACIÓN
        </Badge>
      );
    case "EN PROGRESO":
      return (
        <Badge
          className="bg-info/10 text-info border-transparent"
          variant="secondary"
        >
          EN PROGRESO
        </Badge>
      );
    case "ELIMINADO":
      return (
        <Badge
          className="bg-muted text-muted-foreground border-transparent"
          variant="secondary"
        >
          ELIMINADO
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function TableShowcase() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-h3 font-heading font-semibold text-foreground mb-1">
          Tabla de Gestión
        </h3>
        <p className="text-body-sm text-muted-foreground">
          Ejemplo de tabla   para gestión de usuarios con estados y métricas.
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b-0 bg-primary/5">
              <TableHead className="w-[80px] font-bold">ID</TableHead>
              <TableHead className="min-w-[200px] font-bold">Usuario</TableHead>
              <TableHead className="font-bold">Saldo</TableHead>
              <TableHead className="font-bold">Nivel</TableHead>
              <TableHead className="font-bold">Estado</TableHead>
              <TableHead className="font-bold">Fecha de creación</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-muted-foreground">
                  {user.id}
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
                    <span className="font-semibold text-foreground">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-bold">{user.balance}</TableCell>
                <TableCell>{getLevelBadge(user.level)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-muted-foreground tabular-nums">
                  {user.created}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar usuario</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-danger hover:bg-danger/10"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Eliminar usuario</TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination — fuera del contenedor de la tabla */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
