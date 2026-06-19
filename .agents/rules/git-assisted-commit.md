---
trigger: always_on
description: Regla global de commits asistidos con Git para el proyecto G-Learning, asegurando trazabilidad y mensajes semánticos.
---

# Git Assisted Commit Standard (V1)

Este estándar define el flujo de versionado asistido por IA para el proyecto. El objetivo es mantener un historial de Git limpio, profesional y semántico, sin automatizar el proceso de commit de forma silenciosa.

---

## 1. DETECCIÓN DE CAMBIOS IMPORTANTES

El Agente (IA) debe sugerir un commit cuando detecte cambios significativos que impacten la estabilidad o estructura del proyecto:

- **Módulos Nuevos:** Creación de cualquier módulo en `/backend` o `/frontend`.
- **Arquitectura:** Cambios en la estructura de carpetas, patrones de diseño o flujos core.
- **Seguridad:** Implementación de JWT, roles, middlewares de autenticación o reglas de Firebase.
- **Configuración CI/CD:** Modificaciones en archivos de despliegue, App Engine o pipelines.
- **Pruebas:** Implementación de nuevos tests unitarios o de integración.
- **Refactoring:** Cambios estructurales que no añaden funcionalidades pero limpian el código.
- **Modificaciones Masivas:** Cambios que afecten a más de 10 archivos simultáneamente.
- **Infraestructura Cloud:** Cambios en configuraciones de nube o despliegues.

---

## 2. FLUJO DE TRABAJO ASISTIDO

Cuando ocurra uno de los eventos anteriores, el Agente seguirá este flujo:

1. **Análisis:** Evaluar los cambios realizados.
2. **Sugerencia:** Proponer al desarrollador los comandos necesarios:
   ```bash
   git add .
   git commit -m "[tipo]([scope]): [mensaje descriptivo]"
   ```
3. **Validación Manual:** **NUNCA** ejecutar el commit automáticamente. El desarrollador debe confirmar la acción explícitamente.
4. **Checkpoints:** Sugerir un commit de "checkpoint" antes de realizar cambios altamente riesgosos o experimentales.

---

## 3. CONVENCIÓN DE MENSAJES (Conventional Commits)

Se debe utilizar estrictamente el estándar de *Conventional Commits*:

- **feat:** Nueva funcionalidad.
- **fix:** Corrección de un error.
- **refactor:** Mejora del código sin cambiar comportamiento.
- **test:** Adición o corrección de pruebas.
- **ci:** Cambios en integración continua.
- **chore:** Tareas de mantenimiento, dependencias o configuración.
- **docs:** Cambios solo en documentación.

**Ejemplos:**
- `feat(landing): agregar vista de landing modular`
- `refactor(ui): migrar tipografía a tokens semánticos`
- `fix(auth): corregir validación de expiración de sesión`
- `ci(deploy): actualizar configuración de despliegue`

---

## 4. BUENAS PRÁCTICAS Y RESTRICCIONES

### Qué hacer:
- Agrupar cambios relacionados en un mismo commit.
- Mantener mensajes claros, breves y en **español**.
- Sugerir commits frecuentes para evitar cambios demasiado grandes.

### Prohibido:
- **NO** hacer `git push` automático.
- **NO** ejecutar commits silenciosos sin revisión.
- **NO** versionar secretos, claves API o credenciales.
- **NO** generar commits por cambios mínimos irrelevantes (ej: un simple console.log).
- **NO** generar commits temporales o "WIP" innecesarios si se puede evitar.

---

## 5. COMPORTAMIENTO DEL AGENTE (IA)

- **Asistente Proactivo:** Al finalizar una tarea importante, la IA dirá: *"He completado [Tarea]. Dado que es un cambio importante en [Módulo], te sugiero realizar un commit. ¿Deseas ejecutar: `git add . && git commit -m '...'`?"*.
- **Guardian de Secretos:** Antes de sugerir un commit, verificar rápidamente que no se estén incluyendo archivos `.env` o secretos accidentales.
- **Trazabilidad:** Priorizar que cada commit represente una unidad lógica de trabajo.