# Task Tracker 📝

A full-stack Task Tracker application with user authentication, project and task management, built using **React** for the frontend and **Node.js/Express** with **MongoDB** for the backend.

---

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router
- React Select

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv
- cors

---

## 📁 Folder Structure

TaskTracker/ ├── frontend/ # React App ├── backend/ # Express API └── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### Clone the repo
```bash
git clone https://github.com/PraveenN1/Task-Tracker.git
cd Task-Tracker
```
Backend Setup
```bash
cd backend
npm install
```
Create a .env file add 
- MONGO_URI
- JWT_SECRET_KEY
  
```bash
npm run dev
```
Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
- Create a .env file inside /backend and 
- add MONGO_URI=your_mongo_connection_string
- add JWT_SECRET_KEY=your_jwt_secret
- PORT=5000 (Optionally)


### Features
- Signup/Login with JWT authentication
- Country selector with flags
- Project and Task CRUD
- Full REST API
- Token-based user handling
- Cookie handling with withCredentials
