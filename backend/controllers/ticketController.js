import Ticket from "../models/ticketModel.js";
import { classifyTicketWithGemini } from "../externalAPI/gemini.js";


// create new ticket
export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
    
        const aiData = await classifyTicketWithGemini(
            title,
            description
        );

        const ticket = await Ticket.create({
            title,
            description,
            category: aiData.category,
            priority: aiData.priority,
            assignedQueue: aiData.assignedQueue
        });

        res.status(201).json(ticket);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI processing failed" });
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


// show all metrics
export const getMetrics = async (req, res) => {
    const total = await Ticket.countDocuments();

    const byCategory = await Ticket.aggregate([
        {
            $group:
            {
                _id: "$category",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    const byPriority = await Ticket.aggregate([
        {
            $group:
            {
                _id: "$priority",
                count: {
                    $sum: 1
                }
            }
        }
    ]);

    res.json({ total, byCategory, byPriority });
};
