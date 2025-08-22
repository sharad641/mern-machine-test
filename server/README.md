# Server (Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run dev: `npm run dev`

### Seed an admin
Send a POST to `http://localhost:5000/api/auth/seed-admin` with JSON body:
```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```
This will create an admin **only if** it doesn't exist.

### Login
POST `http://localhost:5000/api/auth/login`
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

### Create Agents (Admin only)
POST `http://localhost:5000/api/agents`
```json
{
  "name": "Agent One",
  "email": "agent1@example.com",
  "phone": "+91-9876543210",
  "password": "Agent@12345"
}
```

### Upload & Distribute (Admin only)
`POST /api/upload` with `multipart/form-data`:
- field name: `file`
- accepts: `.csv`, `.xlsx`, `.xls`

The file must have columns: **FirstName**, **Phone**, **Notes** (case-insensitive). Requires **at least 5 agents** to exist.
Returns per-agent counts and a `batchId` you can use to filter.

### Fetch Contacts
- Admin: `GET /api/contacts` (optional `?batchId=...` or `?agentId=...`)
- Agent: `GET /api/my/contacts` (only their own)
