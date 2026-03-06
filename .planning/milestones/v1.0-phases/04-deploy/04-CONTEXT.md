# Phase 4: Deploy - Context

**Gathered:** 2026-03-06
**Status:** Ready for planning

<domain>
## Phase Boundary

La plataforma disponible publicamente en una URL permanente de Vercel con todas las rutas funcionando correctamente al hacer refresh, usando el build estatico de Vite como artefacto de deploy.

</domain>

<decisions>
## Implementation Decisions

### Plataforma de hosting
- Vercel como plataforma de deploy
- Conexion via vercel CLI (`vercel deploy --prod`), no desde Vercel UI
- Deploy en la raiz del dominio `/` — sin subpath (no requiere cambios en vite.config.ts)
- Incluir `vercel.json` explicito en el repo para documentar la configuracion

### URL y dominio
- URL auto-generada por Vercel, sin dominio propio
- Nombre del proyecto en Vercel: `db-platform-u1`
- URL resultante: `db-platform-u1.vercel.app`

### SPA routing en produccion
- Configurar rewrites en `vercel.json` para que todas las rutas devuelvan `index.html`
  - `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`
- React Router (`createBrowserRouter`) maneja el routing del lado del cliente
- Validacion post-deploy: hacer refresh en `/`, `/unit/u1/concepts`, `/unit/u1/quiz`, `/unit/u1/cheatsheet`, `/unit/u1/exercises` y confirmar que no hay 404

### CI/CD y workflow
- Deploy manual: el desarrollador corre `vercel deploy --prod` cuando quiere actualizar
- Sin CI/CD automatico ni git integration con Vercel
- Sin variables de entorno — app completamente estatica
- Documentar el proceso de deploy en README

### Claude's Discretion
- Estructura exacta del vercel.json (build command, output dir — Vercel detecta Vite automaticamente)
- Formato de la seccion de deploy en el README
- Orden de verificacion de rutas post-deploy

</decisions>

<specifics>
## Specific Ideas

- Verificar todas las secciones de U1 al hacer refresh para confirmar que SPA routing funciona end-to-end

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Build command existente: `tsc -b && vite build` — Vercel lo detecta automaticamente para proyectos Vite
- `vite.config.ts`: sin `base` configurado — confirma deploy en raiz `/`

### Established Patterns
- Router: `createBrowserRouter` con rutas `/` y `/unit/:unitId/:section` — requiere fallback a index.html en produccion
- Sin variables de entorno en el codebase — build limpio

### Integration Points
- `vercel.json` nuevo archivo en raiz del proyecto
- Seccion de Deploy en `README.md` existente (o crear si no existe)

</code_context>

<deferred>
## Deferred Ideas

- Git integration con Vercel (auto-deploy en push a main) — posible mejora futura si el flujo de trabajo lo requiere
- Dominio propio — si el proyecto escala o se usa en produccion real

</deferred>

---

*Phase: 04-deploy*
*Context gathered: 2026-03-06*
