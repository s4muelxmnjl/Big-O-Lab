# Big O Lab

Minijuego educativo en español para aprender complejidad cuadrática experimentando. React + TypeScript + Vite, Tailwind CSS y Lucide. Sin backend, cuentas ni claves API.

## Ejecutar

Requiere Node.js 22.12+ (validado con Node 24) y npm.

```sh
npm ci
npm run dev
```

En el entorno cloud, si la caché del usuario no es escribible: `npm ci --cache /workspace/.npm-cache`.

## La ruta

1. **Entender:** construye en un tablero las 16 comparaciones entre estudiantes, sin contar una pareja dos veces; aquí las parejas son dirigidas e incluyen comparar una tarjeta consigo misma.
2. **Experimentar:** cuadrícula de 1 a 20, iniciar/pausar, siguiente paso, reiniciar, velocidad ajustable, exploración de cualquier paso, índices, explicación del cambio de fila y pseudocódigo destacado.
3. **Predecir:** cinco retos de dificultad creciente: contar, duplicar la entrada, ajustar un recorrido, sumar tareas y comparar estrategias.
4. **Investigar:** siete fragmentos; acceso, ciclos simples, consecutivos, anidados, triangulares, un interno constante y otro de n/2 vueltas.
5. **Optimizar:** laboratorio con arreglos editables de 2 a 12 números, casos con y sin repetidos y trazas reales por pasos o reproducción; después compara crecimiento y memoria y resuelve cinco preguntas de transferencia.

En varios retos debes escribir tu cálculo, en lugar de elegir entre opciones. Los ejercicios combinan tareas y distinguen límites constantes de límites que crecen con la entrada. Hay 19 retos en total.

Después de cada acierto se explica lo resuelto en tres pasos, con una idea clave y una conexión al siguiente reto. Las explicaciones se pueden repasar al volver a un ejercicio resuelto. La última respuesta conserva su explicación hasta que eliges ver la victoria.

Cada respuesta correcta otorga 100 XP una sola vez. Los retos se desbloquean en orden y una barra muestra cuántos has resuelto. Completar un nivel desbloquea el siguiente y entrega una insignia. Puedes repetir niveles, consultar pistas y reiniciar el progreso. Se guarda localmente con un formato versionado; si el almacenamiento no está disponible, se informa y la sesión sigue funcionando.

## Validación

```sh
npm run build    # TypeScript y producción
npm test         # Modelo, evaluación, XP, desbloqueos, persistencia
npm run test:e2e # Navegador: ruta completa, controles, móvil, teclado
```

Playwright usa Chromium del sistema en `/usr/bin/chromium` cuando existe; de lo contrario ejecuta `npx playwright install chromium` para instalar su navegador. Las pruebas inician Vite automáticamente.

## Organización

- `src/domain/`: contenido y funciones puras del modelo.
- `src/hooks/`: ciclo de vida del simulador y almacenamiento del progreso.
- `src/components/`: lección, desafíos, simulador y misión final.
- `src/App.tsx`: navegación, desbloqueos y victoria.
- `tests/`: pruebas de recorrido en Chromium.

## Modelo educativo

Una celda corresponde a una operación representativa: n² en la cuadrícula completa. Las parejas distintas son n(n−1)/2. En la comparación sin duplicados, Set realiza n consultas y n inserciones, con costo promedio constante supuesto por operación y espacio extra O(n). Son modelos teóricos distintos, no tiempos medidos. Big O describe una cota de crecimiento, no segundos exactos. La velocidad de reproducción solo facilita observar el algoritmo.

Los datos permanecen en el navegador. Borrar su almacenamiento o reiniciar el progreso elimina los logros. No hay sincronización entre dispositivos.

## GitHub Pages

El workflow `.github/workflows/pages.yml` valida la aplicación y publica `dist` al subir cambios a `main`. Vite usa rutas relativas, compatibles con `/Big-O-Lab/`.

Si el repositorio aún no tiene Pages habilitado y GitHub rechaza la activación automática con el token de Actions, selecciona **GitHub Actions** en **Settings → Pages → Build and deployment → Source** y vuelve a ejecutar el workflow. No se requiere ninguna clave API en la aplicación.
