# 🚀 MERN Machine Test — Full Solution

This project is a **mini CRM system** built with the **MERN stack** for the assessment.  
It allows an **Admin** to log in, manage **Agents**, and upload a **Contacts CSV/XLSX** file, which gets **automatically distributed among 5 agents**.

---

## ✨ Features
✅ Admin login with **JWT Authentication**  
✅ Add & manage Agents  
✅ Upload `.csv`, `.xlsx`, `.xls`, `.axls` files  
✅ Automatic **equal distribution of contacts** among 5 agents  
✅ Data stored in **MongoDB**  
✅ Clean React frontend with **JWT-protected routes**  

---

## 📸 Screenshots

### Dashboard Preview
![Dashboard](https://github.com/sharad641/mern-machine-test/blob/main/client/photos/1.jpg?raw=true)

### Agent Distribution
![Distribution](https://github.com/sharad641/mern-machine-test/blob/main/client/photos/2.jpg?raw=true)

---

## ⚡ Quick Start

### 1️⃣ Backend (Server)
```bash
cd server
cp .env.example .env   # update your MongoDB URI & JWT_SECRET
npm install
npm run dev

Seed an Admin
POST http://localhost:5000/api/auth/seed-admin
{
  "name":"Admin",
  "email":"admin@example.com",
  "password":"Admin@12345"
}
Login
POST http://localhost:5000/api/auth/login
{
  "email":"admin@example.com",
  "password":"Admin@12345"
}
2️⃣ Frontend (Client)
cd client
cp .env.example .env   # update VITE_API_URL if needed
npm install
npm run dev
Open → http://localhost:5173

Login with your seeded Admin credentials.
🔄 Workflow

Admin logs in ✅

Create at least 5 agents ✅

Upload a contact list (.csv/.xlsx/.xls/.axls) with columns:

FirstName (text)

Phone (number)

Notes (text)

The server:

Validates the file format

Distributes contacts equally among agents (round-robin)

Saves distribution in MongoDB

Dashboard shows per-agent contact lists ✅
🛠️ Tech Stack

MongoDB → Database

Express.js → Backend Framework

React (Vite) → Frontend

Node.js → Server Runtime

JWT → Authentication

Multer + XLSX → File Upload & Parsing
⚙️ Notes

Minimum 5 agents required before upload.

Supported file types → .csv, .xlsx, .xls, .axls

Error handling with centralized middleware.

Code is modular and commented for readability.

👨‍💻 Author

Made by Devdas ✨

---

✅ This README will look **modern** on GitHub with screenshots + clear sections.  
✅ The **code blocks** are formatted to run in one terminal for server and client setup.  

---

Would you like me to also create a **one-liner project description** you can paste in your GitHub repo description (just under repo name) for recruiters?
