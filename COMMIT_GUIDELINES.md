# Guía de Mensajes de Commit en Español

## Formato Requerido

```
tipo: descripción breve

Descripción detallada opcional
```

## Tipos de Commit Válidos

-   **feat**: Nueva funcionalidad
-   **fix**: Corrección de errores
-   **docs**: Cambios en documentación
-   **style**: Cambios de formato (sin lógica)
-   **refactor**: Refactorización de código
-   **test**: Agregar o modificar pruebas
-   **chore**: Tareas de mantenimiento

## Reglas

1. ✅ Usar español para todos los mensajes
2. ✅ Primera línea máximo 50 caracteres
3. ✅ Usar presente del indicativo ("agrega" no "agregado")
4. ✅ Separar título de cuerpo con línea en blanco
5. ✅ Explicar el "qué" y "por qué", no el "cómo"

## Ejemplos Correctos

```
feat: Agregar manejo de errores Oracle con reconexión

- Se implementó contador de errores de conexión
- Los mensajes incluyen timestamp para mejor seguimiento
- Se agregó sistema de reconexión automática
```

```
fix: Corregir error de conexión en getProcesos

Resuelve el problema donde getConnection() retornaba undefined
cuando el pool de Oracle no estaba inicializado correctamente.
```

## Ejemplos Incorrectos

❌ `fix: Fixed Oracle connection`  
✅ `fix: Corregir conexión Oracle`

❌ `added new feature for database reconnection`  
✅ `feat: Agregar reconexión automática de base de datos`
