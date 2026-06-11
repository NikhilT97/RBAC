# RBAC Task Manager

A full-stack Role-Based Access Control (RBAC) application built with MERN stack.

## Features

### Admin
- View all users & manage their status (Active/Inactive)
- Delete users
- View all tasks created by users
- View activity logs (login, task created, updated, deleted)

### User
- Register & Login
- Create, view, update, delete own tasks
- Track task status (Pending/Completed)

## Tech Stack

**Frontend:** React.js, Tailwind CSS, Axios, React Router DOM

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

## Getting Started

### Backend Setup
```bash
cd RBAC-backend
npm install
```

Create `.env` file:
```
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd RBAC-frontend
npm install
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

### Tasks (User)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get own tasks |
| POST | /api/tasks | Create task |
| PATCH | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | Get all users |
| DELETE | /api/admin/users/:id | Delete user |
| PATCH | /api/admin/users/:id/status | Update user status |
| GET | /api/admin/tasks | Get all tasks |
| GET | /api/admin/activity-logs | Get activity logs |

## Folder Structure

RBAC/
├── RBAC-backend/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── utils/
│   └── server.js
└── RBAC-frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   └── pages/
└── index.html

## Test Credentials

**Admin**
- Email: admin@test.com
- Password: 123456

**User**
- Email: nikhil@gmail.com  
- Password: 123456
