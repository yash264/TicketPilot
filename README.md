# 🎫 TicketPilot

TicketPilot is a smart, centralized support ticket management system designed to streamline issue tracking and resolution.  
It helps teams efficiently organize, prioritize, and monitor customer requests from a single admin dashboard.  
With real-time insights, intuitive workflows, and analytics-driven metrics, TicketPilot enables faster decisions and better support outcomes.

---

## ✨ Key Features

### 🎫 Smart Ticket Management
Create, view, update, and manage support tickets from a single admin dashboard. Each ticket is automatically assigned a unique 6-digit Ticket ID and includes details such as category, priority, assigned queue, status, and creation time (IST).

### 🧠 AI-Powered Ticket Classification
TicketPilot integrates with **Gemini AI** to automatically analyze ticket title and description, classify the ticket category, set priority, and route it to the appropriate support queue—reducing manual effort and response time.

### 📊 Analytics & Insights Dashboard
Gain real-time insights into support operations with an analytics dashboard that visualizes tickets by category, priority, assigned queue, and time-based trends (weekly and monthly), enabling data-driven decision-making.

---

## Demo Video & Live Hosting

- **🎥 Video Demo:** https://drive.google.com/file/d/1eVuNXHqkMUugiK0iO3mnkT5A_EU6FOsU/view?usp=sharing  
- **🌐 Live App:** https://ticketpilot-meta.vercel.app

---

## 🔌 Backend API Endpoints

### 📁 Ticket APIs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/createTicket` | Create a new support ticket (AI classification applied) |
| GET | `/api/getTicket` | Fetch all tickets |
| PUT | `/api/updateTicket/:id` | Update ticket status (Open / Closed) |
| DELETE | `/api/metrics` | Get overall ticket metrics |

---

## 🛠 Tech Stack

### Frontend
- React
- Ant Design
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Gemini API (via REST)

---

