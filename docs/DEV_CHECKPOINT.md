# Big O Lab checkpoint

Objetivo: minijuego completo en español basado en el prompt maestro.

Implementado: cinco niveles, 18 preguntas, simulador n² (1–20), controles y pseudocódigo, comparativa parejas/Set, XP idempotente, desbloqueos, insignias, victoria, persistencia versionada, reinicio confirmado, teclado y movimiento reducido, interfaz adaptable.

Archivos clave: `src/domain/{challenges,model}.ts`, `src/hooks/`, `src/components/`, `src/App.tsx`, `src/styles.css`.

Validación ejecutada: `npm run build` correcto; `npm test` 6/6; `npm run test:e2e` 3/3 en Chromium (recorrido completo, controles, recarga, no duplicación de XP, reinicio, móvil y teclado). Capturas locales en `/tmp/big-o-lab-{desktop,mobile}.png`.

Entrega: workflow `.github/workflows/pages.yml` para validar y desplegar `main`; Vite usa base relativa para alojar el proyecto bajo una subruta.

Despliegue remoto: la primera ejecución de Actions pasó instalación, pruebas y build, pero falló en Configurar Pages: `Create Pages site failed. Resource not accessible by integration`. El token de Actions no puede activar inicialmente Pages. Se necesita seleccionar GitHub Actions como fuente en Settings → Pages y volver a ejecutar el workflow. La API directa también está bloqueada por la red del entorno (HTTP 403 a api.github.com).

Próxima tarea exacta: comprobar la primera ejecución del workflow Pages y la página publicada. Para desarrollo usar el checkout existente `/workspace/Big-O-Lab`; no crear worktrees sin petición explícita. `npm ci --cache /workspace/.npm-cache` si la caché del usuario no es escribible, luego `npm run dev`.

## Actualización: explicaciones y dificultad progresiva

- Los 18 retos muestran al resolverlos un concepto, tres pasos, una idea clave y una conexión al siguiente ejercicio (`src/domain/learning.ts`, `LearningRecap.tsx`). Se conservan al volver a un reto resuelto o recargar.
- Predecir ahora escala desde contar y duplicar hasta recorridos rectangulares, tareas consecutivas y comparación de estrategias. La evaluación final exige justificar trabajo y memoria con un presupuesto concreto.
- La barra de retos muestra el avance dentro del nivel. `challengeUnlocked` exige todos los retos anteriores; completar el nivel abre el siguiente. Se mantienen los identificadores y el progreso previo, sin XP repetidos.
- La última respuesta ya no se oculta automáticamente: primero se puede leer su explicación, después pulsar «Ver mi victoria».
- Validación: build correcto, 7 pruebas de lógica y 3 de Chromium aprobadas; el recorrido verifica las 18 explicaciones, bloqueo/desbloqueo de cada reto, barra de avance, recarga, XP y revisión antes de la victoria. Móvil y teclado incluidos.
