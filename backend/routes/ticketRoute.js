import express from "express";
import {
    createTicket,
    getTickets,
    updateTicketStatus
} from "../controllers/ticketController.js";
import { getMetrics } from "../controllers/metricsController.js";

const router = express.Router();

router.post("/createTicket", createTicket);
router.get("/getTickets", getTickets);
router.put("/updateTicket/:id", updateTicketStatus);
router.get("/metrics", getMetrics);

export default router;
