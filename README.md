# BDD Lab UTFSM

Herramienta de estudio interactivo para INF-239. Practica SQL y autoevaluacion en el browser sin instalar nada.

Cubre la Unidad 1: fundamentos de bases de datos relacionales, modelo entidad-relacion, normalizacion y SQL basico.

## Ejecutar en local

```bash
npm install
npm run dev
```

## Deploy

**URL de produccion:** https://db-platform-u1.vercel.app

**Prerequisito:**

```bash
npm install -g vercel
vercel login
```

**Comando de deploy:**

```bash
vercel --prod
```

Vercel detecta Vite automaticamente y usa `npm run build` + carpeta `dist/`.

## Verificacion post-deploy

Hacer refresh directo (Ctrl+R o F5) en cada ruta y confirmar que no aparece "404: NOT_FOUND" de Vercel:

- [ ] https://db-platform-u1.vercel.app/
- [ ] https://db-platform-u1.vercel.app/unit/u1/concepts
- [ ] https://db-platform-u1.vercel.app/unit/u1/quiz
- [ ] https://db-platform-u1.vercel.app/unit/u1/cheatsheet
- [ ] https://db-platform-u1.vercel.app/unit/u1/exercises
