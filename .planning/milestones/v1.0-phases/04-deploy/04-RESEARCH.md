# Phase 4: Deploy - Research

**Researched:** 2026-03-06
**Domain:** Vercel CLI deploy, SPA routing configuration, static site deployment
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Vercel como plataforma de deploy
- Conexion via vercel CLI (`vercel deploy --prod`), no desde Vercel UI
- Deploy en la raiz del dominio `/` — sin subpath (no requiere cambios en vite.config.ts)
- Incluir `vercel.json` explicito en el repo para documentar la configuracion
- URL auto-generada por Vercel, sin dominio propio
- Nombre del proyecto en Vercel: `db-platform-u1`
- URL resultante: `db-platform-u1.vercel.app`
- Configurar rewrites en `vercel.json` para que todas las rutas devuelvan `index.html`
  - `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`
- React Router (`createBrowserRouter`) maneja el routing del lado del cliente
- Validacion post-deploy: hacer refresh en `/`, `/unit/u1/concepts`, `/unit/u1/quiz`, `/unit/u1/cheatsheet`, `/unit/u1/exercises` y confirmar que no hay 404
- Deploy manual: el desarrollador corre `vercel deploy --prod` cuando quiere actualizar
- Sin CI/CD automatico ni git integration con Vercel
- Sin variables de entorno — app completamente estatica
- Documentar el proceso de deploy en README

### Claude's Discretion
- Estructura exacta del vercel.json (build command, output dir — Vercel detecta Vite automaticamente)
- Formato de la seccion de deploy en el README
- Orden de verificacion de rutas post-deploy

### Deferred Ideas (OUT OF SCOPE)
- Git integration con Vercel (auto-deploy en push a main) — posible mejora futura si el flujo de trabajo lo requiere
- Dominio propio — si el proyecto escala o se usa en produccion real
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NFR-04 | Deploy estatico a Vercel o GitHub Pages | vercel.json SPA rewrites + `vercel deploy --prod` son el mecanismo exacto; Vercel detecta Vite automaticamente |
</phase_requirements>

## Summary

Esta fase tiene dos artefactos concretos y un proceso de verificacion. El artefacto principal es `vercel.json` en la raiz del proyecto con el rewrite SPA. El artefacto secundario es la seccion de Deploy en `README.md` (que actualmente tiene el contenido default de la plantilla Vite y necesita ser reemplazado completamente). El proceso de verificacion es manual: hacer refresh en 5 rutas post-deploy.

Vercel detecta Vite automaticamente — el `buildCommand` default es `npm run build` (que ejecuta `tsc -b && vite build`) y el `outputDirectory` default es `dist`. No se necesita configurar esos campos en `vercel.json`. El unico campo obligatorio es `rewrites` para SPA routing. El primer deploy via CLI es interactivo (login + proyecto linking); deploys subsiguientes son un solo comando.

La CLI de Vercel no esta instalada globalmente en el sistema. Hay que instalarla como paso previo. El proyecto ya tiene un `dist/` valido de builds anteriores, pero Vercel construye en sus servidores — no se usa el `dist/` local.

**Primary recommendation:** `vercel.json` con solo `$schema` + `rewrites`, instalar Vercel CLI globalmente via `npm i -g vercel`, hacer login, y correr `vercel --prod` desde la raiz del proyecto.

## Standard Stack

### Core
| Tool | Version | Purpose | Why Standard |
|------|---------|---------|--------------|
| vercel CLI | latest (`npm i -g vercel`) | Deploy desde terminal | Es la herramienta oficial de Vercel para deploy sin UI |
| vercel.json | schema v2026 | Configuracion de proyecto | Documenta la config en el repo, requerido para SPA rewrites |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| `npm run build` | — | Verificar build local antes de deploy | Siempre antes del primer deploy para confirmar 0 errores TS |
| `vite preview` | — | Preview local del build de produccion | Util para verificar routing antes de deploy |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| vercel CLI | Vercel UI (drag & drop) | UI no es reproducible, no queda documentado en el repo |
| vercel CLI | GitHub Pages | Requiere `base` en vite.config.ts, no soporta rewrites nativos — ya descartado |

**Installation:**
```bash
npm install -g vercel
```

## Architecture Patterns

### Recommended Project Structure
```
/ (project root)
├── vercel.json          # SPA rewrite config — nuevo archivo
├── README.md            # Reemplazar contenido default con docs del proyecto
├── vite.config.ts       # Sin cambios — sin base path
├── package.json         # Sin cambios
└── dist/                # Output de build — Vercel construye en sus servidores
```

### Pattern 1: vercel.json minimo para SPA Vite
**What:** Configuracion explicita que instruye a Vercel a servir `index.html` para cualquier ruta, permitiendo que React Router maneje el routing client-side.
**When to use:** Siempre que se use `createBrowserRouter` (o cualquier router basado en History API) en deploy estatico.

```json
// Source: https://vercel.com/docs/frameworks/vite#using-vite-to-make-spas
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Notas importantes verificadas en docs oficiales:**
- No se necesita `buildCommand` — Vercel detecta Vite y usa `npm run build` por default
- No se necesita `outputDirectory` — Vercel detecta `dist/` por default para Vite
- No se necesita `framework` — deteccion automatica
- El `$schema` es opcional pero habilita autocomplete en IDEs

### Pattern 2: Primer deploy interactivo via CLI
**What:** El primer `vercel` o `vercel --prod` en un proyecto nuevo es interactivo: pide login, setup del proyecto (nombre, directorio, framework).
**When to use:** Solo la primera vez. Los deploys subsiguientes son silenciosos.

```bash
# Primer deploy (interactivo):
vercel --prod
# Pregunta: Set up and deploy? Y
# Pregunta: Which scope? (tu cuenta)
# Pregunta: Link to existing project? N
# Pregunta: Project name? db-platform-u1
# Pregunta: In which directory is your code located? ./
# Vercel detecta Vite automaticamente

# Deploys subsiguientes (silencioso):
vercel --prod
```

**Alternativa para omitir preguntas interactivas:**
```bash
vercel --prod --yes
# --yes responde Y a todas las preguntas con los defaults/inferred values
```

### Pattern 3: Verificacion post-deploy
**What:** Checklist manual de rutas que deben funcionar con refresh directo (sin navegar desde `/`).
**When to use:** Inmediatamente despues de cada deploy.

```
Rutas a verificar (refresh directo en browser):
1. https://db-platform-u1.vercel.app/
2. https://db-platform-u1.vercel.app/unit/u1/concepts
3. https://db-platform-u1.vercel.app/unit/u1/quiz
4. https://db-platform-u1.vercel.app/unit/u1/cheatsheet
5. https://db-platform-u1.vercel.app/unit/u1/exercises
```

### Anti-Patterns to Avoid
- **Usar `vercel deploy` sin `--prod`:** Crea un preview deployment con URL aleatoria, no actualiza la URL de produccion.
- **Configurar `base` en vite.config.ts:** No es necesario para deploy en raiz `/`; rompe los paths si se agrega incorrectamente.
- **Incluir `buildCommand: "tsc -b && vite build"` en vercel.json:** Innecesario, Vercel usa el script `build` del `package.json` automaticamente.
- **No incluir `$schema`:** Tecnico minor, pero el schema habilita validacion y autocomplete.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SPA routing fallback | Nginx config manual, scripts custom | `rewrites` en vercel.json | Un objeto JSON de 3 lineas reemplaza toda la complejidad de configuracion de servidor |
| Deploy process | Scripts shell custom | `vercel --prod` | La CLI maneja build en servidor, upload, CDN invalidation, rollback atomico |

**Key insight:** El `vercel.json` con rewrites es literalmente el patron documentado por Vercel para SPAs Vite. No hay alternativa mas simple.

## Common Pitfalls

### Pitfall 1: Deploy a preview en lugar de produccion
**What goes wrong:** `vercel` sin `--prod` crea un URL de preview (ej: `db-platform-u1-abc123.vercel.app`), no actualiza `db-platform-u1.vercel.app`.
**Why it happens:** El comportamiento default de Vercel CLI es preview deployment.
**How to avoid:** Siempre usar `vercel --prod` (o `vercel deploy --prod`).
**Warning signs:** La URL en el output contiene un hash aleatorio en lugar del nombre del proyecto.

### Pitfall 2: 404 en refresh sin vercel.json
**What goes wrong:** Todas las rutas excepto `/` devuelven 404 en produccion porque Vercel intenta servir el archivo estatico de esa ruta.
**Why it happens:** Sin rewrites, Vercel busca `/unit/u1/concepts.html` que no existe. React Router solo funciona cuando el browser ya cargo `index.html`.
**How to avoid:** `vercel.json` con el rewrite `/(.*) -> /index.html` DEBE estar en el repo antes del deploy.
**Warning signs:** La app funciona desde `/` pero al hacer refresh en cualquier subruta aparece "404: NOT_FOUND".

### Pitfall 3: Nombre de proyecto incorrecto en primer deploy
**What goes wrong:** El proyecto se crea en Vercel con el nombre del directorio (`databaseplatformlearn`) en lugar de `db-platform-u1`.
**Why it happens:** Con `--yes`, Vercel infiere el nombre del `package.json` `name` field o del directorio.
**How to avoid:** En el primer deploy interactivo, responder `db-platform-u1` cuando pregunte el nombre. Alternativa: crear el proyecto en Vercel primero con ese nombre y luego hacer `vercel link`.
**Warning signs:** La URL generada es `databaseplatformlearn.vercel.app` en lugar de `db-platform-u1.vercel.app`.

### Pitfall 4: Build falla en Vercel pero no localmente
**What goes wrong:** `npm run build` pasa local pero falla en Vercel por errores TypeScript que son warnings en modo dev.
**Why it happens:** `tsc -b` en Vercel usa configuracion estricta. El entorno CI no tiene dependencias de dev extras.
**How to avoid:** Correr `npm run build` localmente antes del primer deploy y confirmar que sale con codigo 0.
**Warning signs:** El log de Vercel muestra errores de TypeScript.

### Pitfall 5: README contiene contenido default de Vite template
**What goes wrong:** El README actual (`/home/imorales/dev/databasePlatformLearn/README.md`) tiene el contenido generic del template Vite, no informacion del proyecto.
**Why it happens:** El proyecto fue iniciado con `create vite` y el README nunca fue actualizado.
**How to avoid:** Reemplazar el README completo como parte de esta fase. El contenido actual es completamente irrelevante para el proyecto.
**Warning signs:** README empieza con "# React + TypeScript + Vite" — ese es el template.

## Code Examples

Verified patterns from official sources:

### vercel.json completo para este proyecto
```json
// Source: https://vercel.com/docs/frameworks/vite#using-vite-to-make-spas
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Secuencia completa de deploy (primera vez)
```bash
# 1. Instalar CLI (si no esta instalado)
npm install -g vercel

# 2. Login
vercel login

# 3. Verificar build local
npm run build

# 4. Deploy a produccion (interactivo primera vez)
vercel --prod
# Responder: project name = db-platform-u1

# 5. Verificar URL en output: db-platform-u1.vercel.app
```

### Secuencia de re-deploy (subsiguiente)
```bash
# Un solo comando desde la raiz del proyecto
vercel --prod
```

### Estructura del README de deploy
```markdown
## Deploy

La plataforma esta disponible en: https://db-platform-u1.vercel.app

### Proceso de deploy manual

Prerequisito: Vercel CLI instalado (`npm install -g vercel`) y sesion iniciada (`vercel login`).

```bash
vercel --prod
```

### Verificacion post-deploy

Confirmar que las siguientes rutas no devuelven 404 al hacer refresh directo:

- https://db-platform-u1.vercel.app/
- https://db-platform-u1.vercel.app/unit/u1/concepts
- https://db-platform-u1.vercel.app/unit/u1/quiz
- https://db-platform-u1.vercel.app/unit/u1/cheatsheet
- https://db-platform-u1.vercel.app/unit/u1/exercises
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `--name` CLI flag para nombrar proyecto | Project linking via CLI interactivo | Deprecado en versiones recientes | El flag `--name` esta deprecated; hay que nombrar el proyecto en el wizard o via `vercel link` |
| `routes` en vercel.json | `rewrites` en vercel.json | Schema v2+ | `routes` es el API de bajo nivel, `rewrites` es la API de alto nivel recomendada para SPAs |

**Deprecated/outdated:**
- `--name` flag en CLI: deprecated en favor de project linking interactivo. No usar.
- `routes` array en vercel.json: funciona pero `rewrites` es el enfoque documentado para SPAs.

## Open Questions

1. **Nombre del proyecto en Vercel si ya existe un proyecto con ese nombre**
   - What we know: El nombre `db-platform-u1` debe estar disponible en la cuenta de Vercel del usuario
   - What's unclear: Si el nombre esta tomado, Vercel sugiere alternativas o falla
   - Recommendation: Si falla, usar `vercel link` para conectar a un proyecto existente o elegir nombre alternativo en el wizard

2. **Vercel CLI version exacta**
   - What we know: `npm install -g vercel` instala la ultima version
   - What's unclear: Version exacta en el momento del deploy
   - Recommendation: No fijar version — usar latest siempre para CLI tools de deploy

## Sources

### Primary (HIGH confidence)
- https://vercel.com/docs/frameworks/vite#using-vite-to-make-spas — Patron exacto de vercel.json para SPA Vite, confirmado en docs oficiales 2026
- https://vercel.com/docs/cli/deploy — Flags de `vercel deploy`, incluyendo `--prod`, `--yes`, deprecacion de `--name`
- https://vercel.com/docs/project-configuration/vercel-json — Schema completo de vercel.json, propiedades `rewrites`, `buildCommand`, `outputDirectory`

### Secondary (MEDIUM confidence)
- https://vercel.com/docs/frameworks/vite — Deteccion automatica de Vite por Vercel, defaults de buildCommand y outputDirectory

### Tertiary (LOW confidence)
- Ninguna — todos los findings clave estan verificados en docs oficiales

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — documentacion oficial de Vercel, verificada en 2026
- Architecture: HIGH — patron exacto de SPA+Vite documentado en vercel.com/docs/frameworks/vite
- Pitfalls: HIGH (Pitfalls 1-4) / MEDIUM (Pitfall 5) — Pitfall 5 verificado inspeccionando el README actual del proyecto

**Research date:** 2026-03-06
**Valid until:** 2026-06-06 (Vercel CLI y vercel.json schema son estables; 90 dias es conservador)
