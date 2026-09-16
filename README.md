# Age of Conurban — Tero Cosechado

Juego de estrategia y construcción para un jugador, ambientado en un barrio imaginario del conurbano bonaerense. Etapa 1: una maqueta viva sin combate, hecha con Three.js y Vite.

El escenario incluye calles, veredas, casas chorizo, sociedad de fomento, club de barrio y cultivos de soja en el borde urbano. Podés recuperar materiales, cosechar soja, reunir yerba e incorporar vecinos. El catálogo permite construir casas chorizo, almacenes, conventillos, lotes de soja, talleres, clubes y potreros de fútbol.

## Documentación

Leé [REGLAS_Y_MANUAL.md](./REGLAS_Y_MANUAL.md) para consultar los controles, reglas, costos, tiempos, funciones arquitectónicas, economía, guardado, límites y documentación técnica.

## Ejecutar

```sh
npm install
npm run dev
```

Abrí la dirección indicada por Vite. El servidor usa el puerto 5173.

```sh
npm test
npm run build
npm run preview
```

La compilación genera `dist/`, apto para alojamiento estático. Requiere WebGL 2; no necesita backend.

## Controles rápidos

- Clic para seleccionar; clic derecho para mover o trabajar.
- WASD / flechas: cámara. Rueda: zoom. Botón central: rotación.
- Teclas 1–7: construcciones. R: girar una construcción. Esc: cancelar.
- Espacio: pausa. Guardar y cargar desde el menú de pausa.
- En pantalla táctil: seleccionar un vecino y tocar el recurso o terreno.

El guardado es manual y local. No hay combate, rival ni multijugador. El potrero es un espacio construible; todavía no simula partidos.
