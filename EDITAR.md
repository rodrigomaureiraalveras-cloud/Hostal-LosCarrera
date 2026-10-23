# Cómo cambiar este sitio

Este documento es para vos, aunque nunca hayas abierto un editor de código. La idea es simple: casi todo lo que vas a querer cambiar está en **un solo archivo**, y lo podés cambiar pidiéndoselo a una inteligencia artificial (Claude, ChatGPT, la que uses) con frases que ya te dejamos listas más abajo.

## Antes que nada: cómo verlo corriendo

Para ver el sitio en tu computadora antes de publicarlo:

1. Instalá **Node.js** (el programa que hace funcionar el sitio) desde <https://nodejs.org> — elegí la versión que dice "LTS", que es la estable.
2. Abrí la **terminal** (la ventana negra donde se escriben órdenes: en Mac se llama "Terminal", en Windows "PowerShell") dentro de la carpeta `hostal-los-carrera`.
3. Escribí esto y apretá Enter. Descarga las piezas que el sitio necesita; se hace **una sola vez**:

   ```
   npm install
   ```

4. Escribí esto y apretá Enter. Enciende el sitio en tu computadora:

   ```
   npm run dev
   ```

5. Abrí el navegador en <http://localhost:3000>. Cada vez que guardes un cambio, la página se actualiza sola.

Para apagarlo, volvé a la terminal y apretá `Ctrl` + `C`.

## Los dos únicos archivos que tenés que tocar

| Archivo | Qué hay adentro |
| --- | --- |
| `src/lib/content.ts` | **Todo el contenido**: los textos, las imágenes (sus direcciones de internet), los fondos de cada sección, las tarifas, los servicios y la ubicación. |
| `src/app/globals.css` | **Los colores y las tipografías** (las letras). Están arriba de todo, en un bloque que empieza con `@theme`. |

Hay un tercero, más chico: `src/sections.ts`, donde se prenden, se apagan y se ordenan las secciones de la página.

Los demás archivos (los de la carpeta `src/components`) son la "maquinaria": no hace falta abrirlos para cambiar contenido.

## Las 3 cosas que vas a querer cambiar

**1. Un fondo.** Los fondos están en `content.ts`, en el bloque que se llama `BACKGROUNDS` (fondos, en inglés). Cada fondo es una lista de "capas" (como hojas transparentes apiladas): un color, una foto, velos oscuros encima para que el texto se lea, y grano. Por ejemplo, para cambiar la foto de fondo del hero (la primera pantalla, la grande), cambiá la dirección de la línea `src:` dentro de `hero:`:

```ts
src: "https://tu-sitio.com/fachada-hostal.jpg",
```

**2. Un texto.** Buscá el texto en `content.ts` y cambialo **entre las comillas**, sin borrar las comillas. Por ejemplo, el párrafo del hero está en la línea que empieza con `body:`:

```ts
body: "Acá va tu texto nuevo.",
```

**3. Un color.** Los colores están en `globals.css`, arriba de todo. Cada color es una línea con un nombre y un código (un código de color es algo como `#f2b705`, empieza con numeral y tiene seis letras o números). Por ejemplo, para cambiar el celeste de la marca (botones, acentos y el anillo del título). Ojo: la línea se sigue llamando `--color-gold` (quedó así del diseño original); cambiá solo el código:

```css
--color-gold: #3fb4e6;
```

## Antes de publicar: datos que tenés que completar

- **⚠ El teléfono** (`CONTACT`). Ahora dice **+56 9 0000 0000**, que es un número de ejemplo. Poné el real de la hostal en sus tres líneas (cómo se ve, el número para llamar y el de WhatsApp). Aparece en el menú de arriba, en el menú del celular, en la sección final (con botones "Llamar" y "WhatsApp") y en el pie de página.
- **El correo de contacto** (`email:` dentro de `NAV`). Ahora dice `contacto@hostalloscarrera.cl` como ejemplo.
- **Las redes sociales** (`SOCIALS`). Ahora apuntan a las portadas de Facebook e Instagram, no a tus perfiles.
- **El mapa** (`FOOTER_LINKS`, enlace "Ver en el mapa"). Ahora busca "Hostal Los Carrera Copiapó" en Google Maps; pegá el enlace exacto de la hostal.
- **Las tarifas** (`PLANS`). Ahora dicen "A consultar" para estadías por noche, por semana y por mes. Revisá que esas sean las estadías que ofrecen y, si querés mostrar precios, cambiá `null` por un número en `monthly`.
- **Las fotos.** Las imágenes del sitio son **ilustraciones** (dibujos) de referencia, no fotos de la hostal. Reemplazalas por fotos reales con el comando 8.
- **El formulario de reserva** de la sección final muestra un mensaje de "Listo", pero todavía no envía el correo a ningún lado: para recibir las consultas hay que conectarlo a un servicio de formularios (pedíselo a la inteligencia artificial: "Conectá el formulario de `Join.tsx` a `<servicio>`").

## Comandos listos para copiar y pegar

Copiá una de estas frases, cambiá lo que está entre `< >` y pegásela a la inteligencia artificial que uses:

1. "Cambiá el fondo del hero por esta foto de la fachada: `<dirección de la imagen>`"
2. "Cambiá el celeste de la marca (`--color-gold`) a `<color>`"
3. "Sacá la sección de `<nombre de la sección, por ejemplo Tarifas>`"
4. "Poné la sección de `<nombre>` antes de la de `<otra>`"
5. "Cambiá el texto del párrafo del hero por: `<tu texto>`"
6. "Poné precios a las tarifas: por noche `<número>`, por semana `<número>` y por mes `<número>` pesos"
7. "Cambiá el teléfono de contacto por `<número>`, el correo por `<correo>` y los enlaces de Facebook e Instagram por estos: `<direcciones>`"
8. "Reemplazá la imagen `<nombre, por ejemplo room>` de `MEDIA.photos` por esta foto: `<dirección>`" (si la foto está en tu computadora, copiala a `public/brand/photos/` y usá `asset("/brand/photos/<archivo>")`)
9. "Agregá un servicio nuevo en la sección Servicios: título `<título>`, área `<Habitación, Espacios comunes o Ubicación>`, etiqueta `<etiqueta>`, texto `<texto>` y la imagen `<nombre de MEDIA.photos>`"
10. "Cambiá los textos de la pantalla del teléfono del hero (`HERO.phone`) por: `<los cuatro botones y el aviso>`"

Si la inteligencia artificial te pregunta dónde está algo, pegale esta frase:

**"Todo el contenido está en `src/lib/content.ts`. Los colores y las tipografías, en `src/app/globals.css`. Las secciones, en `src/sections.ts`. No edites los componentes para cambiar contenido."**

## Lo que NO es fácil en este sitio

Hay tres cosas que no se cambian con una sola frase. No es un error: están hechas así a propósito para que el diseño se vea como se ve. Acá te contamos qué son y qué podés hacer.

### 1. El título grande del hero ("H O / STAL") y el anillo que rodea al teléfono

**Qué es.** No es un texto común. Son piezas colocadas a mano: "H" en blanco, un anillo celeste que hace de "O" y "STAL" en celeste. Juntas se leen "HOSTAL". El anillo es largo a propósito: el teléfono queda **adentro** de la "O". El trazo de arriba del anillo pasa por detrás del teléfono y el de abajo, por delante (es una segunda copia del anillo, recortada a su mitad de abajo).

**Por qué está hecho así.** Es la única forma de que el anillo "abrace" al teléfono. Cada pieza tiene su posición medida sobre el diseño.

**Si querés otra palabra**, cambiar los textos de `brandParts` en `content.ts` **no alcanza**: el anillo quedaría separado de las letras o encima de ellas. Pegale esto a la inteligencia artificial:

> "Reemplazá el título partido del hero por un solo título que lea `HERO.brand`, y borrá el anillo celeste, su sombra y su mitad delantera."

**Lo que cuesta.** Perdés el anillo que rodea al teléfono. El resto del sitio queda igual.

### 2. El teléfono del hero es un dibujo, no una foto

**Qué es.** El teléfono con la pantalla de reservas está dibujado con código (el archivo `PhoneMockup.tsx`). Sus textos ("Habitaciones", "Reserva solicitada"…) sí se cambian fácil, desde `HERO.phone` en `content.ts`.

**Por qué está hecho así.** Así se ve nítido en cualquier pantalla y el aviso celeste "Reserva solicitada" puede aparecer con animación.

**Si querés poner una imagen en vez del dibujo**, no alcanza con cambiar una dirección. Pegá esto:

> "En el hero, reemplazá el `PhoneMockup` por una imagen nueva de `MEDIA` llamada `heroPhone`, del mismo tamaño (29 × 60 em) y en la misma posición, y dejá el anillo pasando por delante."

**Lo que cuesta.** La captura tiene que tener la proporción de un teléfono (más o menos 1 de ancho por 2 de alto) y fondo transparente alrededor; si no, se va a ver un rectángulo.

### 3. El hero está ubicado con coordenadas del diseño

**Qué es.** Cada cosa del hero (los textos, el teléfono, las tarjetas, los botones) tiene una posición exacta, medida sobre un lienzo de 1440 × 810 píxeles para computadora y 440 × 956 para celular.

**Por qué está hecho así.** Así el hero se ve igual en cualquier pantalla: todo crece o se achica junto, sin desarmarse.

**Lo que podés cambiar libremente:** **qué** se muestra — las imágenes y los textos, desde `content.ts`.

**Lo que no:** **dónde** está cada cosa. Mover algo implica recalcular sus números. Si lo necesitás, pedí algo concreto, por ejemplo:

> "En `HeroDesktop.tsx`, subí el teléfono 30 píxeles del diseño, sin tocar nada más."

**Lo que cuesta.** Si un texto nuevo es mucho más largo que el original (por ejemplo, el párrafo del hero), puede quedar encimado con otra cosa. Probalo siempre en computadora **y** en celular.

### Un aviso sobre las imágenes

Las imágenes del sitio (la fachada, la habitación, el baño, el comedor…) son **ilustraciones** hechas con el programa `scripts/ilustraciones.py`, no fotos de la hostal. Sirven para que el sitio se vea completo mientras tanto. Apenas tengas fotos reales, reemplazalas con el comando 8 (usá fotos de al menos 1600 píxeles de ancho). El dibujo del casino es genérico: no usa el logo del Casino Antay.

## Si algo se rompe

1. **Deshacé el último cambio**: en el editor, `Ctrl` + `Z` (en Mac, `Cmd` + `Z`), y guardá.
2. **Revisá comas y comillas.** El 90 % de los errores es una comilla `"` que falta o una coma `,` que se borró al final de una línea en `content.ts`. Cada texto va entre comillas y cada línea de una lista termina con coma.
3. **Leé la terminal** (la ventana donde escribiste `npm run dev`). Si hay un error, aparece ahí en rojo, con el nombre del archivo y el número de línea.
4. **Copiá ese error completo y pegáselo a la inteligencia artificial**, con esta frase: "Me aparece este error después de cambiar `content.ts`, arreglalo sin tocar los componentes: `<el error>`".
