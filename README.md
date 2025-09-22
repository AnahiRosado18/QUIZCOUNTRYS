# 🌎✨ Country Quiz  

Un proyecto interactivo de preguntas y respuestas sobre países 🌍, desarrollado como parte del **Reto [Country Quiz de DevChallenges](https://devchallenges.io/)**.  
La aplicación está construida con **React + Vite**, consume la API de **REST Countries** y ofrece una experiencia moderna, rápida y responsiva.  

🔗 **Demo en vivo:** [quizcountrys.vercel.app](https://quizcountrys.vercel.app/)  

---

## 🖼️ Vista previa  

| Pantalla del Quiz | Pantalla de Resultados |
|-------------------|-------------------------|
| ![Quiz Screenshot](./src/assets/screenshot-quiz.png) | ![Result Screenshot](./src/assets/screenshot-result.png) |

---

## 🎯 Objetivo del reto  

El reto consistía en crear una aplicación web que:  

- 🎨 **Respetara el diseño dado** (responsive y visualmente atractivo).  
- 🌍 **Generara 10 preguntas** aleatorias sobre países.  
- 🏳️ Mostrara **banderas, capitales o regiones** como parte de las preguntas.  
- ✅ Diera **retroalimentación inmediata** (✔️ correcto, ❌ incorrecto).  
- 🔢 Permitiera **navegar entre preguntas** con botones circulares.  
- 🏆 Mostrara una **pantalla final de resultados**, con opción de volver a jugar.  

---

## ⚙️ Funcionalidades principales  

- 🔄 **Generación dinámica de preguntas** con la API de [REST Countries](https://restcountries.com/).  
- ✨ **Diseño responsivo** para escritorio y móvil.  
- 🎭 Retroalimentación visual: degradado en las opciones seleccionadas y ✔️❌ como feedback.  
- 📊 Indicador de progreso y puntaje en tiempo real.  
- 🖼️ Manejo de assets (iconos, imágenes y banderas).  
- 🎮 Opción de **"Play Again"** para reiniciar el quiz.  

---

## 🛠️ Tecnologías utilizadas  

- ⚡ **React + Vite** → Frontend rápido y moderno.  
- 🌐 **Axios** → Para consumir la API de países.  
- 🎨 **CSS con variables y media queries** → Estilos personalizados y responsivos.  
- 🖼️ **Google Fonts** (Be Vietnam Pro) → Tipografía principal.  
- 🚀 **Vercel** → Hosting y despliegue continuo.  

---

## 📂 Estructura del proyecto  

```bash
src/
 ├── assets/           # Imágenes, íconos, fondos
 ├── components/       # Componentes (Pregunta, Quiz, Felicitaciones, etc.)
 ├── App.jsx           # Lógica principal
 ├── main.jsx          # Renderizado inicial
 └── index.css         # Estilos globales
