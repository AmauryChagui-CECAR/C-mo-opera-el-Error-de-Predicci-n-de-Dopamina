# Ejercicio Neurocognitivo Integrado 1: Taller Vivencial del Error de Predicción de Dopamina (EPD)

Aplicación web educativa interactiva dirigida a estudiantes universitarios de modalidad virtual, enmarcada en el módulo **“Del Cerebro al Aula”: un aprendizaje multidimensional** (Tutor: Mg. Amaury Chagui Hernández).

## Características principales

- **Navegación por tramos con persistencia local (`localStorage`)**: Inicio, Objetivos, Fundamentos y Simulador EPD, Taller Vivencial de Dos Rondas, Aplicación y Deontología, y Cierre de Aprendizajes.
- **Simulador interactivo EPD y Canal de Flujo**: Visualización dinámica de la fórmula $\delta = R_{\text{real}} - R_{\text{esperada}}$, relación Reto vs. Habilidad, carga de pantallas e higiene del sueño.
- **Taller vivencial de dos rondas con temporizador**: Experimento práctico de pensamiento lateral frente a atajos por economía cognitiva bajo presión temporal, con registro metacognitivo.
- **Actividades interactivas de aplicación**: Emparejamiento conceptual, escenarios de decisión universitaria y verificación de juicio situacional con retroalimentación inmediata.
- **Sitio web 100% estático**: Sin dependencia de servidor ni backend; configurado con rutas relativas (`base: './'`) y navegación por anclas (`#`) compatible con GitHub Pages.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilación y publicación en GitHub Pages

1. Sube este repositorio a GitHub (rama `main`).
2. En **Settings → Pages**, selecciona **GitHub Actions** como fuente de despliegue.
3. El flujo `.github/workflows/deploy.yml` ejecutará `npm run build` y publicará la carpeta `dist/` automáticamente.

Para compilar manualmente en local:

```bash
npm run build
```
