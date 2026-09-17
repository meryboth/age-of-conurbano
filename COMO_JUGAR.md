# Cómo jugar a Tero Loteado

Guía de reglas para jugar a **Age of Conurban — Tero Loteado**. Para la referencia completa (interfaz, guardado, límites y detalles técnicos), mirá el [manual](./REGLAS_Y_MANUAL.md).

## Índice

1. [La idea](#1-la-idea)
2. [Cómo empieza la partida](#2-cómo-empieza-la-partida)
3. [El barrio: manzanas y lotes](#3-el-barrio-manzanas-y-lotes)
4. [Recursos](#4-recursos)
5. [Vecinos](#5-vecinos)
6. [Construir](#6-construir)
7. [Edificios](#7-edificios)
8. [Invitar vecinos y viviendas](#8-invitar-vecinos-y-viviendas)
9. [Objetivos](#9-objetivos)
10. [Controles](#10-controles)
11. [Consejos](#11-consejos)
12. [Problemas comunes](#12-problemas-comunes)

## 1. La idea

Sos quien organiza el barrio. Mandás a los vecinos a juntar recursos, usás esos recursos para construir en los lotes libres y sumás gente nueva para que el barrio crezca.

No hay combate ni rival, y la partida no termina: jugás a tu ritmo.

## 2. Cómo empieza la partida

| Arrancás con | Cantidad |
|---|---|
| Materiales | 280 |
| Soja | 120 |
| Yerba | 20 |
| Vecinos | 5: Ramón, Juana, Pedro, Rosa y Segundo |
| Lugares de vivienda | 32 |

El barrio ya tiene seis casas chorizo, un conventillo, la sociedad de fomento, un club de barrio y un lote de soja. Los vecinos esperan en la vereda, frente a la sociedad de fomento.

## 3. El barrio: manzanas y lotes

- **Manzanas:** el mapa tiene **3 × 3 manzanas**, separadas por calles con veredas.
- **Lotes:** cada manzana tiene **18 lotes**:
  - siete sobre la calle norte y siete sobre la calle sur;
  - dos sobre la calle este y dos sobre la calle oeste.
- **Corazón de manzana:** el centro son los fondos de las casas y **no se construye**.
- **Esquinas:** los lotes de las puntas de las filas norte y sur son de esquina.
- **Dónde no se construye:** las calles, las veredas y el corazón de manzana.

## 4. Recursos

| Recurso | Dónde se consigue | Para qué sirve |
|---|---|---|
| **Materiales** | Acopios de ladrillos y tablas (6 en el mapa, 300 unidades cada uno) | Construir |
| **Soja** | Cultivos de soja (4 en el mapa, 220 cada uno) y lotes de soja construidos | Algunos edificios e invitar vecinos |
| **Yerba** | Proveedurías de yerba (3 en el mapa, 220 cada una) y almacenes construidos | Invitar vecinos |

Reglas:

- **Ritmo de trabajo:** un vecino que llegó al recurso junta **2 unidades cada 1,25 segundos**.
- **Taller:** si hay uno terminado, los materiales rinden **2,5** por ciclo.
- **Entrega directa:** lo que se junta entra directo al inventario, sin viajes de vuelta.
- **Agotamiento:** los recursos del mapa se agotan y no vuelven. Cuando se agota uno, **su lote queda libre para construir**.
- **Producción automática:** los lotes de soja y los almacenes producen cada 5 segundos, sin que nadie trabaje en ellos.

## 5. Vecinos

- **Una tarea por vez:** cada vecino camina, junta un recurso, construye o está disponible. Una orden nueva reemplaza la anterior.
- **Orden directa:** seleccionalo y hacé **clic derecho** sobre:
  - un **recurso**, para juntarlo;
  - una **obra**, para construirla;
  - el **terreno**, para caminar hasta ahí.
- **Detener:** el botón **Detener** lo deja libre. Si estaba construyendo, la obra conserva su avance.
- **Asignar vecino:** en la ficha de un recurso, este botón elige a alguien automáticamente.
- **Lugar de trabajo:** los vecinos trabajan parados junto al borde del recurso o de la obra, cada uno en su lugar. Si no queda lugar libre alrededor, el juego avisa.
- **Obstáculos:** caminan por calles, veredas y pasillos, y esquivan edificios, recursos y autos estacionados.

## 6. Construir

1. Elegí un edificio con su tecla (<kbd>1</kbd> a <kbd>7</kbd>) o con su tarjeta en **Construir**.
2. Pasá el cursor por el barrio. La vista previa **salta al lote de abajo** y **gira sola** para que el frente mire a la calle.
3. Si está **verde**, hacé clic para empezar la obra. Si está **roja**, el lote no sirve.

Reglas:

- **Necesitás un vecino disponible:** que no tenga tarea ni esté caminando.
- **Costo:** se descuenta al confirmar. Cancelar o intentar en un lugar inválido no cuesta nada.
- **Lotes libres:** el lote o los lotes deben estar libres, sin otra construcción ni un recurso sin agotar.
- **Edificios de varios lotes:** ocupan lotes seguidos de la misma fila. El potrero (4 lotes) solo entra sobre las calles norte o sur.
- **Edificios pegados:** los edificios vecinos pueden quedar pegados, como casas con medianera.
- **Avance:** el constructor camina hasta la obra y el tiempo cuenta desde que llega. Si mandás más vecinos a la misma obra, cada uno suma avance.
- **Efecto:** el edificio **funciona recién al 100%**.
- **Sin vuelta atrás:** no se puede demoler, mover ni recuperar lo gastado.

Cómo se ve una obra:

- **Hasta el 20%:** encofrado, basamento de hormigón y hierros. En la soja y el potrero, en cambio, se nivela la tierra.
- **Del 20% al 100%:** el edificio sube entre andamios.
- **Al terminar:** se retiran los andamios y se levanta una nube de polvo.

## 7. Edificios

| Tecla | Edificio | Costo | Tiempo | Lotes | Efecto |
|---|---|---|---|---|---|
| 1 | Casa chorizo | 70 materiales | 11 s | 1 | +4 lugares de vivienda |
| 2 | Almacén | 90 materiales + 25 soja | 13 s | 1 | +1 yerba cada 5 s; **+2 si está en una esquina** |
| 3 | Conventillo | 150 materiales + 35 soja | 20 s | 2 | +8 lugares de vivienda |
| 4 | Lote de soja | 40 materiales | 7 s | 1 | +3 soja cada 5 s |
| 5 | Taller | 100 materiales + 20 soja | 15 s | 2 | +25% al juntar materiales |
| 6 | Club de barrio | 140 materiales + 30 soja | 18 s | 2 | Invitar cuesta 25 soja + 3 yerba |
| 7 | Potrero de fútbol | 45 materiales | 8 s | 4 | Espacio de juego; no produce nada |

Los tiempos son para **un** vecino. Sobre los beneficios:

- **Se suman:** la producción de cada almacén y de cada lote de soja.
- **No se acumulan:** el taller y el club. Un segundo taller no llega al 50%.

La **sociedad de fomento** viene con el barrio y no se puede construir. Desde ahí se invita a vecinos nuevos.

## 8. Invitar vecinos y viviendas

- **Dónde:** en la pestaña **Vecinos** (botón **Invitar**) o en la sociedad de fomento.
- **Costo por vecino:**

  | Situación | Costo |
  |---|---|
  | Con al menos un club terminado | 25 soja + 3 yerba |
  | Sin club | 35 soja + 5 yerba |

  El barrio arranca con un club, así que el costo reducido vale desde el principio.
- **Lugar libre:** tiene que haber un lugar libre de vivienda.
  - Cada **casa chorizo** terminada suma 4 lugares.
  - Cada **conventillo** terminado suma 8.
  - Las obras sin terminar no suman.
- **Llegada:** el vecino nuevo aparece frente a la sociedad de fomento, listo para recibir órdenes.

## 9. Objetivos

Para arrancar, el juego propone:

1. **Recuperar 30 materiales.** Los 280 iniciales no cuentan.
2. **Construir una casa chorizo nueva.**
3. **Invitar a un vecino.**

Al cumplirlos aparece un mensaje y seguís jugando libremente. No hay puntaje ni final.

## 10. Controles

| Acción | Mouse y teclado | Pantalla táctil |
|---|---|---|
| Seleccionar | Clic | Tocar |
| Dar una orden | Clic derecho | Con el vecino elegido, tocar el destino |
| Mover la cámara | Arrastrar el mapa, <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>, flechas o clic en el minimapa | Arrastrar con un dedo |
| Zoom | Rueda o botones + / − | Pellizcar |
| Girar la cámara | Botón central y arrastrar, o botón de rotar | Dos dedos |
| Volver al centro | Botón de centrar | Botón de centrar |
| Construir | <kbd>1</kbd>–<kbd>7</kbd> o las tarjetas | Tarjeta y después el lote |
| Cancelar la construcción | <kbd>Esc</kbd> o clic derecho | Botón **Cancelar** |
| Pausa | <kbd>Espacio</kbd>, <kbd>Esc</kbd> o botón de pausa | Botón de pausa |
| Colores de la interfaz | Botón de paleta: verde, azul o bordó | Botón de paleta |

**Guardar y cargar** se hace desde el menú de pausa. El guardado es manual, queda solo en ese navegador y la partida no se carga sola al abrir el juego.

## 11. Consejos

- **Repartí el trabajo desde el principio:** dos vecinos en materiales, uno en yerba y uno libre para construir.
- **Poné producción temprano:** un par de **lotes de soja** y un **almacén en esquina** hacen que la soja y la yerba entren solas.
- **Alterná casas e invitaciones:** sin lugares libres no entra nadie.
- **Construí cerca de los recursos:** así los vecinos caminan menos.
- **Guardá lugar para el potrero:** reservá **cuatro lotes seguidos** sobre una calle norte o sur antes de llenar la manzana.
- **Aprovechá los recursos agotados:** su lote queda libre para construir.
- **Guardá seguido:** no hay guardado automático.

## 12. Problemas comunes

**La vista previa está roja.**
El lote tiene otra construcción o un recurso sin agotar. Si el edificio ocupa varios lotes, todos tienen que estar libres. Movelo a lo largo de la fila o probá en otra manzana.

**Tengo recursos, pero no puedo construir.**
No hay vecinos disponibles, porque uno que está caminando cuenta como ocupado. Seleccioná a alguien y tocá **Detener**.

**La obra no avanza.**
El constructor todavía está caminando, recibió otra orden o el juego está en pausa. Seleccioná la obra y usá **Asignar constructor**.

**El vecino camina, pero no junta nada.**
La orden tiene que ser sobre el recurso, no sobre el suelo al lado.

**No puedo invitar.**
Revisá la soja, la yerba y los lugares libres de vivienda. Los materiales no sirven para invitar.

**Cargué una partida y nadie trabaja.**
Es normal: al cargar hay que volver a dar las órdenes.

**No puedo cargar una partida vieja.**
Las partidas del mapa anterior no son compatibles con el barrio de manzanas grandes.
