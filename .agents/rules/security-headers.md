---
trigger: always_on
description: Estándar global para el mantenimiento de políticas de seguridad CSP y headers HTTP en Next.js.
---

# Global Security Headers Standard (V1)

Este documento define la regla obligatoria para garantizar que toda modificación del frontend mantenga políticas de seguridad HTTP activas y consistentes. El objetivo es minimizar riesgos de XSS, Clickjacking y otras vulnerabilidades mediante una configuración robusta y centralizada.

---

## 1. HEADERS DE SEGURIDAD OBLIGATORIOS

Toda configuración en `next.config.ts` debe incluir y mantener los siguientes headers globales:

- **Content-Security-Policy (CSP)**: Control estricto de carga de recursos.
- **Strict-Transport-Security (HSTS)**: Forzar HTTPS (`max-age=31536000; includeSubDomains`).
- **X-Frame-Options**: Prevenir Clickjacking (`SAMEORIGIN`).
- **X-Content-Type-Options**: Prevenir MIME-sniffing (`nosniff`).
- **Referrer-Policy**: Control de información en cabeceras de referencia (`strict-origin-when-cross-origin`).
- **Permissions-Policy**: Restringir acceso a APIs del navegador (ej: `camera=(), microphone=(), geolocation=()`).

---

## 2. COMPORTAMIENTO DEL AGENTE (IA)

### Validación y Actualización Automática
Cada vez que se realice una de las siguientes acciones, la IA **DEBE** validar y sugerir actualizaciones en el CSP:
- **Agregar librerías externas**: Detectar si requieren scripts o estilos adicionales.
- **Integrar APIs**: Identificar nuevos dominios para `connect-src`.
- **Agregar iframes**: Actualizar `frame-src`.
- **Agregar imágenes externas**: Actualizar `img-src`.
- **Agregar scripts externos**: Actualizar `script-src`.

### Detección de Dominios
La IA debe analizar el código nuevo para detectar dominios externos y compararlos con la política actual en `next.config.ts`. Si detecta un dominio no permitido, debe:
1. Notificar al desarrollador.
2. Sugerir la actualización exacta del CSP.
3. Asegurar que no se rompan funcionalidades legítimas (Next.js, Tailwind, etc.).

---

## 3. RESTRICCIONES CRÍTICAS

- **No eliminar CSP existente**: Queda prohibido deshabilitar las políticas de seguridad.
- **No Wildcards inseguros**: Prohibido el uso de `*` en directivas sensibles.
- **Permisividad mínima**: Las políticas deben ser lo más restrictivas posible.
- **Compatibilidad**: Mantener siempre soporte para:
  - YouTube (YouTube Embeds).
  - Google APIs (Firebase, Maps, etc.).
  - Next.js (Hot Reloading, Data Fetching).
  - Tailwind (Inline styles necesarios).

---

## 4. BUENAS PRÁCTICAS

- **Política Progresiva**: Refinar el CSP para que sea cada vez más estricto (ej: reducir `unsafe-inline` si es posible).
- **Documentación**: Documentar brevemente en el archivo de configuración por qué se permite cada dominio.
- **Configuración Centralizada**: Todos los headers deben gestionarse exclusivamente en `next.config.ts`.

---

## 5. VALIDACIÓN TÉCNICA

Al finalizar cambios que afecten los headers:
1. Verificar que los headers se envíen correctamente en las respuestas HTTP.
2. Detectar posibles violaciones de CSP en la consola del navegador si se dispone de acceso a logs.
3. Asegurar que la configuración sea compatible con estándares de herramientas como `securityheaders.com`.