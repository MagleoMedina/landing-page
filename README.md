# Landing Page — Magleo Medina

Portfolio personal con landing interactiva (frontend React) y un pequeño API (backend Spring Boot) que expone los proyectos y el formulario de contacto.

- **Frontend:** `frontend/` — React 19 + TypeScript + Vite
- **Backend:** `backend/` — Spring Boot 4.1.1 (Java 21)
- **Deploy:** frontend como sitio estático; backend como Web Service con Docker en Render
- **Correo:** formulario de contacto enviado vía API de Resend (HTTPS), sin SMTP

---

## Stack

### Frontend
- React 19, TypeScript, Vite 8
- TanStack-style hooks propios: tema claro/oscuro, idioma ES/EN (`use-theme`, `use-lang`)
- Animaciones: GSAP, OGL (shaders), WebGL (`ElectricBorder`, `Balatro`, `Hero`)
- Componentes custom: `ProfileCard` (tilt 3D + glow + holo), carrusel de proyectos con snap/scroll suave, `TagIcon`, `TextType`
- Iconos: `react-icons`

### Backend
- Spring Boot 4.1.1, Java 21, Maven
- `spring-boot-starter-webmvc`, `validation`
- Envío de correo con `java.net.http.HttpClient` → API REST de Resend
- Lectura de configuración desde `.env` vía `spring.config.import: optional:file:../.env[.properties]`

---

## Estructura

```
.
├── backend/                     # Spring Boot
│   ├── src/main/java/.../landing/
│   │   ├── contact/             # API de contacto + envío por Resend
│   │   ├── projects/            # Catálogo de proyectos (JSON + controller)
│   │   ├── config/WebConfig.java# CORS
│   │   └── LandingApplication.java
│   ├── src/main/resources/
│   │   ├── application.yaml     # config (PORT, Resend, CONTACT_TO)
│   │   └── projects.json        # datos de los proyectos
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── render.yaml              # blueprint para Render
└── frontend/                    # React + Vite
    ├── src/
    │   ├── components/          # secciones + componentes (ProfileCard, TagIcon…)
    │   ├── data/portfolio.ts    # perfil, categorías y proyectos (fallback)
    │   ├── i18n/messages.ts     # textos ES/EN
    │   ├── api.tsx              # cliente HTTP único (VITE_API_URL)
    │   └── index.css
    └── public/assets/           # SVGs de proyectos, imágenes del perfil
```

---

## Requisitos

- Node.js ≥ 20 y [pnpm](https://pnpm.io)
- JDK 21 (obligatorio para el backend) y Maven 3.9
- Cuenta en [Resend](https://resend.com) para el envío de correos (opcional en local)

---

## Puesta en marcha local

### 1. Variables de entorno

Crea `.env` en la raíz del repo (el backend lo lee) y `frontend/.env.local` si necesitas sobrescribir la URL de la API:

```bash
# Raíz /.env
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM=Portfolio <onboarding@resend.dev>
CONTACT_TO=tucorreo@gmail.com
```

```bash
# frontend/.env.local  (opcional; en dev el default ya apunta a localhost:8080)
VITE_API_URL=http://localhost:8080
```

> El remitente por defecto `onboarding@resend.dev` solo puede enviar a la dirección con la que te registraste en Resend; usá la misma en `CONTACT_TO`.

### 2. Backend

```bash
cd backend
JAVA_HOME=/usr/lib/jvm/jdk-21.0.10-oracle-x64 mvn spring-boot:run
# o
mvn -B test            # tests
mvn -B package         # jar
```

Arranca en `http://localhost:8080` (puerto sobreescribible con `PORT`).

### 3. Frontend

```bash
cd frontend
pnpm install
pnpm dev               # http://localhost:5173
```

---

## APIs del backend

Base: `http://localhost:8080` (o `https://landing-page-backend-nd6c.onrender.com` en producción).

| Método | Ruta                  | Descripción                                    |
| ------ | --------------------- | ---------------------------------------------- |
| GET    | `/api/projects`       | Lista de categorías con sus proyectos          |
| POST   | `/api/contact`        | Envía el formulario de contacto (Resend)       |
| GET    | `/api/contact/status` | Diagnóstico: credenciales configuradas (sin secretos) |

Ejemplo `POST /api/contact`:

```json
{ "name": "Ana", "email": "ana@example.com", "message": "Hola" }
```

Respuestas:
- `200 {"status":"ok"}` → correo enviado
- `400` → validación fallida
- `502 {"message":"...","cause":"..."}` → error de envío (la `cause` indica el problema SMTP/API)

---

## Configuración relevante

### Frontend (`VITE_API_URL` en `api.tsx`)
- Dev: `http://localhost:8080`
- Prod: ruta relativa (`/api/...`) o URL absoluta vía `VITE_API_URL` (ver `frontend/.env.production`)

### Backend (`application.yaml`)
| Variable             | Default                                   | Uso                          |
| -------------------- | ----------------------------------------- | ---------------------------- |
| `PORT`               | `8080`                                    | Puerto del servidor          |
| `RESEND_API_KEY`     | *(vacío)*                                 | API key de Resend            |
| `RESEND_FROM`        | `Portfolio <onboarding@resend.dev>`       | Remitente                    |
| `CONTACT_TO`         | *(vacío)*                                 | Destinatario del contacto    |

---

## Deploy

### Backend → Render (Web Service con Docker)
1. Sube a GitHub `main` (Render hace auto-deploy).
2. En el Dashboard del servicio (`landing-backend-nd6c`) → **Environment**:
   - `RESEND_API_KEY`
   - `CONTACT_TO`
3. **Deploy → Redeploy**.
4. Verifica `GET /api/contact/status` → `configuredMail: true`.

> **Nota sobre el free tier:** Render bloquea tráfico SMTP saliente en puertos 25/465/587, por eso el envío usa la API HTTPS de Resend. Además la instancia gratuita se duerme tras 15 min de inactividad y la primera petición tras despertar puede dar 502 (un monitor tipo UptimeRobot cada ~10 min lo mantiene despierto).

### Frontend
```bash
cd frontend
pnpm build            # genera dist/
pnpm preview          # prueba el build localmente
```
Sube el contenido de `dist/` como Static Site (o a tu host estático; en prod el backend se apunta desde `VITE_API_URL`).

---

## Resultados de Tests

Backend (JUnit + MockMvc): `mvn -B test`

```text
Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
```

---

## Contribuir / Notas

- Los SVG de los proyectos se sirven desde `frontend/public/assets/projects/`; los datos se editan en `backend/src/main/resources/projects.json` (fallback en `frontend/src/data/portfolio.ts`).
- El repositorio ignora `.env` pero versiona `.env.example` (sin secretos).
- No incluye todavía: docs de API generadas, CI/CD pipeline propio (se usa el auto-deploy de Render).