import Ticket from "../models/ticketModel.js";
import { classifyTicketWithGemini } from "../externalAPI/gemini.js";


// Inline ticket ID generator
const generateTicketId = () => {
    return `TP-${Math.floor(100000 + Math.random() * 900000)}`;
};


// create new ticket
export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required"
            });
        }

        const aiData = await classifyTicketWithGemini(
            title,
            description
        );

        const ticket = await Ticket.create({
            ticketId: generateTicketId(),
            title,
            description,
            category: aiData.category,
            priority: aiData.priority,
            assignedQueue: aiData.assignedQueue
        });

        res.status(201).json(ticket);
    }
    catch (error) {
        console.error("Create ticket error:", error);

        res.status(500).json({
            message: "Failed to create ticket"
        });
    }
};


// get all tickets
export const getTickets = async (req, res) => {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    res.json({
        value: tickets
    });
};


// update ticket
export const updateTicketStatus = async (req, res) => {
    const ticket = await Ticket.findById(req.params.id);

    ticket.status = req.body.status;
    await ticket.save();

    res.json(ticket);
};

