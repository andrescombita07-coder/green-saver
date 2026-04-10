# FastAPI Integration Code for Backend

Copia y pega estos bloques exactamente en tu archivo `backend/main.py` para completar la integración con el frontend.

---

## 1. IMPORTS Y CONFIGURACIÓN INICIAL (Reemplaza lo que tienes)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mariadb
from datetime import datetime

app = FastAPI(title="Green Saver API", version="1.0.0")

# ===== CORS CONFIGURATION =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar a dominios específicos en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== CONEXIÓN A MARIADB =====
DB_HOST = "localhost"
DB_NAME = "greensaver"
DB_USER = "root"
DB_PASWD = ""

try:
    conn = mariadb.connect(
        user=DB_USER,
        password=DB_PASWD,
        host=DB_HOST,
        port=3306,
        database=DB_NAME
    )
    cursor = conn.cursor(dictionary=True)
except mariadb.Error as e:
    print(f"Error conectando a MariaDB: {e}")
```

---

## 2. MODELOS PYDANTIC (Agregar después de CORS)

```python
# ===== MODELOS PYDANTIC =====
class UsuarioRegistro(BaseModel):
    name: str
    phone: str
    email: str
    password: str
    role: str = "user"

class UsuarioLogin(BaseModel):
    email: str
    password: str

class UsuarioResponse(BaseModel):
    id: int
    email: str
    name: str
    phone: str
    role: str

class CalculoCrear(BaseModel):
    email: str
    consumption: float
    estimatedPanels: int
    coverage: float
    estimatedSavings: float
    recommendation: str

class CalculoResponse(BaseModel):
    id: int
    email: str
    consumption: float
    estimatedPanels: int
    coverage: float
    estimatedSavings: float
    recommendation: str
    created_at: str
```

---

## 3. ENDPOINTS DE AUTENTICACIÓN (Agregar ANTES de los CRUD existentes)

```python
# ===== AUTENTICACIÓN =====

@app.post("/auth/register")
async def register(user: UsuarioRegistro):
    """Registrar nuevo usuario con validaciones"""
    try:
        # Verificar si el usuario ya existe
        cursor.execute("SELECT email FROM usuarios WHERE email = ?", (user.email,))
        if cursor.fetchone():
            return {"detail": "El usuario ya existe", "status": 400}
        
        # Insertar nuevo usuario (en producción: hashear password con bcrypt)
        cursor.execute(
            """INSERT INTO usuarios (nombre, email, telefono, password, rol, created_at) 
               VALUES (?, ?, ?, ?, ?, ?)""",
            (user.name, user.email, user.phone, user.password, user.role, datetime.now())
        )
        conn.commit()
        
        usuario_id = cursor.lastrowid
        
        return {
            "id": usuario_id,
            "email": user.email,
            "name": user.name,
            "phone": user.phone,
            "role": user.role,
            "token": None  # Opcional: generar JWT en producción
        }
    except Exception as e:
        return {"detail": str(e), "status": 500}

@app.post("/auth/login")
async def login(credentials: UsuarioLogin):
    """Autenticar usuario y retornar sesión"""
    try:
        cursor.execute(
            "SELECT id, nombre, email, telefono, rol FROM usuarios WHERE email = ? AND password = ?",
            (credentials.email, credentials.password)
        )
        user = cursor.fetchone()
        
        if not user:
            return {"detail": "Credenciales incorrectas", "status": 401}
        
        return {
            "id": user["id"],
            "email": user["email"],
            "name": user["nombre"],
            "phone": user["telefono"],
            "role": user["rol"],
            "token": None  # Opcional: generar JWT en producción
        }
    except Exception as e:
        return {"detail": str(e), "status": 500}

@app.get("/auth/me")
async def current_user(email: str):
    """Obtener datos del usuario actual"""
    try:
        cursor.execute(
            "SELECT id, nombre, email, telefono, rol FROM usuarios WHERE email = ?",
            (email,)
        )
        user = cursor.fetchone()
        
        if not user:
            return {"detail": "Usuario no encontrado", "status": 404}
        
        return {
            "id": user["id"],
            "email": user["email"],
            "name": user["nombre"],
            "phone": user["telefono"],
            "role": user["rol"]
        }
    except Exception as e:
        return {"detail": str(e), "status": 500}
```

---

## 4. ENDPOINTS DE CÁLCULOS (Reemplaza los existentes o agrega este POST)

```python
# ===== CRUD CÁLCULOS ACTUALIZADO =====

@app.get("/calculos")
async def get_calculos():
    """Obtener todos los cálculos"""
    try:
        cursor.execute("""
            SELECT id, email, consumption, estimatedPanels, coverage, 
                   estimatedSavings, recommendation, created_at FROM calculos
            ORDER BY created_at DESC
        """)
        return cursor.fetchall()
    except Exception as e:
        return {"detail": str(e), "status": 500}

@app.post("/calculos")
async def create_calculo(calculo: CalculoCrear):
    """Crear nuevo cálculo"""
    try:
        cursor.execute("""
            INSERT INTO calculos (email, consumption, estimatedPanels, coverage, 
                                 estimatedSavings, recommendation, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            calculo.email,
            calculo.consumption,
            calculo.estimatedPanels,
            calculo.coverage,
            calculo.estimatedSavings,
            calculo.recommendation,
            datetime.now()
        ))
        conn.commit()
        
        return {
            "id": cursor.lastrowid,
            "email": calculo.email,
            "consumption": calculo.consumption,
            "estimatedPanels": calculo.estimatedPanels,
            "coverage": calculo.coverage,
            "estimatedSavings": calculo.estimatedSavings,
            "recommendation": calculo.recommendation,
            "created_at": datetime.now().isoformat()
        }
    except Exception as e:
        return {"detail": str(e), "status": 500}
```

---

## 5. ROOT ENDPOINT (Mantener al final)

```python
@app.get("/")
async def root():
    return {"message": "Bienvenido a Green Saver API 🚀", "version": "1.0.0"}
```

---

## Tabla Usuarios (DDL si no existe)

```sql
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Tabla Calculos (DDL si no existe)

```sql
CREATE TABLE IF NOT EXISTS calculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    consumption FLOAT NOT NULL,
    estimatedPanels INT NOT NULL,
    coverage FLOAT NOT NULL,
    estimatedSavings FLOAT NOT NULL,
    recommendation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email) REFERENCES usuarios(email) ON DELETE CASCADE
);
```

---

## Variables de Entorno recomendadas (crear .env)

```
DB_HOST=localhost
DB_NAME=greensaver
DB_USER=root
DB_PASWD=
API_PORT=8000
CORS_ORIGINS=http://localhost:8085,http://localhost:3000,exp://
```

---

## Cómo usar en tu frontend

**URL del backend:**
```
set EXPO_PUBLIC_API_URL=http://localhost:8000
```

O en `.env.local`:
```
EXPO_PUBLIC_API_URL=http://localhost:8000
```

Luego en tu app, los endpoints se resuelven como:
- POST /auth/login
- POST /auth/register
- GET /calculos
- POST /calculos
- GET /auth/me?email=user@example.com
