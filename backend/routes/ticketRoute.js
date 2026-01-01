import express from "express";
import {
    createTicket,
    getTickets,
    updateTicketStatus,
    getMetrics
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/createTicket", createTicket);
router.get("/getTickets", getTickets);
router.put("/updateTicket/:id", updateTicketStatus);
router.get("/metrics", getMetrics);

export default router;
