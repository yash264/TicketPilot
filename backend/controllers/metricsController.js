import Ticket from "../models/ticketModel.js";

export const getMetrics = async (req, res) => {
    const now = new Date();

    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - 7);

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const [
        byCategory,
        byPriority,
        byQueue,
        weeklyCount,
        monthlyCount,
        dailyTrend
    ] = await Promise.all([
        Ticket.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]),
        Ticket.aggregate([
            { $group: { _id: "$priority", count: { $sum: 1 } } }
        ]),
        Ticket.aggregate([
            {
                $group: {
                    _id: "$assignedQueue",
                    count: { $sum: 1 }
                }
            }
        ]),
        Ticket.countDocuments({ createdAt: { $gte: startOfWeek } }),
        Ticket.countDocuments({ createdAt: { $gte: startOfMonth } }),
        Ticket.aggregate([
            {
                $match: {
                    createdAt: { $gte: startOfWeek }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt"
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ])
    ]);

    res.json({
        byCategory,
        byPriority,
        byQueue,
        weeklyCount,
        monthlyCount,
        dailyTrend
    });
};
