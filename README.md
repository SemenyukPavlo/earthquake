# Earthquake Management API

This project is a full-stack application for managing earthquake data using GraphQL, Express, TypeORM, PostgreSQL, and Next.js.

## Features

- GraphQL API with CRUD operations for earthquake records.
- PostgreSQL database integration using TypeORM.
- CSV import functionality to seed initial earthquake data.
- Next.js frontend with Apollo Client for interacting with the API.

## Setup

### Backend

1. Install dependencies:
   ```sh
   cd backend
   pnpm install
   ```
2. Configure PostgreSQL database in `config/database.ts`.
3. Start the server:
   ```sh
   pnpm start
   ```

### Frontend

1. Install dependencies:
   ```sh
   cd frontend
   pnpm install
   ```
2. Start the Next.js app:
   ```sh
   pnpm run dev
   ```

The frontend will be available at `http://localhost:3000`.
