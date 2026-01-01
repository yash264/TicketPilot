import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        assignedQueue: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            // required: true,
            default: "Open"
        }
    },
    { 
        timestamps: true
    }
);

export default mongoose.model("ticket", ticketSchema);
