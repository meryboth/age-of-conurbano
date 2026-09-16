# Age of Conurban — Tero Cosechado

## Manual de juego, reglas y documentación de la etapa 1

**Versión del juego:** 0.1, prototipo jugable.  
**Última actualización:** 16 de septiembre de 2026.  
**Escenario:** Tero Cosechado, un barrio imaginario del conurbano bonaerense.  
**Modalidad:** un jugador, en tiempo real, sin combate.  
**Tecnología:** Three.js y Vite; ejecución en el navegador.

Este documento describe las reglas implementadas. Las ideas de desarrollo que todavía no forman parte del juego están identificadas al final. Las medidas, tiempos, rendimientos y costos son valores de juego; no representan presupuestos, dimensiones urbanísticas normativas ni ciclos agrícolas reales.

## Índice

1. [Qué es el juego](#1-qué-es-el-juego)
2. [Identidad y escenario](#2-identidad-y-escenario)
3. [Primera partida](#3-primera-partida)
4. [Controles](#4-controles)
5. [La interfaz](#5-la-interfaz)
6. [Recursos y economía](#6-recursos-y-economía)
7. [Vecinos y población](#7-vecinos-y-población)
8. [Reglas de construcción](#8-reglas-de-construcción)
9. [Catálogo de edificios y espacios](#9-catálogo-de-edificios-y-espacios)
10. [Movimiento y caminos](#10-movimiento-y-caminos)
11. [Objetivos y continuidad](#11-objetivos-y-continuidad)
12. [Pausa, sonido y guardado](#12-pausa-sonido-y-guardado)
13. [Ejemplo de desarrollo del barrio](#13-ejemplo-de-desarrollo-del-barrio)
14. [Preguntas y problemas frecuentes](#14-preguntas-y-problemas-frecuentes)
15. [Alcance y límites](#15-alcance-y-límites)
16. [Documentación técnica](#16-documentación-técnica)
17. [Criterios arquitectónicos](#17-criterios-arquitectónicos)
18. [Posibles etapas futuras](#18-posibles-etapas-futuras)
19. [Mantenimiento del manual](#19-mantenimiento-del-manual)

## 1. Qué es el juego

Age of Conurban es un juego de estrategia, recolección y construcción. Administrás vecinos, recuperás materiales y desarrollás un barrio mediante edificios y espacios con funciones distintas.

La etapa 1 es una **maqueta viva**: el mapa se puede recorrer, los vecinos reciben órdenes y caminan, los recursos se acumulan y las obras avanzan con el tiempo. El objetivo es construir y habitar, sin conquista ni enfrentamientos.

El ciclo principal es:

1. Seleccionar un vecino.
2. Asignarle un recurso o un destino.
3. Reunir los materiales necesarios.
4. Elegir un edificio y un lote adecuado.
5. Esperar a que el constructor llegue y termine la obra.
6. Aprovechar su función: vivienda, producción, abastecimiento o encuentro.

No hay una condición de derrota. Tampoco un límite de tiempo. Podés continuar después de completar los objetivos introductorios.

## 2. Identidad y escenario

### Tero Cosechado

Tero Cosechado es un escenario ficticio inspirado en el conurbano bonaerense. No reproduce un municipio, barrio ni momento histórico determinados.

El mapa incluye:

- Una trama de calles y veredas con manzanas y lotes.
- Casas chorizo con patios y medianeras.
- Una sociedad de fomento.
- Un club de barrio.
- Un conventillo con patio común.
- Arbolado, postes, cables, autos estacionados y tanques de agua.
- Una franja ferroviaria en el borde del mapa.
- Acopios de materiales y puestos de provisiones.
- Cultivos de soja en los sectores abiertos del borde urbano.

La presentación usa volúmenes tridimensionales simplificados y una cámara ortográfica. Las construcciones se reconocen por su distribución y sus elementos, no solamente por su nombre.

### La soja

La soja es el recurso agrícola elegido para esta versión. Reemplaza al maíz planteado durante el diseño. Se representa mediante plantas bajas de hojas anchas organizadas en surcos.

Su presencia corresponde a la interpretación del borde periurbano del escenario. No implica que todas las manzanas del conurbano tengan cultivos de soja. En las reglas actuales podés construir un lote de soja en cualquier espacio permitido; la ubicación periférica es una decisión de diseño del mapa inicial, no una restricción obligatoria del simulador.

### Club y potrero

El club de barrio ocupa el lugar de la cancha que aparecía en una versión preliminar. El club y el potrero de fútbol son elementos diferentes:

- El **club** tiene un edificio social, buffet y acceso desde la calle.
- El **potrero** es un terreno abierto, de césped irregular, con dos arcos sencillos.

Ambos están disponibles en el catálogo de construcción. No hay canchas de tenis en el escenario actual.

## 3. Primera partida

### Estado inicial

Una nueva partida comienza con:

- **280 materiales.**
- **120 soja.**
- **20 yerba.**
- **5 vecinos:** Ramón, Juana, Pedro, Rosa y Segundo.
- **32 lugares de alojamiento:** seis casas chorizo aportan 24 y un conventillo aporta 8.
- Una sociedad de fomento, un club de barrio y un lote de soja ya terminados.

Las casas existentes forman parte del barrio. La capacidad disponible no equivale al número de habitantes que ya se encuentran trabajando: la barra de población distingue ambas cantidades.

### Recorrido de inicio

1. Abrí la pestaña **Vecinos** y elegí a Ramón, o hacé clic sobre él en el mapa.
2. Hacé clic derecho sobre un acopio de ladrillos y tablas. Ramón caminará hasta allí y comenzará a recuperar materiales.
3. Elegí otro vecino y asignalo a un puesto de yerba o a un cultivo de soja.
4. Conservá por lo menos un vecino disponible para construir.
5. En **Construir**, elegí **Casa chorizo**.
6. Buscá un lote libre. Girá la casa con **R** si es necesario para que el frente mire a la calle.
7. Cuando la vista previa sea verde, hacé clic para iniciar la obra.
8. Esperá la llegada del constructor y la finalización del edificio.
9. En **Vecinos**, elegí **Invitar** para incorporar otra persona.
10. Cuando quieras detenerte, pausá y guardá la partida en el dispositivo.

## 4. Controles

### Mouse y teclado

- **Clic izquierdo sobre un vecino:** seleccionarlo.
- **Clic izquierdo sobre un edificio o recurso:** ver su información y las acciones disponibles.
- **Clic izquierdo en terreno vacío:** quitar la selección.
- **Clic derecho en el terreno con un vecino seleccionado:** ordenar que camine hacia ese lugar.
- **Clic derecho sobre un recurso con un vecino seleccionado:** asignar recolección o recuperación.
- **Clic derecho sobre una obra con un vecino seleccionado:** asignarlo a construir.
- **W, A, S, D o flechas:** desplazar la cámara.
- **Rueda del mouse:** acercar o alejar.
- **Botón central presionado y arrastre:** girar la cámara.
- **R, durante la colocación:** girar el edificio 90 grados.
- **Esc durante la colocación:** cancelar la vista previa.
- **Clic derecho durante la colocación:** cancelar la vista previa.
- **Espacio:** pausar o reanudar.
- **Esc fuera de la colocación:** abrir o cerrar la pausa; si está abierta la ayuda, cerrarla.

### Atajos de construcción

1. **Casa chorizo.**
2. **Almacén.**
3. **Conventillo.**
4. **Lote de soja.**
5. **Taller.**
6. **Club de barrio.**
7. **Potrero de fútbol.**

Las tarjetas indican el atajo en su esquina. Si no ves todas, desplazá horizontalmente el catálogo.

### Controles en pantalla

- **+ / −:** acercar y alejar.
- **Rotar cámara:** cambiar la orientación de la vista.
- **Centrar:** volver al barrio central y al zoom inicial.
- **Minimapa:** hacer clic para desplazar el centro de la cámara hacia ese sector.
- **Girar**, en la vista previa de construcción: alternativa a la tecla R.
- **Detener**, en la ficha del vecino: interrumpir su tarea y recorrido actuales.

### Pantallas táctiles

- Tocá un vecino o elegilo desde **Vecinos**.
- Con ese vecino seleccionado, tocá un recurso para asignarlo.
- Tocá terreno vacío para ordenarle caminar.
- Elegí una tarjeta y tocá un lote para colocar una construcción.
- Usá **Girar** y **Cancelar** en la barra de colocación.
- El gesto de dos dedos permite acercar y girar la cámara.

La interfaz se adapta a pantallas pequeñas. El minimapa se oculta para dejar más espacio y el catálogo se puede desplazar lateralmente. Una computadora ofrece más precisión para construir y dar órdenes.

## 5. La interfaz

### Barra superior

Muestra materiales, soja, yerba y población.

Los pequeños indicadores **+N** junto a los recursos representan la cantidad de vecinos asignados a esa actividad. **No son unidades por segundo** y no incluyen producción automática de edificios. También pueden contar a vecinos que todavía caminan hacia el recurso.

Los valores del inventario se muestran redondeados hacia abajo. Internamente puede haber fracciones por el beneficio del taller.

### Nombre y reloj

La esquina superior izquierda identifica Tero Cosechado y muestra el tiempo de simulación transcurrido. El reloj se detiene al pausar o abrir la ayuda.

La tarde de primavera es la ambientación visual fija. Todavía no existe un ciclo de día y noche ni estaciones jugables.

### Objetivos

El panel **Echar raíces** muestra tres metas introductorias y el progreso acumulado. No hace falta completarlas en un orden determinado.

### Panel de selección

Su contenido cambia según el objeto seleccionado:

- **Vecino:** nombre, actividad y botón Detener.
- **Recurso:** tipo, cantidad restante y botón Asignar vecino.
- **Edificio:** nombre, función y descripción.
- **Obra:** porcentaje de avance y posibilidad de asignar un constructor.
- **Sociedad de fomento:** posibilidad de invitar a un vecino.

### Catálogo

Cada tarjeta muestra una miniatura del mismo modelo 3D utilizado en el mapa, su nombre y sus costos. Al pasar el mouse aparece información de su ocupación y función. Una tarjeta con costos destacados en rojo indica recursos insuficientes.

## 6. Recursos y economía

### Materiales

Representan ladrillos, tablas y otros insumos de construcción recuperables.

- Se obtienen de **acopios de materiales** visibles en el mapa.
- Cada acopio empieza con **300 unidades**.
- Hay **seis acopios iniciales**.
- Se consumen al confirmar una construcción.
- Los árboles son arbolado urbano decorativo: no se talan ni producen materiales.

### Soja

Es el recurso agrícola de esta etapa.

- Se cosecha en **cultivos de soja** mediante vecinos.
- Cada cultivo recolectable comienza con **220 unidades**.
- Hay **cuatro cultivos recolectables iniciales**.
- Cada **lote de soja construido y terminado** produce además **3 unidades cada 5 segundos de simulación**.
- Se usa para invitar vecinos y para algunos costos de construcción.

Un cultivo recolectable y un lote construido son objetos distintos. El primero tiene una reserva que se agota; el segundo produce de manera automática mientras la simulación avanza.

### Yerba

Es una provisión del barrio, no un cultivo local en este mapa.

- Se obtiene de **puestos de yerba**.
- Cada puesto comienza con **220 unidades**.
- Hay **tres puestos iniciales**.
- Cada **almacén terminado** aporta **1 unidad cada 5 segundos de simulación**.
- Se utiliza al invitar vecinos.

### Ritmo de trabajo

Un vecino que llegó a su recurso obtiene **2 unidades cada 1,25 segundos de simulación**. El tiempo de desplazamiento se suma antes de empezar a recolectar.

Con por lo menos un taller terminado, la recuperación de materiales aumenta un **25%**: pasa a **2,5 unidades por ciclo**. El taller no modifica soja ni yerba. Tener varios talleres no acumula este beneficio.

Los recursos obtenidos entran directamente en el inventario. No hay acarreo, viajes de regreso al depósito, capacidad de carga ni inventario individual implementados.

### Agotamiento

Los acopios, cultivos recolectables y puestos tienen reservas finitas. Cuando una reserva llega a cero, ese objeto desaparece y el vecino queda disponible. No busca automáticamente otro recurso.

Los recursos agotados no reaparecen. La producción de lotes de soja y almacenes terminados continúa sin consumir una reserva. Todavía no existe una fuente renovable automática de materiales.

### Simplificación económica

No hay dinero, comercio, mercado, salarios, mantenimiento, hambre ni consumo periódico por habitante. La soja que se utiliza para obras es un costo abstracto de abastecimiento; no pretende modelar literalmente una cadena alimentaria o agrícola.

## 7. Vecinos y población

Cada vecino puede tener una actividad a la vez: caminar, recuperar materiales, cosechar soja, retirar yerba, construir o permanecer disponible.

Una nueva orden reemplaza la anterior. El botón **Detener** también interrumpe el recorrido. Si el vecino trabajaba en una obra, la obra conserva el avance alcanzado.

### Invitar personas

Podés invitar desde la sociedad de fomento o desde la pestaña Vecinos.

- Sin club terminado: **35 soja y 5 yerba** por vecino.
- Con por lo menos un club terminado: **25 soja y 3 yerba**.
- Tero Cosechado empieza con un club terminado; por eso la tarifa reducida está activa desde el inicio.
- Debe existir un lugar libre en la capacidad de alojamiento.
- Los costos se descuentan inmediatamente.
- El nuevo vecino aparece cerca del centro del barrio y espera una orden.

El club no aloja personas. Su beneficio es facilitar la incorporación de vecinos. Varios clubes no reducen otra vez el costo.

### Alojamiento

- Cada casa chorizo terminada aporta **4 lugares**.
- Cada conventillo terminado aporta **8 lugares**.
- Una obra incompleta no aporta capacidad.
- No existe asignación individual de cada vecino a una vivienda concreta.
- No hay nacimientos, envejecimiento, muerte ni emigración.

### Asignación rápida

El botón **Asignar vecino** de un recurso elige primero un vecino disponible. Si no hay uno, puede reasignar al primero de la lista. Si querés decidir exactamente quién trabajará, seleccioná a esa persona y usá una orden directa sobre el recurso.

Para iniciar una construcción nueva se exige un vecino sin tarea y sin un desplazamiento pendiente. La selección de ese constructor es automática entre los disponibles.

## 8. Reglas de construcción

### Colocación

1. Elegí una tarjeta o su atajo.
2. El edificio aparece como una vista previa semitransparente.
3. Mové el cursor sobre el mapa.
4. Girá con R o con el botón Girar si hace falta.
5. Confirmá con clic sobre una posición válida.

**Verde** significa posición permitida. **Rojo** indica que alguna regla no se cumple.

### Restricciones

No se puede construir:

- Fuera de los límites edificables del mapa.
- Sobre las calles o las franjas de vereda reservadas.
- Encima de otra construcción, incluida una obra incompleta.
- Sobre un recurso todavía disponible.
- Encima de un vecino.
- En el espacio reservado a la torre de agua.
- Invadiendo el borde ferroviario.

Las edificaciones cerradas deben orientar su frente hacia una calle cercana. Los lotes de soja y potreros, por ser espacios abiertos, no tienen esta exigencia de frente.

La orientación se ajusta en giros de 90 grados. Un edificio alargado intercambia su ancho y profundidad al girarlo; las colisiones utilizan esa ocupación rectangular real.

### Costos y avance

- Los costos se descuentan cuando confirmás una posición válida.
- Cancelar una vista previa no gasta recursos.
- Un intento inválido no gasta recursos.
- El constructor debe caminar hasta la obra.
- El tiempo del catálogo corresponde al trabajo de **un vecino**, después del desplazamiento.
- Podés asignar vecinos adicionales a una obra mediante órdenes directas; cada uno aporta avance mientras trabaja.
- La función del edificio se activa al llegar al 100%.

### Interrumpir y retomar

Detener al constructor no borra la obra. Podés seleccionarla y utilizar **Asignar constructor**, o seleccionar un vecino y darle una orden directa sobre ella.

No hay demolición, traslado, devolución de costos ni cancelación con reembolso de una obra ya colocada. Revisá el lote y la orientación antes de confirmar.

## 9. Catálogo de edificios y espacios

Las ocupaciones siguientes se expresan en **unidades del mapa**, no en metros ni lotes catastrales reales.

### 9.1 Sociedad de fomento

Es una construcción inicial y no aparece como opción para construir nuevas copias.

- **Función:** punto de encuentro y acceso a Invitar vecino.
- **Arquitectura:** salón, frente identificable, entrada, ventanas y pequeño espacio de reunión.
- **No produce** recursos ni capacidad de vivienda.

### 9.2 Casa chorizo — tecla 1

- **Costo:** 70 materiales.
- **Trabajo:** 11 segundos con un vecino.
- **Ocupación:** 3 de ancho por 6 de profundidad.
- **Efecto:** +4 lugares de alojamiento.

El modelo tiene lote alargado, cuartos en fila junto a una medianera, puertas a una galería, patio lateral, acceso por zaguán y servicios en el fondo. La fachada posee aberturas y remate propio; el patio incluye detalles domésticos.

No es un rancho renombrado: la profundidad del lote y la relación entre cuartos y patio son visibles desde la cámara.

### 9.3 Almacén — tecla 2

- **Costo:** 90 materiales y 25 soja.
- **Trabajo:** 13 segundos.
- **Ocupación:** 3,6 por 3,6.
- **Efecto:** +1 yerba cada 5 segundos.

Tiene local a la calle, vidriera, cartel, toldo y volumen de depósito. Su función de abastecimiento es independiente de la vivienda.

Varios almacenes suman sus producciones. No requieren un vecino asignado después de la construcción.

### 9.4 Conventillo — tecla 3

- **Costo:** 150 materiales y 35 soja.
- **Trabajo:** 20 segundos.
- **Ocupación:** 6 por 6.
- **Efecto:** +8 lugares de alojamiento.

Representa cuartos alrededor de un patio compartido, galerías de circulación y servicios al fondo. Su capacidad mayor responde a una organización residencial colectiva.

El modelo es una interpretación simplificada; no pretende representar todas las variantes históricas del conventillo.

### 9.5 Lote de soja — tecla 4

- **Costo:** 40 materiales.
- **Trabajo:** 7 segundos.
- **Ocupación:** 3,4 por 3,4.
- **Efecto:** +3 soja cada 5 segundos.

Presenta surcos y plantas de hojas anchas. Puede ubicarse sin orientar un frente hacia la calle. Cada lote terminado produce automáticamente y sus rendimientos se suman.

Todavía no hay siembra, fertilización, agua, estaciones, maduración ni cosecha estacional.

### 9.6 Taller — tecla 5

- **Costo:** 100 materiales y 20 soja.
- **Trabajo:** 15 segundos.
- **Ocupación:** 4 por 4,8.
- **Efecto:** +25% a la recuperación de materiales de los vecinos.

Tiene una nave de trabajo, portón, cubierta de chapa y espacio de apoyo. La mejora representa la disponibilidad de herramientas y oficios.

El beneficio es global y no acumulable. Construir un segundo taller no convierte el aumento en 50%.

### 9.7 Club de barrio — tecla 6

- **Costo:** 140 materiales y 30 soja.
- **Trabajo:** 18 segundos.
- **Ocupación:** 6 por 6.
- **Efecto:** reduce la invitación de vecinos a 25 soja y 3 yerba.

Tiene salón social, buffet, entrada a la calle, marquesina y lugar para reunirse en el frente. Es un edificio comunitario: no suma viviendas ni genera una renta automática.

La copia inicial ya activa el beneficio. Podés construir más clubes como parte de la composición del barrio, pero el descuento no se acumula.

### 9.8 Potrero de fútbol — tecla 7

- **Costo:** 45 materiales.
- **Trabajo:** 8 segundos.
- **Ocupación:** 7 por 7.
- **Efecto económico:** ninguno.

Es un espacio abierto con césped irregular, sectores de tierra y dos arcos. Su propósito en esta etapa es permitir diseñar un lugar de juego barrial.

No suma alojamiento ni produce recursos. No hay partidos, equipos, marcador, entrenamiento ni una variable de felicidad. Los vecinos todavía no juegan automáticamente al fútbol. Su valor actual es espacial y visual.

## 10. Movimiento y caminos

Las unidades buscan un recorrido sobre una grilla mediante A*. Pueden moverse horizontal, vertical y diagonalmente, evitando atravesar las ocupaciones rectangulares de los edificios.

Las diagonales no deben cortar esquinas bloqueadas. Cuando el destino coincide con un edificio, el sistema busca una posición accesible cercana a su borde.

El borde ferroviario queda fuera del área de movimiento de los vecinos. No hay trenes en circulación ni simulación de tránsito.

La navegación es una primera implementación: no incluye circulación interior por habitaciones y patios, colisiones físicas entre vecinos, formación de grupos ni evasión sofisticada. Los objetos pequeños del decorado no equivalen necesariamente a obstáculos de navegación.

## 11. Objetivos y continuidad

El panel introductorio propone:

1. **Recuperar 30 materiales.** Cuenta lo obtenido por vecinos durante la partida; los 280 materiales iniciales no cumplen esta meta.
2. **Construir una casa chorizo.** Debe terminarse una nueva; las casas del mapa inicial no cumplen la meta.
3. **Invitar a un nuevo vecino.** Cuenta una incorporación realizada durante la partida.

El avance se conserva al guardar. Al completar las tres metas aparece un mensaje y podés seguir jugando libremente.

No hay puntaje, medallas, campañas ni final obligatorio. Las obras y la economía básica continúan funcionando después del tutorial.

## 12. Pausa, sonido y guardado

### Pausar

Usá el botón de pausa o Espacio. La pausa detiene desplazamientos, trabajo, producción automática y reloj. Abrir la ayuda también pausa la simulación.

### Sonido

El botón de sonido activa o desactiva un ambiente suave generado por el navegador. La activación es manual. No hay música licenciada, voces ni banda sonora externa.

### Guardado local

1. Pausá.
2. Elegí **Guardar en este dispositivo**.
3. Esperá el mensaje de confirmación.

Existe **un solo espacio de guardado**. Guardar de nuevo reemplaza la partida previamente guardada en ese espacio.

Se conservan:

- Recursos y tiempo de simulación.
- Vecinos, nombres y posiciones.
- Construcciones nuevas, posiciones, orientaciones y avance.
- Reservas restantes de los recursos del mapa.
- Progreso de los objetivos introductorios.

Al cargar, los vecinos quedan disponibles: **las tareas y rutas no se restauran**. Las obras incompletas conservan su porcentaje y necesitan que les asignes un constructor.

No se conserva la posición de cámara ni la selección. Tampoco se calcula producción por el tiempo que el juego estuvo cerrado.

### Dónde queda el guardado

Se guarda en `localStorage` del navegador, bajo la clave `conurban-barrio-v2`. Depende del navegador, dispositivo y dirección desde la cual se ejecuta el juego.

Consecuencias:

- La vista local y una dirección publicada pueden tener guardados diferentes.
- Cambiar de navegador o dispositivo no transfiere la partida.
- Borrar los datos del sitio puede eliminarla.
- El modo privado puede descartarla al cerrar la sesión.
- No hay cuenta, guardado en la nube, exportación ni sincronización.
- No hay guardado automático: guardá manualmente antes de cerrar o recargar.

## 13. Ejemplo de desarrollo del barrio

Una secuencia posible para familiarizarte con los sistemas:

1. Asigná un vecino a materiales y dejá que reúna las primeras 30 unidades.
2. Destiná otro a yerba para sostener la incorporación de población.
3. Mantené un vecino libre y construí una casa chorizo en un lote con acceso correcto.
4. Invitá un vecino aprovechando el club existente.
5. Construí un almacén para generar yerba periódicamente.
6. Agregá un lote de soja para ampliar la producción automática.
7. Si necesitás más materiales por unidad de tiempo, construí un taller.
8. Reservá una manzana suficientemente libre para un potrero.
9. Completá el barrio con viviendas y espacios de encuentro según tu composición preferida.

Esta secuencia no es obligatoria ni garantiza un resultado competitivo: todavía no hay rival ni una condición que exija optimizar la economía.

## 14. Preguntas y problemas frecuentes

### La construcción aparece en rojo

Revisá el frente, el ancho, la profundidad y los obstáculos. Un edificio puede parecer pequeño en pantalla y ocupar un lote largo. Giralo con R o probá más cerca del centro de otra manzana. Un vecino parado sobre el lote también impide construir allí.

### Tengo recursos, pero no puedo iniciar una obra

Necesitás un vecino disponible. Una persona que todavía está caminando cuenta como ocupada. Seleccionala y elegí Detener, o esperá a que llegue.

### La obra no avanza

El constructor puede estar caminando, haberse detenido o haber recibido otra orden. Verificá que la partida no esté pausada. Seleccioná la obra y asigná un constructor disponible.

### El vecino camina, pero no consigue recursos

Una orden sobre el suelo solamente lo mueve. Para recolectar, la orden debe apuntar al objeto del recurso. Verificá el estado del vecino; debería indicar recuperación o cosecha y no solamente Caminando.

### No puedo invitar a alguien

Revisá soja, yerba y capacidad libre. Los materiales no pagan las invitaciones. Una casa incompleta todavía no aumenta la capacidad.

### El potrero no produce nada

Es intencional. En la etapa 1 es un espacio construible, sin producción ni simulación de partidos.

### El segundo taller o club no mejora el beneficio

Los beneficios de esos edificios no se acumulan. En cambio, cada almacén y cada lote de soja sí aporta su propia producción.

### No encuentro todos los edificios en el catálogo

Desplazá la fila horizontalmente o usá los atajos del 1 al 7. En pantallas pequeñas no se muestran las siete tarjetas simultáneamente.

### Al cargar, nadie sigue trabajando

El guardado conserva el barrio y sus recursos, pero las órdenes se asignan de nuevo. Esto también se aplica a constructores de obras incompletas.

### Recargué y comenzó una partida nueva

El inicio no carga automáticamente el guardado. Abrí pausa y elegí **Cargar partida guardada**. Si no guardaste antes de recargar, ese progreso no estará disponible.

### El juego se siente lento

La calidad depende del navegador, la GPU y la cantidad de geometría. Probá cerrar otras aplicaciones exigentes y usar una ventana más pequeña. El juego limita el avance por cuadro para evitar saltos bruscos; con una tasa de cuadros muy baja, la simulación puede transcurrir más lentamente que el tiempo real.

### Puedo seleccionar un edificio pero no entrar

La arquitectura muestra espacios reconocibles, pero no se simula vida interior. Los edificios funcionan como ocupaciones del terreno para la navegación de esta etapa.

## 15. Alcance y límites

### Implementado

- Escenario 3D de Tero Cosechado.
- Selección de unidades, recursos y construcciones.
- Órdenes de movimiento y búsqueda de caminos.
- Recuperación y cosecha con reservas finitas.
- Siete opciones de construcción.
- Orientación y ocupación rectangular de lotes.
- Obras con costo, avance y asignación de vecinos.
- Capacidad residencial e incorporación de población.
- Producción automática básica y beneficios de taller y club.
- Objetivos introductorios.
- Pausa, ayuda, sonido opcional y guardado manual local.
- Interfaz adaptable y controles táctiles básicos.

### No implementado

- Combate, armas, conquista o destrucción rival.
- Enemigos y rival controlado por computadora.
- Multijugador, servidores de partida o sincronización.
- Campaña, épocas y árbol de desbloqueos.
- Comercio, dinero, impuestos y cadenas industriales.
- Necesidades individuales, felicidad o asistencia al club.
- Partidos de fútbol y actividades autónomas en el potrero.
- Ciclos agrícolas, riego, clima o estaciones dinámicas.
- Trenes o tránsito vehicular en movimiento.
- Interior habitable, demolición y traslado de edificios.
- Selección múltiple, colas de órdenes y formación de unidades.
- Guardado automático, nube y exportación de partidas.

La palabra «web» describe dónde se ejecuta. No significa que esta versión tenga juego online entre varias personas.

## 16. Documentación técnica

### Puesta en marcha

Requisitos de desarrollo: Node.js compatible con Vite 7 y npm. El `package-lock.json` fija las versiones resueltas.

```sh
npm install
npm run dev
```

El servidor local utiliza el puerto 5173 y está configurado para no saltar silenciosamente a otro puerto si ya está ocupado. Abrí la dirección que indique la terminal.

Para generar y revisar una compilación de producción:

```sh
npm run build
npm run preview
```

`dist/` contiene el resultado estático. El juego no necesita backend ni base de datos remota. Abrir `index.html` directamente como archivo no reemplaza el servidor de desarrollo.

### Archivos principales

- `index.html`: entrada, idioma, título y metadatos.
- `src/main.js`: interfaz, selección, órdenes, simulación, cámara, guardado y carga.
- `src/world.js`: mapa, modelos arquitectónicos, recursos y miniaturas 3D.
- `src/economy.js`: catálogo, costos, tiempos, capacidad y reglas de ocupación.
- `src/style.css`: presentación y adaptación de la interfaz.
- `vite.config.js`: servidor y separación de paquetes de producción.
- `tests/economy.test.js`: pruebas de costos, lotes, orientación y restricciones.
- `scripts/playthrough.mjs`: recorrido de verificación mediante navegador.
- `README.md`: entrada breve al proyecto.
- `REGLAS_Y_MANUAL.md`: este manual.

### Estado y simulación

Los recursos, unidades, edificios y nodos recolectables viven en memoria durante la sesión. La simulación se actualiza mediante `requestAnimationFrame`. Los movimientos usan el tiempo transcurrido entre cuadros, limitado para impedir saltos excesivos.

La producción automática utiliza un intervalo global de cinco segundos de simulación. Por eso la primera entrega de un edificio terminado puede ocurrir antes de que transcurran cinco segundos completos desde su terminación: se incorpora al siguiente ciclo común.

Los identificadores internos `wood`, `food` y `yerba` corresponden, en la interfaz actual, a materiales, soja y yerba. `huerta` identifica el lote de soja. Son nombres internos heredados, no recursos adicionales.

### Renderizado

Se utiliza una cámara ortográfica, iluminación ambiental y direccional, sombras y modelos generados con geometrías de Three.js. Las miniaturas del catálogo se renderizan a partir de los mismos modelos que aparecen en el mapa.

No se descargan modelos 3D ni texturas de edificios de terceros. Las fuentes tipográficas se solicitan a Google Fonts y tienen alternativas locales si esa solicitud falla.

### Verificación

```sh
npm test
npm run build
```

Las pruebas unitarias comprueban costos, límites de terreno, calles y veredas, separación de edificios, rotación y orientación del frente. El recorrido de navegador comprueba interacción y progresión. No representan una certificación de compatibilidad con todos los dispositivos.

El script de navegador incluido usa Playwright y una ubicación de dependencias propia del entorno donde se creó este prototipo. Para ejecutarlo en otra computadora, adaptá su importación o instalá Playwright y elegí un navegador compatible.

### Requisitos de ejecución

El renderizador requiere WebGL 2. El guardado requiere que el navegador permita almacenamiento local. El sonido depende de Web Audio y de una interacción del usuario.

### Ajustar el balance

Para modificar costos, tiempos y capacidad, editá `BUILDINGS` en `src/economy.js`. Las fórmulas de recolección, producción e invitación están en `src/main.js`; el inventario y las reservas iniciales también dependen de `src/world.js`.

Si cambia cualquiera de esos valores, actualizá simultáneamente los textos de la interfaz y este manual. Si cambia el formato del guardado, definí explícitamente una nueva versión o una migración.

## 17. Criterios arquitectónicos

La intención es que forma, ocupación y función se correspondan:

- **Casa chorizo:** secuencia longitudinal de habitaciones, medianera y patio lateral.
- **Conventillo:** habitaciones y servicios vinculados a un espacio compartido.
- **Almacén:** local visible y accesible desde la calle, con apoyo de depósito.
- **Taller:** nave de trabajo y portón de acceso.
- **Club:** salón, buffet y frente comunitario.
- **Potrero:** vacío utilizable con arcos, no un edificio cerrado.

Los modelos no son documentación de obra ni levantamientos de edificios existentes. La escala está adaptada para que se entiendan al jugar.

### Referencias de tipología

La organización de la casa chorizo se contrastó con fuentes universitarias:

- [Universidad Nacional del Litoral — Museo Virtual de la Memoria Gringa, casa italianizante y casa chorizo](https://www.fhuc.unl.edu.ar/portalgringo/museoaltrocche/fotos_casa_italianizante.html).
- [Universidad Nacional de San Juan — La vivienda a patios: una genealogía](https://www.ipp.faud.unsj.edu.ar/2025/la-vivienda-a-patios-una-genealogia-2/).
- [Universidad Nacional de Quilmes — Espacios comunes y urbanismo popular](https://www.mundourbano.unq.edu.ar/index.php/publicaciones-por-ano/287-espacios-comunes-hacia-la-construccion-de-utopias-urbano-habitacionales-buenos-aires-y-el-urbanismo-popular).

Las referencias fundamentan la organización espacial general. Los materiales, proporciones gráficas, colores y detalles del prototipo son decisiones de representación.

## 18. Posibles etapas futuras

Esta sección reúne posibilidades, **no funciones disponibles ni un compromiso de implementación**.

### Profundizar la maqueta viva

- Mayor variedad de fachadas y posibilidades de ampliación.
- Parcelas con medidas y accesos más precisos.
- Movimiento por patios, galerías y veredas.
- Actividades cotidianas: mate, buffet, partidos y encuentros.
- Selección múltiple y mejores órdenes para grupos.
- Demolición, confirmación, devolución parcial y traslado.
- Mejor acceso táctil, accesibilidad y rendimiento.
- Varias partidas guardadas, exportación e importación.

### Etapa 2

- Economía más elaborada y cadenas de abastecimiento.
- Desbloqueos por etapas de crecimiento del barrio.
- Rival o comunidad controlada por la computadora, con objetivos definidos.
- Necesidades y servicios urbanos, si se incorporan al diseño.

### Etapa 3

- Multijugador con simulación sincronizada y servidor.
- Sesiones compartidas, reconexión y resolución de órdenes.
- Persistencia y protección del estado autoritativo.

Estas etapas necesitan nuevas reglas, pruebas y documentación. Publicar el sitio web no las activa por sí mismo.

## 19. Mantenimiento del manual

Este manual debe describir el juego que se puede ejecutar, no solamente la intención de diseño.

Antes de publicar una revisión:

1. Confirmar nombre del escenario y catálogo visible.
2. Comparar costos, tiempos, capacidad y producción con el código.
3. Revisar controles, mensajes y acciones de la interfaz.
4. Probar recolección, una obra y una invitación.
5. Probar guardado y carga de una obra terminada y una incompleta.
6. Actualizar los límites conocidos.
7. Mover una idea de «futura» a «implementada» solamente después de verificarla.

Las reglas de esta versión son pequeñas a propósito: su centro es que Tero Cosechado se pueda construir, recorrer y reconocer como un barrio con identidad propia.
