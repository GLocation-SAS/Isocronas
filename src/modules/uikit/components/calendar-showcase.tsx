"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CalendarShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="border-border backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-h3 font-heading font-bold text-foreground">
          Calendar
        </CardTitle>
        <CardDescription className="text-body-sm text-muted-foreground">
          Un componente de selección de fechas con soporte para estados y navegación.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <div className="relative group">
          {/* Decorative glow effect like in the image */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>

        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50 text-center">
          <p className="text-body-sm font-medium text-foreground">
            Fecha seleccionada:
          </p>
          <p className="text-caption text-primary font-bold">
            {date ? date.toLocaleDateString("es-ES", {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : "Ninguna fecha seleccionada"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
