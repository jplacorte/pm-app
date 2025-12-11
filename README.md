# Tonberry Cafe - Product Management App

A full-stack monorepo application for managing cafe products. This project consists of a **NestJS** backend API and a **Vue 3** frontend, managed with **Turborepo** and **pnpm**.

## 🚀 Tech Stack

- **Monorepo Tool:** Turborepo
- **Package Manager:** pnpm
- **Backend:** NestJS, Prisma, PostgreSQL
- **Frontend:** Vue 3, Vite, Tailwind CSS
- **UI Library:** Custom shared UI package + FontAwesome
- **Testing:** Jest (Backend), Vitest (Frontend)
- **Containerization:** Docker

---

## 🛠️ Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18 or higher)
- **pnpm** (`npm install -g pnpm`)
- **Docker** & **Docker Compose** (for the database)

---

## 📦 Project Structure

```text
.
├── apps
│   ├── api          # NestJS Backend Application
│   └── pm-app       # Vue 3 Frontend Application
├── packages
│   ├── ui           # Shared Vue UI Component Library
│   ├── types        # Shared TypeScript Interfaces/Types
│   ├── eslint-config # Shared ESLint configurations
│   └── typescript-config # Shared TSConfig files
└── docker-compose.yml

⚙️ Setup & Installation

1. Clone the repository

git clone <repository-url>
cd pm-app

2. Install dependencies
From the root directory, run:

pnpm install

3. Environment Configuration
You need to set up environment variables for both the API and the Frontend.

Backend (apps/api)
Create a .env file in apps/api/:

# apps/api/.env

# Database Connection (matches docker-compose.yml)
DATABASE_URL="postgresql://postgres:password@localhost:5432/pm_db?schema=public"

# Authentication
JWT_SECRET="super-secret-key-change-this"

# Cloudinary (Image Uploads)
CLOUDINARY_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

Frontend (apps/pm-app)
Create a .env file in apps/pm-app/:

# apps/pm-app/.env

# URL of the Backend API
VITE_API_URL="http://localhost:3000"

🗄️ Database Setup
The easiest way to set up the database is using the provided Docker Compose file.

1. Start the Database Container:
docker-compose up db -d

2. Run Migrations: Initialize the database schema using Prisma.
pnpm --filter api exec prisma migrate dev --name init

▶️ Running the Application

Development Mode
To start both the Backend API and Frontend simultaneously in watch mode:

pnpm dev

Frontend: http://localhost:5173
Backend: http://localhost:3000

Production Mode (Docker)
To build and run the entire stack (API + Database) using Docker:

docker-compose up --build

🧪 Testing
This project includes unit tests for both the backend logic and frontend components.

Run All Tests
pnpm test

Run Backend Tests Only
pnpm test:api

Run Frontend Tests Only
pnpm test:app

Run E2E Tests (Backend)
pnpm --filter=api run test:e2e

📝 Key Features
Authentication: Secure Login and Registration using JWT.

Product Management: CRUD operations for products (Create, Read, Update, Delete).

Image Uploads: Integrated with Cloudinary for product images.

Shared UI: Reusable components (Card, Button, Modal, Input, etc.) in packages/ui.

Type Safety: Shared TypeScript types between frontend and backend in packages/types.

🐛 Troubleshooting
Database Connection Error: Ensure the Docker container for Postgres is running (docker ps). Check if the DATABASE_URL in .env matches the credentials in docker-compose.yml.

Cloudinary Error: Ensure you have created a free Cloudinary account and populated the API keys in apps/api/.env.

Missing Dependencies: If you encounter module errors, try running pnpm install again or check if you are using the correct Node version.
```
