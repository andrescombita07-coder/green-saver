# 🌱 GREEN SAVER

Aplicación móvil desarrollada con **Expo + React Native** orientada al cálculo, análisis y visualización de sistemas de energía solar residencial, con un enfoque social y ambiental que promueve el uso de energías renovables.

---

## 📌 Descripción del proyecto

**GREEN SAVER** es una aplicación móvil que permite a los usuarios estimar la viabilidad de instalar un sistema de energía solar en su hogar a partir del consumo energético mensual.  
La aplicación busca generar conciencia ambiental, facilitar la toma de decisiones energéticas y apoyar la transición hacia energías limpias.

El proyecto fue desarrollado como parte de un proceso académico, integrando conceptos de **arquitectura frontend**, **experiencia de usuario (UX)**, **control de accesos**, **diseño visual** y **versionado de código con GitHub**.

---

## 🎯 Propósito social y ambiental

- Fomentar el uso de energías renovables.
- Reducir el impacto ambiental del consumo energético tradicional.
- Facilitar el acceso a información técnica de forma clara y comprensible.
- Apoyar la toma de decisiones responsables en hogares y comunidades.

---

## 🧩 Funcionalidades principales

La aplicación implementa, entre otras, las siguientes funcionalidades:

- Inicio de sesión y registro de usuarios.
- Control de acceso por roles (usuario / administrador).
- Registro de consumo energético.
- Cálculo estimado de sistema solar (paneles, ahorro, viabilidad).
- Visualización de resultados y recomendaciones.
- Historial de cálculos realizados.
- Información educativa sobre energía solar.
- Panel administrativo con gestión y estadísticas.
- Navegación mediante menú inferior (Tabs).

---

## 👥 Roles del sistema

### 👤 Usuario
- Accede al dashboard principal.
- Registra consumo energético.
- Consulta cálculos y resultados.
- Visualiza información educativa.
- Gestiona su perfil.

### 🔐 Administrador
- Accede a un panel administrativo independiente.
- Gestiona usuarios del sistema.
- Visualiza estadísticas generales del uso de la aplicación.

---

## 🎨 Diseño y experiencia de usuario (UX)

La aplicación utiliza una **paleta de colores institucional** alineada con la temática ambiental:

- **Verde institucional (#00A859)**: sostenibilidad, energía limpia.
- **Rojo (#ED3237)**: alertas y estados críticos.
- **Colores semánticos** para estados (success, warning, error, info).
- Fondos claros y superficies limpias para reducir la fatiga visual.

La navegación del usuario se implementa mediante un **menú inferior (Bottom Tabs)**, siguiendo principios de usabilidad móvil y buenas prácticas de diseño.

---

## 🧭 Navegación y estructura

La navegación se gestiona con **Expo Router**, utilizando el sistema de rutas basado en archivos:

app/
├── (auth)/        → Autenticación
├── (user)/(tabs)/ → Usuario con menú inferior
├── (admin)/       → Administrador
Este enfoque permite una organización clara del proyecto y un control efectivo de accesos.

---

## ⚙️ Tecnologías utilizadas

- **Expo**
- **React Native**
- **Expo Router**
- **JavaScript**
- **Git & GitHub**
- **Material Design (principios de interfaz móvil)**

---

## 📂 Estructura del proyecto
green-saver/
├── app/
│   ├── (auth)/
│   ├── (user)/(tabs)/
│   └── (admin)/
├── src/
│   └── theme/
│       └── colors.js
├── assets/
├── components/
├── package.json
└── README.md

---

## 🔄 Control de versiones

El proyecto se encuentra versionado en **GitHub**, lo que permite:

- Control de cambios mediante commits.
- Respaldo del código fuente.
- Trabajo colaborativo entre integrantes.
- Evidencia del desarrollo progresivo del proyecto.

