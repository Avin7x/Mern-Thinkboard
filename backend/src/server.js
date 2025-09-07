// start server

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import  rateLimiter  from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);


// connect DB first, then start server
connectDB().then(() => {
    app.listen(port, ()=>{
        console.log("server started at port:", port);
        console.log(`http://localhost:${port}/api/notes`);
    })
});
    


