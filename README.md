# 🥗 EatWise Frontend

This is the user interface for the EatWise project. Built with **React** and **Material UI**, it provides a responsive dashboard for users to manage their profiles, generate diet plans, and track their history.

## 🛠️ Tech Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **UI Library:** Material UI (MUI)
*   **Routing:** React Router v6
*   **HTTP Client:** Axios
*   **Node Version:** 18+ Recommended

---

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

1.  **Node.js (LTS version)**: [Download Here](https://nodejs.org/)
2.  **npm** (Included with Node.js)
3.  **EatWise Backend API**: Ensure the Java Spring Boot backend is running (usually on port `8080`).

---

## 🚀 Getting Started

Follow these steps to set up and run the frontend on your local machine.

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/jabiyev11/-FE-EatWise.git
cd eatwise-frontend
```

### 2. Install Dependencies

Install the necessary JavaScript packages:

```bash
npm install
```

## 🏃 How to Run the Application

You can run the application directly from the command line.

### Option A: macOS / Linux / Git Bash

```bash
npm run dev
```

### Option B: Windows (Command Prompt / PowerShell)

```cmd
npm run dev
```

> You should see output indicating the server is running, usually at: `http://localhost:5173`

---

## 🛑 Troubleshooting

### Error: `'vite' is not recognized`
This means dependencies weren't installed correctly.
**Solution:** Run `npm install` again.

### Error: `Network Error` or `Connection Refused` on Login
The frontend cannot reach the backend.
**Solution:**
1.  Ensure the **EatWise Backend API** (Spring Boot) is running.
2.  Check that your `.env` file exists and `VITE_API_BASE_URL` is set correctly to `http://localhost:8080/api`.
3.  Ensure CORS is enabled on the backend.

### Error: `Node version incompatible`
Vite requires a modern version of Node.js.
**Solution:** Run `node -v`. If it is older than v18, download the latest LTS version from nodejs.org.

---

## ✅ Verifying the Application

1.  Open your browser to `http://localhost:5173` (or the port shown in your terminal).
2.  You should see the **EatWise Landing/Login Page**.
3.  Try to **Register** a new user. If successful, the connection to the backend is working.

---

## 📂 Project Structure

*   `src/`
    *   `api/`: Axios functions for communicating with the backend.
    *   `components/`: Reusable UI parts (Navbar, ProtectedRoute).
    *   `context/`: AuthContext for managing login state.
    *   `pages/`: Full page views (Login, Home, Profile, Plan).
    *   `App.jsx`: Main routing configuration.
    *   `main.jsx`: Application entry point.