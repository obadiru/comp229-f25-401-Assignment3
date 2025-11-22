# MyPortfolio Backend (Assignment 2 Starter)

**VS Code Quick Start**

1. Open this folder in VS Code.
2. Run `npm install` in the integrated terminal.
3. Copy `.env.example` to `.env`, set `MONGO_URI`, `JWT_SECRET`.
4. Start dev server (with nodemon): `npm run dev` or use **Run and Debug → "Run Backend (nodemon)"**.
5. (Optional) Install **REST Client** or **Thunder Client** in VS Code and use `api-tests.http` to test endpoints.
6. Endpoints live at `http://localhost:${process.env.PORT or '5000'}`.

**CRUD Resources**
- `/api/contacts`
- `/api/projects`
- `/api/qualifications`
- `/api/users` (register/login + protected routes)

**Notes**
- Models map exactly to the fields required by the assignment.
- `users` routes include JWT auth (register/login) and protected management endpoints.
- You can later wire your React client (Assignment 1) to call these APIs.
