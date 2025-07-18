# 🏡 Estate Hub

**Estate Hub** is a modern real estate web application where users can explore properties, connect with agents, manage accounts, and perform secure authentication. The project is built with **React**, styled using **Tailwind CSS** and **DaisyUI**, and supports **Firebase Authentication** for secure login/signup.

---

## 🚀 Live Site

🔗 [https://real-estate-fb7a5.web.app/]

---

## 🧑‍💻 Features

### ✅ Public Users

- Browse verified property listings
- View property details
- Register and log in (Email/Password, Google)

### ✅ Authenticated Users

- Request to become an Agent
- See assigned properties
- Mark properties as sold or fraud
- Dashboard access

### ✅ Admin

- Manage users (make Admin/Agent, mark fraud, delete user)
- Approve agents and properties
- Monitor fraud and sold reports

### ✅ Agent

- Add properties
- See own listings
- Handle buyer requests

---

## 🛠 Tech Stack

| Tech                  | Description                                        |
| --------------------- | -------------------------------------------------- |
| **React**             | Frontend library                                   |
| **React Router**      | Client-side routing                                |
| **Tailwind CSS**      | Utility-first CSS framework                        |
| **DaisyUI**           | UI component library for Tailwind                  |
| **Firebase**          | Authentication (Email, Google)                     |
| **Node.js & Express** | Backend API (Deployed to Vercel Serverless)        |
| **MongoDB**           | NoSQL database                                     |
| **Vercel**            | Hosting platform (Frontend + Serverless Functions) |

---

## 🔐 Authentication

- Firebase Email/Password login
- Google Sign-In
- JWT token stored in `localStorage`
- Role-based access control: `user`, `agent`, `admin`
