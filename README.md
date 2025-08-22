# MERN Machine Test — Full Solution

This repo contains a complete **MERN** implementation for the assessment:

- Admin login with **JWT**
- Agent creation & management
- CSV/XLSX upload and **equal distribution to 5 agents**
- Lists saved in **MongoDB** and displayed on frontend

## Quick Start

### 1) Server
```
cd server
cp .env.example .env
# edit .env if needed
npm install
npm run dev
```
**Seed an admin:**
```
POST http://localhost:5000/api/auth/seed-admin
{ "name":"Admin", "email":"admin@example.com", "password":"Admin@12345" }
```
**Login:**
```
POST http://localhost:5000/api/auth/login
{ "email":"admin@example.com", "password":"Admin@12345" }
```

### 2) Client
```
cd client
cp .env.example .env
npm install
npm run dev
```
Open http://localhost:5173 and login with your admin credentials.

### 3) Workflow
1. Create **5 agents** (minimum).
2. Upload a file (`.csv`, `.xlsx`, `.xls`, `.axls`) with columns **FirstName, Phone, Notes**.
3. The server distributes rows equally among the first 5 agents (round-robin), stores them in MongoDB, and returns a `batchId`.
4. The dashboard shows per-agent distributed lists.

## Notes

- The server enforces **at least 5 agents** before distributing.
- Allowed file types: **csv, xlsx, xls, axls**.
- Frontend is built with **React + Vite** and uses **Axios** with a JWT Bearer token.
- Code includes validation and error handling (Joi + central error middleware).

Good luck with your submission!
