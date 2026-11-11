# Big O Lab checkpoint

Objetivo: juego práctico en español para principiantes, con retos cada vez más exigentes y explicaciones al resolverlos.

## Implementado

- Cinco niveles, 19 retos, desbloqueos en orden, 100 XP una vez por reto, insignias y victoria. Se conservan los identificadores y el progreso anterior.
- Primer reto: construir los 16 encuentros entre cuatro estudiantes en un tablero interactivo. Una casilla solo cuenta una vez.
- Predicciones y algunas evaluaciones: escribir cálculos propios y comprobarlos. Incluye n² + 2n y distinguir un interno fijo de otro con n/2 vueltas.
- Simulador n² (n de 1 a 20), iniciar/pausar/paso/reiniciar, velocidad ajustable, explorar cualquier paso y explicación contextual de índices y cambios de fila.
- Misión final: arreglos editables de 2 a 12 enteros, escenarios de repetidos al principio/final, trazas reales por parejas y Set, resaltar posiciones, mostrar memoria, salida temprana, ejecutar/pausar/paso/reiniciar. Las cuentas son representativas, no tiempos reales.
- Los 19 retos conservan su recapitulación de tres pasos, idea clave y conexión al siguiente ejercicio. La última explicación permanece antes de ver la victoria.
- Interfaz adaptable, teclado, movimiento reducido, progreso local versionado y manejo de almacenamiento corrupto o no disponible.

## Archivos clave

`src/domain/{challenges,learning,model,traces}.ts`; `src/components/{PracticalAnswer,DuplicateLab,Simulator,ChallengeCard,LearningRecap}.tsx`; `src/hooks/`; `src/App.tsx`; `src/styles.css`.

## Validación ejecutada

`npm run build`: correcto. `npm test`: 10/10. `npm run test:e2e`: 4/4 en Chromium: recorrido completo y XP, bloqueo/desbloqueo, 19 explicaciones, cálculos incorrectos, tablero sin doble conteo, exploración de pasos, recarga, teclado/móvil y laboratorio real (validación de datos, memoria, conteos, salida temprana, reproducción y cancelación al reiniciar). Capturas en `/tmp/big-o-lab-{mobile,desktop,practical}.png`.

## Entrega y continuación

Subir directamente a `main`, sin PR, según instrucción del usuario. `.github/workflows/pages.yml` valida y publica Pages. Se verificó que la ejecución del commit anterior `9d7db2c` terminó con éxito; el bloqueo inicial de activación de Pages ya está resuelto. La API de GitHub puede seguir bloqueada por la red, pero el HTML público de Actions permite comprobar las ejecuciones.

Usar el checkout existente `/workspace/Big-O-Lab`, sin worktrees salvo petición explícita. `npm ci --cache /workspace/.npm-cache` si la caché del usuario no es escribible; `npm run dev`. No hay backend, secretos ni APIs externas.

Próxima tarea exacta: comprobar la ejecución de Pages tras subir este cambio; después iterar a partir de pruebas de jugadores, sin añadir nuevas dependencias por decoración.
