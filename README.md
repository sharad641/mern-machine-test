🚀 MERN Machine Test — Full Solution

This repository contains a complete MERN stack implementation for the machine test.

✅ Features

Admin login with JWT authentication

Agent creation & management

File upload (CSV / XLSX / XLS / AXLS)

Equal distribution of contacts to 5 agents (round-robin)

Distributed lists saved in MongoDB and displayed in frontend


⚡ Quick Start
1️⃣ Server Setup

cd server
cp .env.example .env   # edit .env with your MongoDB URI & JWT secret
npm install
npm run dev

👉 Seed an admin:
POST http://localhost:5000/api/auth/seed-admin
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "Admin@12345"
}
👉 Login as admin:

POST http://localhost:5000/api/auth/login
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}

2️⃣ Client Setup
cd client
cp .env.example .env   # configure API URL if needed
npm install
npm run dev
Open ➝ http://localhost:5173

Login with your seeded admin credentials.

3️⃣ Workflow

Create at least 5 agents (Name, Email, Mobile, Password).

Upload a file (.csv, .xlsx, .xls, .axls) with columns:
FirstName, Phone, Notes

The server distributes rows equally among 5 agents using round-robin.

Example: 25 rows → each gets 5.

Example: 27 rows → each gets 5, and 2 extra go to first 2 agents.

Data is stored in MongoDB and displayed on the dashboard.
🖼️ Screenshots
🔑 Login Page

📊 Dashboard with Distributed Lists

📌 Notes

The server enforces at least 5 agents before uploading a file.

Allowed file types: csv, xlsx, xls, axls.

Built with:

Backend: Node.js + Express.js + MongoDB

Frontend: React + Vite + Axios

Auth: JWT (Bearer Token)

Validation handled with Joi & central error middleware.

🏁 Final Words

This is a mini CRM system where the Admin can:

Login securely 🔐

Manage agents 👥

Upload & distribute leads 📂

View all assignments on the dashboard 📊

Good luck with your submission 🚀