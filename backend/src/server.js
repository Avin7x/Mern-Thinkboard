// start server

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import {connectDB} from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import  rateLimiter  from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173"
    }))
}

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")));

if(process.env.NODE_ENV === "production"){
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

// connect DB first, then start server
connectDB().then(() => {
    app.listen(port, ()=>{
        console.log("server started at port:", port);
        console.log(`http://localhost:${port}/api/notes`);
    })
});
    


