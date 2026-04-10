# Guía de Captura de Pantallas - 16 Funciones APA 7

## ℹ️ INFORMACIÓN IMPORTANTE

- **URL del App**: http://localhost:8085
- **Navegador Recomendado**: Chrome o Edge (las DevTools pueden ocultarse)
- **Resolución**: 1280x720 mínimo para ver bien el layout
- **Herramienta de Screenshot Windows**: `Win + Shift + S` (recorte de pantalla) o `PrtScn`
- **Carpeta Destino**: Crear `Evidencias_Visuales/` en el proyecto para organizar todas las capturas

---

## 🎯 ORDEN DE CAPTURA Y DATOS A USAR

**Credenciales Consistentes Para Las Capturas:**
```
🔐 USUARIO REGULAR:
- Email: juan.perez@example.com
- Contraseña: Password123
- Nombre: Juan Pérez
- Teléfono: +34 912 345 678

🔐 ADMIN:
- Email: admin@greensaver.com
- Contraseña: admin
```

**Importante**: Registra primero el usuario regular antes de capturar la función 2 (Registro). Después haz login y completa el flujo.

---

## 📋 LAS 16 FUNCIONES A CAPTURAR

### **1. INICIO DE SESIÓN** *(F1_Login.png)*
**Archivo**: `app/(auth)/login.jsx`
**Pasos**:
1. Si el app abre en Home, haz logout desde Profile > (menú de usuario)
2. Espera que redirija al Login
3. Captura la pantalla completa del formulario de login
4. **Datos a llenar**: 
   - Email: `juan.perez@example.com`
   - Contraseña: `Password123`
5. Captura también el estado del botón "Iniciar Sesión" cuando esté activo
6. **Opcional secundario**: Captura el botón de "mostrar/ocultar contraseña" en estado toggled

---

### **2. REGISTRO DE NUEVO USUARIO** *(F2_Register.png)*
**Archivo**: `app/(auth)/register.jsx`
**Pasos**:
1. Desde la pantalla de Login, toca "¿No tienes cuenta? Regístrate"
2. Captura la pantalla completa del formulario vacío
3. Llena los campos con:
   - **Nombre**: `Carlos Mendez`
   - **Teléfono**: `+34 987 654 321`
   - **Email**: `carlos.mendez@example.com`
   - **Contraseña**: `SecurePass456`
   - **Confirm Password**: `SecurePass456`
4. Captura la pantalla CON los campos llenos
5. Luego toca "Registrarse"
6. Captura la lógica de auto-login (debería redirigir automáticamente al Home del usuario)

---

### **3. RECUPERACIÓN DE CONTRASEÑA** *(F3_RecoverPassword.png)*
**Archivo**: `app/(auth)/recover-password.jsx`
**Pasos**:
1. Desde Login, toca el enlace "Recuperar contraseña"
2. Captura el formulario de recuperación vacío
3. Llena el email: `juan.perez@example.com`
4. Captura la pantalla con el email lleno
5. Toca el botón "Recuperar" (observa si hay confirmación o redirección)
6. Captura la pantalla de confirmación/éxito

---

### **4. CIERRE DE SESIÓN** *(F4_Logout.png)*
**Archivo**: `app/(user)/(tabs)/profile.jsx` (logout action)
**Pasos**:
1. Haz login con el usuario regular (juan.perez@example.com)
2. Navega a la pestaña "Perfil" (última pestaña inferior)
3. Busca el botón o menú de "Cerrar Sesión"
4. Captura la pantalla con el botón visible
5. Toca el botón y captura la confirmación (alert dialog si la hay)
6. Captura la pantalla final al regresar a Login (confirmación de logout exitoso)

---

### **5. VISUALIZACIÓN DEL PANEL PRINCIPAL (HOME USUARIO)** *(F5_Home_User.png)*
**Archivo**: `app/(user)/(tabs)/index.jsx`
**Pasos**:
1. Haz login con: `juan.perez@example.com` / `Password123`
2. Automáticamente llegarás al Home del usuario
3. Captura la pantalla completa mostrando:
   - Logo "GREEN SAVER" centrado
   - Tarjetas motivacionales ("Tu primer paso", "Meta solar")
   - Botón "Calcular ahora" destacado
4. Scrollea hacia abajo y captura el resto de elementos (si los hay)

**Nota**: Este es el primer punto de entrada para usuarios registrados.

---

### **6. CÁLCULO DE SISTEMA SOLAR** *(F6_Calculator.png)*
**Archivo**: `app/(user)/(tabs)/calculator.jsx`
**Pasos**:
1. Desde Home, toca "Calcular ahora" O navega a la pestaña "Calculadora"
2. Captura la pantalla vacía del formulario
3. Ingresa un valor de consumo: `1500` kWh/mes
4. Captura la pantalla con el valor ingresado
5. Toca el botón "Calcular"
6. Espera a que procese y captura la pantalla mostrando el resultado calculado en la misma pantalla
7. **Resultado esperado**: 
   - Paneles estimados: 20
   - Cobertura: ~100%
   - Ahorro estimado: $XXX

---

### **7. VISUALIZACIÓN DE RESULTADOS** *(F7_Results.png)*
**Archivo**: `app/(user)/results.jsx`
**Pasos**:
1. Después de completar el cálculo en la función anterior, se navega automáticamente a esta pantalla
2. Captura la pantalla completa mostrando:
   - Consumo ingresado (1500 kWh)
   - Paneles estimados
   - Cobertura calculada
   - Ahorro estimado
   - Botón para guardar o ir al historial
3. Scrollea y captura todos los detalles del resultado

---

### **8. CONSULTA DEL HISTORIAL** *(F8_History.png)*
**Archivo**: `app/(user)/(tabs)/history.jsx`
**Pasos**:
1. Navega a la pestaña "Historial" (en la barra inferior)
2. Deberías ver la lista de cálculos previos
3. Captura la pantalla mostrando:
   - Lista de cálculos históricos
   - Fecha, consumo, paneles, etc. de cada uno
   - El cálculo que acabas de hacer debería aparecer al tope
4. Scrollea hacia abajo si hay más datos y captura

---

### **9. VISUALIZACIÓN DE DETALLE DE CÁLCULO** *(F9_HistoryDetail.png)*
**Archivo**: `app/(user)/history-detail.jsx`
**Pasos**:
1. Desde la pantalla de Historial, toca uno de los cálculos en la lista
2. Se abre la pantalla de detalle
3. Captura la pantalla completa mostrando:
   - Todos los detalles del cálculo (consumo, paneles, cobertura, ahorro, fecha, etc.)
   - Posible botón para volver o acciones adicionales
4. Este detalle puede incluir información para solicitar cotización

---

### **10. VISUALIZACIÓN DE INFORMACIÓN EDUCATIVA** *(F10_Info.png)*
**Archivo**: `app/(user)/(tabs)/info.jsx` O `app/(user)/info.jsx`
**Pasos**:
1. Desde cualquier pantalla, busca una pestaña o enlace a "Info" o "Educativo"
2. Captura la pantalla mostrando contenido educativo sobre energía solar
3. Scrollea y captura los diferentes apartados si los hay
4. **Si no existe aún**: Documenta que esta función está prevista pero no implementada

---

### **11. CONSULTA DEL PERFIL** *(F11_Profile.png)*
**Archivo**: `app/(user)/(tabs)/profile.jsx`
**Pasos**:
1. Navega a la pestaña "Perfil" (última pestaña inferior)
2. Captura la pantalla mostrando:
   - Datos del usuario (nombre, email, teléfono si aplica)
   - Opciones de menú (editar, preferencias, etc.)
   - Botón de cierre de sesión
3. Scrollea para capturar todas las opciones disponibles

---

### **12. VISUALIZACIÓN DE MI SISTEMA INSTALADO** *(F12_InstalledSystem.png)*
**Archivo**: `app/(user)/installed-system.jsx`
**Pasos**:
1. Desde Home o Perfil, busca el enlace a "Mi sistema instalado"
2. Captura la pantalla mostrando:
   - Datos del cliente (nombre, ubicación, etc.)
   - Especificaciones del sistema (kWp, paneles, inversor, batería)
   - Detalles técnicos
3. Scrollea y captura todas las secciones

---

### **13. CONSULTA DEL PLAN DE MANTENIMIENTOS** *(F13_Maintenance.png)*
**Archivo**: Parte de `app/(user)/installed-system.jsx` O pantalla separada
**Pasos**:
1. Desde "Mi sistema instalado", scrollea hasta la sección de mantenimientos
2. Captura la pantalla mostrando:
   - Calendario/tabla de tareas de mantenimiento
   - Meses, tareas, estado de cada una (pendiente, completada, etc.)
3. Si es una pantalla separada, navega a ella desde el menú

---

### **14. VISUALIZACIÓN DEL PANEL ADMINISTRADOR** *(F14_AdminDashboard.png)*
**Archivo**: `app/(admin)/dashboard.jsx`
**Pasos**:
1. Haz logout del usuario regular
2. Haz login con ADMIN: `admin@greensaver.com` / `admin`
3. Automáticamente llegarás al Panel del Administrador
4. Captura la pantalla completa mostrando:
   - Logo/encabezado "GREEN SAVER"
   - Tarjetas de acción: "Gestionar Usuarios", "Ver Estadísticas", "Enviar Cotización"
   - Botón de logout
5. Este es el punto de entrada para administradores

---

### **15. GESTIÓN DE USUARIOS** *(F15_Users.png)*
**Archivo**: `app/(admin)/users.jsx`
**Pasos**:
1. Desde Admin Dashboard, toca "Gestionar Usuarios"
2. Captura la pantalla mostrando:
   - Lista de usuarios registrados
   - Nombre, email, rol de cada usuario
   - Botón de eliminar o acciones por usuario
3. Scrollea para capturar todos los usuarios en la lista
4. **Opcional**: Toca el botón de eliminar para mostrar la confirmación (sin confirmar la eliminación)

---

### **16. ENVÍO DE COTIZACIÓN** *(F16_Quotes.png)*
**Archivo**: `app/(admin)/quotes.jsx`
**Pasos**:
1. Desde Admin Dashboard, toca "Enviar Cotización"
2. Captura la pantalla mostrando:
   - Selector de cliente (lista de usuarios que han hecho cálculos)
   - Campos para ingresar precio y notas
3. Selecciona un cliente de la lista
4. Llena los campos:
   - **Precio**: `4500.00` (o monto relevante)
   - **Notas**: `Sistema recomendado para máxima eficiencia`
5. Captura la pantalla con los datos llenos
6. Toca "Enviar Cotización"
7. Captura la pantalla de confirmación/éxito
8. Luego captura el historial de cotizaciones (footer de la pantalla si existe)

---

## 📸 NOTAS TÉCNICAS DE SCREENSHOT

### Windows:
- **Opción 1**: `Win + Shift + S` → Recorta el área → Guarda
- **Opción 2**: `Impr Pantalla` → Abre Paint → Pega y guarda
- **Opción 3**: Usa PowerToys de Microsoft (más profesional)

### Recomendaciones:
- **Resolución mínima**: 1280x720 (landscape para mejor presentación)
- **Zoom del navegador**: 100% (no aumentes/disminuyas)
- **Oculta DevTools**: F12 para cerrarlas antes de screenshot
- **Nombre de archivos**: `F01_Login.png`, `F02_Register.png`, etc. (en orden numérico)
- **Formato**: PNG (mejor que JPG para este tipo de contenido)

---

## 📂 ESTRUCTURA DE CARPETAS RECOMENDADA

```
Evidencias_Visuales/
├── F01_Login.png
├── F02_Register.png
├── F03_RecoverPassword.png
├── F04_Logout.png
├── F05_Home_User.png
├── F06_Calculator.png
├── F07_Results.png
├── F08_History.png
├── F09_HistoryDetail.png
├── F10_Info.png
├── F11_Profile.png
├── F12_InstalledSystem.png
├── F13_Maintenance.png
├── F14_AdminDashboard.png
├── F15_Users.png
├── F16_Quotes.png
└── README_EVIDENCIAS.md
```

---

## ✅ CHECKLIST DE CAPTURA

- [ ] F01 - Login (formulario + acción)
- [ ] F02 - Register (formulario vacío + lleno + éxito)
- [ ] F03 - Recover Password (pantalla de recuperación)
- [ ] F04 - Logout (confirmación)
- [ ] F05 - Home Usuario (panel principal)
- [ ] F06 - Calculator (cálculo solar)
- [ ] F07 - Results (resultados)
- [ ] F08 - History (historial de cálculos)
- [ ] F09 - History Detail (detalle de cálculo)
- [ ] F10 - Info (información educativa)
- [ ] F11 - Profile (perfil de usuario)
- [ ] F12 - Installed System (sistema instalado)
- [ ] F13 - Maintenance (plan de mantenimiento)
- [ ] F14 - Admin Dashboard (panel admin)
- [ ] F15 - Users (gestión de usuarios)
- [ ] F16 - Quotes (envío de cotización)

---

## 💡 TIPS PROFESIONALES

1. **Consistencia Visual**: Usa siempre el mismo zoom, resolución y navegador
2. **Múltiples Estados**: Captura formularios vacíos, llenos y con errores (si aplica)
3. **Datos Coherentes**: Usa los mismos emails y datos en todas las secciones para que sea lógico
4. **Navegación Clara**: Asegúrate de que en cada captura se vea claramente dónde estás (títulos, breadcrumbs)
5. **Calidad de Imagen**: No comprimas las imágenes, mantén PNG sin pérdida
6. **Evidencia de Rol**: Captura claramente las diferencias entre usuario regular y admin

---

**Última actualización**: 9 de abril de 2026  
**Versión**: 1.0 APA 7 Compliance
