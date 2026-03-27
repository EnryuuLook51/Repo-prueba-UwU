# Astro Best Practices

## 🧩 IDEA CLAVE DE ASTRO

Astro separa:
- **HTML (estructura)** → `.astro`
- **Interactividad** → `.jsx` / `.tsx`
- **Lógica simple** → dentro de `.astro`

**Filosofía**: "menos JS en el navegador = más rápido"

## 📁 ¿PARA QUÉ SIRVE CADA COSA?

### 🟢 .astro → BASE DE TODO

Se usa para:
- layouts
- páginas
- componentes estáticos
- contenido

Es como HTML + JS simple (server-side)

### 🔵 .jsx / .tsx → INTERACTIVIDAD

Usas React SOLO cuando necesitas:
- clicks
- estados (useState)
- modales
- dashboards
- forms dinámicos

### 🟣 .ts / .js → lógica separada

Para:
- helpers
- utils
- API calls
- lógica reutilizable

## 🧠 ¿CUÁNDO USAR CADA UNO?

### 🟢 Usa .astro cuando:
- es contenido estático
- landing page
- hero, navbar, cards
- SEO importante

### 🔵 Usa .jsx cuando:
- necesitas interacción real
- el usuario hace cosas
- Ejemplos: carrito, login, filtros dinámicos

## 🔥 REGLA DE ORO

👉 Empieza SIEMPRE con `.astro`
👉 Solo usa React si: "sin JS no funciona"

## 🧱 EJEMPLO REAL

❌ MAL (todo en React):
```jsx
return <Hero />
```
👉 pesado, innecesario

✅ BIEN (Astro):
```astro
<Hero />
```
👉 sin JS → rápido

🧠 Y si necesitas JS:
```astro
<Counter client:load />
```
👉 Eso activa React SOLO ahí

## 🚀 ESTRUCTURA IDEAL

```
src/
  ├─ components/
  │   ├─ Hero.astro        ✅
  │   ├─ Navbar.astro      ✅
  │   ├─ Card.astro        ✅
  │   ├─ Counter.jsx       ⚠️ solo si necesitas
  │
  ├─ layouts/
  │   └─ BaseLayout.astro
  │
  ├─ pages/
  │   └─ index.astro
  │
  └─ utils/
      └─ helpers.ts
```

## 🎯 CASO REAL (web tipo zeroCO2)

👉 Usa .astro para:
- Header
- Hero
- Sections
- Footer
- JS (dentro de .astro) para scroll navbar

❌ NO necesitas React para eso

## 🔥 CONCLUSIÓN

- `.astro` = estructura y contenido
- `.jsx` = interactividad real
- `.ts/js` = lógica

## 🚀 CONSEJO PRO

Si intentas hacer TODO con React → estás usando mal Astro
