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

1. **Entender:** analogía de estudiantes, entrada n y crecimiento asintótico.
2. **Experimentar:** cuadrícula de 1 a 20, iniciar/pausar, siguiente paso, reiniciar, índices y pseudocódigo destacado.
3. **Predecir:** cinco tamaños, desde 5 hasta 100 datos.
4. **Investigar:** seis fragmentos; acceso, ciclos simples, consecutivos, anidados, triangulares y un interno constante.
5. **Optimizar:** detección de repetidos por parejas frente a Set; cuentas, memoria y cinco preguntas de transferencia.

Cada respuesta correcta otorga 100 XP una sola vez. Completar un nivel desbloquea el siguiente y entrega una insignia. Puedes repetir niveles, consultar pistas y reiniciar el progreso. Se guarda localmente con un formato versionado; si el almacenamiento no está disponible, se informa y la sesión sigue funcionando.

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
