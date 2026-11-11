# Big O Lab checkpoint

Objetivo: minijuego completo en español basado en el prompt maestro.

Implementado: cinco niveles, 18 preguntas, simulador n² (1–20), controles y pseudocódigo, comparativa parejas/Set, XP idempotente, desbloqueos, insignias, victoria, persistencia versionada, reinicio confirmado, teclado y movimiento reducido, interfaz adaptable.

Archivos clave: `src/domain/{challenges,model}.ts`, `src/hooks/`, `src/components/`, `src/App.tsx`, `src/styles.css`.

Validación ejecutada: `npm run build` correcto; `npm test` 6/6; `npm run test:e2e` 3/3 en Chromium (recorrido completo, controles, recarga, no duplicación de XP, reinicio, móvil y teclado). Capturas locales en `/tmp/big-o-lab-{desktop,mobile}.png`.

Entrega: workflow `.github/workflows/pages.yml` para validar y desplegar `main`; Vite usa base relativa para alojar el proyecto bajo una subruta.

Pendiente de verificar: despliegue remoto de GitHub Pages. El proxy rechaza conexiones a `api.github.com` con HTTP 403; no es evidencia de token inválido. Si Pages no estaba habilitado y el token de Actions no puede activarlo, seleccionar GitHub Actions como fuente en Settings → Pages del repositorio.

Próxima tarea exacta: comprobar la primera ejecución del workflow Pages y la página publicada. Para desarrollo usar el checkout existente `/workspace/Big-O-Lab`; no crear worktrees sin petición explícita. `npm ci --cache /workspace/.npm-cache` si la caché del usuario no es escribible, luego `npm run dev`.
