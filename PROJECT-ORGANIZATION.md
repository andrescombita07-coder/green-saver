# Organizacion del proyecto (GREEN SAVER)

## Estructura actual recomendada

```text
app/
  _layout.jsx
  index.jsx
  (auth)/
    login.jsx
    register.jsx
    recover-password.jsx
  (admin)/
    dashboard.jsx
    users.jsx
    statistics.jsx
  (user)/
    history.jsx
    history-detail.jsx
    info.jsx
    results.jsx
    calculate.jsx
    profile.jsx
    (tabs)/
      _layout.jsx
      index.jsx
      calculator.jsx
      profile.jsx

src/
  context/
    AuthContext.js
  theme/
    colors.js

components/
assets/
constants/
hooks/
```

## Reglas de organizacion

1. Mantener rutas de navegacion solo dentro de `app/` (Expo Router).
2. Usar imports por alias `@/` para evitar rutas relativas largas.
3. Ubicar logica compartida dentro de `src/` (contextos, helpers, servicios, tema).
4. Dejar `components/` para UI reutilizable (sin logica de negocio).
5. Mantener `app/(user)/(tabs)/` solo para pantallas del menu inferior.
6. Dejar en `app/(user)/` las pantallas secundarias fuera del tab bar (detalle, historial, etc.).

## Convenciones sugeridas para crecer

- Pantallas: `kebab-case` (ejemplo: `history-detail.jsx`).
- Componentes React: `PascalCase` en nombre de funcion.
- Evitar duplicar vistas con el mismo objetivo (por ejemplo, dos perfiles con rutas distintas).
- Si una pantalla crece, extraer su UI a `components/` y dejar en `app/` solo la composicion.

## Proximo orden recomendado

1. Unificar `profile.jsx` y `calculate.jsx` para que haya una sola experiencia por funcionalidad.
2. Migrar gradualmente de `.jsx` a `.tsx` para aprovechar tipado y evitar errores.
3. Mover assets no usados (logos de ejemplo de Expo) a una carpeta `assets/images/legacy` o eliminarlos.
4. Crear una carpeta `src/services/` para persistencia y APIs (ahora esta acoplado al contexto).
