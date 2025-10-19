# 🚀 Prueba Técnica Full Stack

**Tecnologías:**  
- 🧱 Backend: Java 21 + Spring Boot  
- 🧩 Frontend: Angular  
- 🐘 Base de Datos: PostgreSQL  
- 🐳 Contenedores: Docker & Docker Compose  

---

## 🎯 Objetivo

Desarrollar una aplicación full stack compuesta por:
- Un **backend** basado en microservicios que gestione productos e inventario.
- Un **frontend** en Angular que consuma la API del backend.
- Una base de datos PostgreSQL administrada por Docker.

---

## 🏗️ Estructura del Proyecto

```text
fullstack-challenge/
│
├── backend/
│ ├── productos-service/ # Microservicio de productos
│ ├── inventario-service/ # Microservicio de inventario
│ ├── db/ # Configuración de base de datos
│ │ ├── docker-compose.yml
│ │ └── init/create_tables.sql
│ └── docker-compose.yml # Orquestación backend (DB + servicios)
│
├── frontend/
│ └── inventario-app/ # Aplicación Angular (interfaz de usuario)
│
└── README.md
```

---

## ⚙️ Configuración del entorno

### 🔧 Requisitos previos
Asegúrate de tener instaladas las siguientes herramientas:

| Herramienta | Versión recomendada |
|--------------|---------------------|
| Java JDK | 21 |
| Maven | 3.9+ |
| Node.js | 20+ |
| Angular CLI | 17+ |
| Docker Desktop | Última versión |
| Git | 2.30+ |

---

## 🐘 Base de Datos (PostgreSQL)

La base de datos se levanta mediante **Docker Compose** desde la carpeta `backend/db`:

```bash
cd backend/db
docker compose up -d
```

## 🧱 Backend (Spring Boot) + base de datos

Para levantar ambos servicios tanto backend como la base de datos se hace mediante **Docker Comnpose** desde la carpeta `backend`:

```bash
cd backend
docker compose build --no-cache
docker compose up
```

## 💻 Frontend (Angular)

Para levantar el frontend:

```bash
cd frontend/angular-app
npm i
ng serve --proxy-config proxy.conf.json
```

## 🧭 Acceso a Swagger UI

Una vez este levantado el **Docker Compose**:

Documentación JSON:
- [http://localhost:8080/v3/api-docs]
- [http://localhost:8082/v3/api-docs]

Interfaz visual:
- [http://localhost:8080/swagger-ui.html]
- [http://localhost:8082/swagger-ui.html]

## 🧪 Pruebas

### Backend

- Pruebas unitarias y de integración con JUnit + Mockito.

- Ejecución:

```bash
mvn test
```

### Frontend

- Pruebas unitarias con Jasmine + Karma.

- Ejecución:

```bash
npm test
```

## 🧠 Decisiones técnicas

- Uso de Docker Compose para orquestar microservicios y base de datos.

- Spring Boot + WebClient para la comunicación entre microservicios.

- PostgreSQL como base de datos relacional. Se selecciona esta base de datos por su simplicidad y velocidad.

- Angular + RxJS para el manejo de estados y consumo de API.

- Swagger/OpenAPI para documentación.

- ESLint + Prettier en frontend para mantener código limpio y estandarizado.

## ✨ Autor

[Santiago Cárdenas Amaya] | Desarrollador Full Stack

📧 [cardenas.santiago27@gmail.com]