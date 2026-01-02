import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

import connectDB from "./connection.js";
import ticketRoutes from "./routes/ticketRoute.js";


const PORT = process.env.PORT
dotenv.config();
const app = express();
connectDB();

const corsOptions = {
  origin: 'https://ticketpilot-meta.vercel.app',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tickets", ticketRoutes);

//  to start the server
app.get("/startServer", async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Server started Successfully",
    });
  }
  catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});