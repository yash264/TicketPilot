import axios from "axios";

const API = axios.create({
  baseURL: "https://ticketpilotserver-meta.vercel.app/api/tickets"
});

export const createTicket = (data) => API.post("/createTicket", data);
export const getTickets = () => API.get("/getTickets");
export const updateTicketStatus = (id, status) =>
  API.put(`/updateTicket/${id}`, { status });
export const getMetrics = () => API.get("/metrics");
