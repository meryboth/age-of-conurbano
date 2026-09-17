# Diseño de la campaña: "Cien años de Tero Loteado"

Documento de diseño para la etapa 2 de *Age of Conurban*.

Las fuentes de cada concepto histórico están en [HISTORIA_URBANA.md](./HISTORIA_URBANA.md).

**Estado:** propuesta del 17 de septiembre de 2026, pendiente de validar con prototipo.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Eje del juego | **Campaña por capítulos**, con modo libre como complemento |
| Tensión estratégica | **Un barrio vecino que compite**, Villa Chimango, sin combate |
| Público | **Adolescentes y adultos**, no pensado para uso escolar |
| Nombres | **Tero Loteado** (el barrio del jugador, un guiño al chiste del pueblo perdido del conurbano, pero sin estigmatizar) y **Villa Chimango** (el barrio vecino) |
| Ritmo | **Tiempo acelerable:** pausa, ×1, ×2 y ×4 |
| Imágenes del archivo | **Mezcla** de fotos de dominio público (Archivo General de la Nación y otras) e ilustraciones propias |

## 1. La idea

El juego cuenta **cómo nace y se consolida un barrio del conurbano** a lo largo de cien años:

- **Comienzo:** un campo con quintas, a pocas cuadras de una estación nueva.
- **Final:** un barrio con servicios, instituciones y memoria.

Cada capítulo cambia las reglas, como cambiaron en la historia real.

**El rol del jugador:** es **la comunidad organizada** del barrio. No hay un personaje único. Decide:

- dónde se instalan las familias;
- qué se construye y en qué orden;
- qué se le reclama al municipio;
- cómo responder a los acontecimientos.

**De dónde viene la tensión:** de fuerzas que existieron, no de una guerra.

- **El mercado del suelo:** rematadores, cuotas y especulación con el tren.
- **El Estado:** leyes que cambian las reglas, obras que llegan tarde y erradicaciones.
- **Lo que falta:** calles de tierra, falta de agua e inundaciones.
- **Villa Chimango:** el barrio vecino, que compite por las familias y por las obras del municipio.

## 2. Pilares de diseño

1. **Cada concepto histórico es una decisión, no un texto.** Por ejemplo:
   - la Ley 14.005 no se explica: aparece como "ya pagaste el 25%, podés escriturar";
   - el tren no se describe: aparece como "este lote vale el doble porque está a dos cuadras de la estación".
2. **La casa crece de a poco.** La autoconstrucción es el corazón visual y emocional del juego.
3. **La organización vecinal es poder.** Lo que no se consigue solo se consigue en conjunto.
4. **Historia verificable, ficción declarada.** Tero Loteado y Villa Chimango son inventados; los hechos y las leyes son reales y tienen fuente.
5. **Respeto por los temas duros.** Ver la sección 9.

## 3. Sistemas

### 3.1 Recursos

| Recurso | Qué representa | Cómo se consigue | En qué se gasta |
|---|---|---|---|
| **Materiales** | Ladrillos, chapa, tirantes | Corralón (se compran con ahorro) y acopios | Construir y ampliar |
| **Verdura** | Producción de las quintas | Quintas del borde y huertas en el fondo del lote | Mantener a las familias; vender en el almacén |
| **Ahorro** | Los ahorros de las familias | Trabajo en la ciudad (se viaja en tren), en quintas y en talleres | Cuotas de lotes, corralón, créditos |
| **Organización** | Capital social del barrio | Asambleas, club, biblioteca, festivales | Reclamos al municipio y respuesta a eventos |

**Cambios respecto de la etapa 1:**
- La **soja** se reemplaza por **verdura de las quintas**, porque la investigación muestra que es lo representativo del borde del conurbano.
- La **yerba** pasa a ser **organización**.

### 3.2 Familias

- **Familias en lugar de vecinos sueltos.** Cada familia tiene nombre, integrantes que trabajan y un origen:
  - inmigración europea;
  - otra provincia;
  - país limítrofe.
- **El origen no cambia estadísticas.** Solo aporta historia, fichas y diálogos, para evitar estereotipos.
- **Ahorro propio.** Cada familia tiene su ahorro. En la interfaz se muestra el **total del barrio** para simplificar; el detalle aparece en la ficha de la familia.
- **Trabajos:**
  - **viajar a la ciudad**: más ahorro, pero depende del tren o del colectivo;
  - **quinta**;
  - **almacén o taller** del barrio;
  - **construir**, ya sea la casa propia o ayudando a otra familia.

### 3.3 Lotes y cuotas

- **La grilla de lotes actual se mantiene:** 18 lotes por manzana, y el lote de 3,6 unidades equivale a 10 varas (8,66 m).
- **El precio depende de la ubicación:**
  - distancia a la estación, al tranvía o al colectivo;
  - esquina, que vale más;
  - servicios disponibles.
- **Cómo se compra:** los lotes se compran en **remates** (eventos) o en la **inmobiliaria**, con seña y cuotas periódicas.
- **Si una familia no paga:**
  - **antes de 1950** puede **perder el lote**;
  - **desde 1950** (Ley 14.005), con el 25% pagado ya no lo pierde y puede **escriturar**.

### 3.4 Casas que crecen de a poco

**Etapas:** lote baldío → **acopio** de materiales → **casilla** → **casa a medio hacer** (primera habitación y baño) → **casa terminada** → **ampliación** (más habitaciones o planta alta).

- **Avance:** cada etapa cuesta materiales y tiempo de trabajo, y avanza cuando la familia tiene ahorro.
- **Préstamos entre vecinos:** los andamios y encofrados se prestan. Un vecino que ayuda acelera la obra y suma organización.
- **Capacidad:** la casa chorizo se amplía **de a una habitación**, y cada habitación suma lugar para una familia más o para inquilinos.
- **Animación:** ya existe la construcción por etapas (encofrado, basamento, hierros, andamios), así que se reutiliza.

### 3.5 Servicios por manzana

Cada manzana tiene cinco servicios: **luz, agua, transporte, pavimento y cloacas**.

- **Cómo se consiguen:** con **reclamos** desde la sociedad de fomento. Cuestan **organización** y un tiempo de gestión.
- **Límite del municipio:** hay un **cupo de obras por año**, que Villa Chimango también disputa.
- **Qué pasa sin servicios:**
  - sin **agua**, la manzana no puede tener más de cierta cantidad de familias;
  - sin **pavimento**, la **lluvia** corta el colectivo y frena las obras;
  - sin **cloacas**, sube el riesgo sanitario si el pozo de agua está cerca del pozo ciego.
- **Visualización:** una capa del mapa, que se activa con un botón, muestra los servicios de cada manzana con íconos.

### 3.6 Villa Chimango, el barrio vecino

- **Dónde está:** del otro lado de las vías, con su propia estación, loteo e instituciones. Lo maneja la computadora.
- **Compite por:**
  - **las familias** que llegan, que eligen el barrio con mejores condiciones (precio, transporte, servicios, instituciones);
  - **el cupo de obras** del municipio, que se lleva el barrio con más organización y reclamos;
  - **los partidos** en el potrero y el club, que dan prestigio y organización.
- **Qué no hace:** no ataca ni destruye. La competencia es por crecer mejor.
- **Colaboración:** en algunos eventos (inundación, cerco, erradicación) los dos barrios pueden colaborar, y eso da un bonus a ambos.
- **Dificultad:**
  - **Tranquila:** Chimango crece lento.
  - **Normal.**
  - **Competitiva:** Chimango reclama agresivamente y ofrece lotes más baratos.

### 3.7 Tiempo y calendario

- **Reloj:** el juego usa **años**. A velocidad normal, **un minuto de juego es un año**.
- **Velocidades:** **pausa, ×1, ×2 y ×4**, con botones en la barra superior y atajos de teclado. Al abrirse un evento, el juego se pausa solo.
- **Duración de cada capítulo:** entre 20 y 30 años, o sea entre 20 y 35 minutos a velocidad normal, y menos si se acelera.
- **Eventos históricos:** llegan en su año, por ejemplo la huelga en 1907 y el colectivo en 1928. Algunos tienen margen para no ser predecibles.

### 3.8 Archivo del barrio

- **Fichas coleccionables** que se desbloquean con los eventos. Cada una tiene:
  - una imagen: **foto de dominio público** (con archivo, fecha y licencia) o **ilustración propia** cuando no haya fotos libres, como en las tomas de 1981 o Ciudad Evita;
  - un dato breve;
  - la **fuente**;
  - una etiqueta que aclara qué es **histórico** y qué es **del juego**.
- **Al terminar el capítulo:** una pantalla compara tu barrio con **datos reales**, como el crecimiento censal o el porcentaje de propietarios.
- **Consulta:** el archivo se puede revisar en cualquier momento desde el menú.

## 4. Capítulo 1: El loteo (1905–1930)

Es el capítulo que se implementa primero, como **prueba de concepto**.

### Situación inicial
- **1905.** El Ferrocarril del Sud abrió una estación en campos de quintas.
- **El mapa:**
  - la estación y las vías al este;
  - quintas en el borde;
  - las manzanas ya **trazadas pero vacías** (la "grilla fantasma");
  - un almacén de campo;
  - Villa Chimango del otro lado de las vías.
- **Las familias:** empiezan **viviendo en conventillos de la ciudad**. Se ven en un panel "En la ciudad" y llegan en tren cuando consiguen lote.
- **Recursos:** algo de ahorro y pocos materiales.

### Qué hace el jugador

**1. El remate**
- **Cuándo:** es un evento inicial que se repite cada tantos años.
- **Cómo se ve:** aparece una carpa con banderines, y el rematador ofrece un bloque de lotes con precios según la distancia a la estación.
- **Decisión:** comprar lotes caros cerca de la estación o baratos lejos.
- **Folleto engañoso:** a veces la "estación a dos cuadras" está a seis.

**2. Mudar familias**
- **Cómo:** se asigna una familia del conventillo a un lote comprado. La familia paga seña y cuotas.
- **Qué pasa:** llega en tren y empieza con un **acopio** y una **casilla**.

**3. Ganar ahorro**
- **Dónde trabajan:** los integrantes van a trabajar a la ciudad en tren, a las quintas o al almacén.
- **Tranvía:** un tranvía a la estación (evento de mitad de capítulo) valoriza los lotes cercanos.

**4. Construir la casa de a poco**
- **Cómo crece:** casilla → primera habitación → casa chorizo de 2 y 3 habitaciones.
- **Ayuda entre vecinos:** los vecinos pueden ayudarse entre sí.

**5. Almacén de esquina**
- **Dónde:** se construye en un lote de esquina.
- **Libreta de fiado:** adelanta ahorro a las familias que no llegan con la cuota, a cambio de pagar después.

**6. Conventillo del barrio**
- **Qué es:** una opción de vivienda barata para familias que todavía no pueden comprar.
- **Consecuencia:** genera alquiler para el dueño, que es "otra familia" del barrio.

### Eventos del capítulo

| Año | Evento | Decisión o efecto |
|---|---|---|
| 1905 | **Remate con carpa** | Comprar lotes; transporte gratis desde la estación ese día |
| 1907 | **Huelga de inquilinos** | Las familias que siguen en conventillos piden apoyo. **Apoyar:** suben la organización y la llegada de familias, pero hay riesgo de desalojo para algunas. **No apoyar:** los alquileres suben y llegan menos familias |
| ~1910 | **Información privilegiada** | Un rematador ofrece comprar antes del anuncio de una nueva parada. **Aceptar:** lotes baratos que se valorizan. **Rechazar:** sin efecto |
| ~1915 | **Lluvias** | Las calles de tierra frenan las obras un tiempo |
| ~1918 | **Llega el tranvía** | Los lotes a 4 cuadras o menos se valorizan; suben los ingresos por trabajo en la ciudad |
| 1920s | **Remate de Villa Chimango** | Chimango ofrece lotes más baratos; la llegada de familias se divide |
| 1928 | **Aparece el colectivo** | Adelanto del capítulo 2; conecta los lotes lejanos con la estación |

### Objetivos del capítulo
1. **Veinte familias** con lote propio.
2. **Diez casas** con al menos dos habitaciones.
3. Un **almacén de esquina** funcionando.
4. Atravesar la **huelga de 1907**, con cualquiera de las dos decisiones.
5. **Opcional:** tener más familias que Villa Chimango en 1930.

### Fichas del archivo en este capítulo
- La grilla: de Garay al plano de 1904.
- El tren hace pueblos.
- El remate de lotes.
- El lote de 10 varas.
- El conventillo y la huelga de inquilinos de 1907.
- La casa chorizo.
- El almacén y la libreta de fiado.
- El tranvía y la venta en cuotas.

### Final del capítulo
- **Resumen:** cuántas familias llegaron, cuántas son propietarias, cómo se compara con Villa Chimango y cuántas fichas se desbloquearon.
- **Dato real:** entre 1895 y 1914 la aglomeración pasó de 62 a 287 km².

## 5. Capítulos siguientes (resumen)

### Capítulo 2: El barrio se organiza (1920–1945)
- **Sociedad de fomento:** se desbloquea al llegar a cierta población sin servicios y habilita los **reclamos** y la capa de servicios.
- **Festival a beneficio** y **socio que dona el lote**: formas de conseguir la sede.
- **Biblioteca popular** como módulo del club o de la sociedad de fomento.
- **Del potrero al club:** el club necesita un lote para la cancha. Hay partidos contra Villa Chimango.
- **Colectivo:** las líneas crecen, pero se cortan con lluvia en calles de tierra.
- **Competencia con Chimango** por el cupo municipal de pavimento y luz.
- **Objetivo principal:** luz y agua en la mayoría de las manzanas; club y biblioteca.

### Capítulo 3: El barrio obrero (1945–1976)
- **Fábricas en el borde:** llegan **familias de las provincias** en oleadas.
- **Ley 14.005 (1950):** lotes en cuotas protegidos; con el 25% pagado se escritura.
- **Créditos del Banco Hipotecario:** permiten construir más rápido, pero hay que pagarlos.
- **Chalet frente a casa chorizo:** nueva tipología compacta.
- **Barrio gremial:** un sindicato financia viviendas en una manzana.
- **Loteos económicos sin servicios:** más familias, más reclamos.
- **Objetivo principal:** mayoría de propietarios, pavimento y colectivo en todo el barrio.

### Capítulo 4: El conurbano (1976–hoy)
- **Decreto-ley 8912 (1977):** el loteo exige todos los servicios antes de vender y el lote mínimo crece. Los lotes se encarecen y dejan de llegar familias por la vía legal.
- **Erradicaciones:** llegan familias expulsadas de la Ciudad. Ver la sección 9.
- **La toma (1981):**
  - un grupo de familias organiza la ocupación de tierras vacantes con **trazado de loteo**;
  - hay un **cerco** que bloquea la entrada de materiales;
  - la organización vecinal, las parroquias y la solidaridad de Villa Chimango permiten resistir.
- **Autopista y barrio cerrado:** la autopista desbloquea un barrio cerrado en tierras bajas. Si se rellenan humedales, sube el riesgo de inundación para todos. El muro baja la cohesión con las manzanas vecinas.
- **Integración de barrios populares:** el certificado de vivienda protege de desalojos y habilita obras de servicios.
- **Objetivo principal:** que todas las manzanas, incluido el asentamiento, tengan servicios y seguridad en la tenencia.

## 6. Modo libre
- **Mapa y edad:** se elige la edad inicial y el tamaño del mapa, con o sin Villa Chimango.
- **Reglas:** las de la edad elegida, sin guion.
- **Eventos:** aleatorios de esa época.

## 7. Interfaz

Se mantiene el estilo actual, con el selector de paletas verde, azul y bordó. Se agrega:

- **Calendario:** año actual y capítulo, en el lugar del reloj actual.
- **Recursos:** materiales, verdura, ahorro y organización.
- **Panel "Familias":** reemplaza a "Vecinos". Muestra familias en la ciudad, en conventillo y con lote, con su estado de cuotas y de casa.
- **Capa de servicios:** íconos por manzana.
- **Panel de eventos:** carta con ilustración, texto breve, dos opciones y el enlace a la ficha del archivo.
- **Archivo del barrio:** grilla de fichas desbloqueadas.
- **Comparación con Villa Chimango:** familias, servicios y organización, en un indicador chico.

## 8. Cambios técnicos
- **Estado del juego:** agregar año, familias (con lote, cuotas, casa y trabajo), servicios por manzana, organización, eventos vistos y fichas desbloqueadas.
- **Guion de capítulos:** eventos, objetivos y reglas se definen como **datos** (por ejemplo, `src/campana/capitulo1.js`), para poder ajustar el balance sin tocar la lógica.
- **Villa Chimango:** una IA simple con guion de crecimiento y reacciones. Necesita su propio sector de mapa, del otro lado de las vías.
- **Guardado:** versión 4, con el capítulo y el año.
- **Pruebas:**
  - unitarias para cuotas, precios de lotes, servicios y reglas por edad;
  - recorrido en navegador para el capítulo 1.

## 9. Temas sensibles (público adolescente y adulto)
- **Con seriedad:** la dictadura, las erradicaciones, la represión de la huelga de 1907 y las tomas se muestran con **sobriedad y sin morbo**, con fuentes y sin frivolizar.
  - No se convierten en "bonus" ni en chistes.
  - Tampoco se muestra violencia explícita.
- **Aviso previo:** una nota breve antes del capítulo 4 anuncia que trata sobre la última dictadura y los desplazamientos forzados.
- **Actores colectivos:** familias, organizaciones y vecinas. Las víctimas no son decorado.
- **Lenguaje:** "barrio popular" para la época actual, y ninguna asociación entre villas y delito.
- **Orígenes:** el origen de las familias no tiene efecto en sus capacidades.
- **Villa Chimango:** es rival en el juego, pero también aliado en las crisis. No es "el barrio malo".

## 10. Plan de trabajo

1. **Base de sistemas:**
   - calendario;
   - recursos nuevos;
   - familias;
   - cuotas;
   - casas por etapas;
   - reemplazo de la soja por quintas.
2. **Capítulo 1 completo:**
   - estación;
   - remate;
   - eventos;
   - objetivos;
   - fichas;
   - pantalla final.
3. **Prueba de juego del capítulo 1:** ¿es divertido? ¿se entiende la historia? Ajustar el balance.
4. **Villa Chimango:** versión básica.
5. **Capítulos 2, 3 y 4**, en ese orden.
6. **Modo libre.**

## 11. Preguntas abiertas
- **Revisión histórica:** ¿quién revisa las fichas antes de publicarlas?
