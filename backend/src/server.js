//package imports
import cors from "cors"
import express from "express"; //imports the express
//const express = require("express"); //imports with no warnings
import path from "path";

//local imports 
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";


//import MONGO_URI
import dotenv from "dotenv"
dotenv.config();

const app = express() //create new express app



//middle layer
//middle ware
//runs inbetween the req and res on the backend server 
app.use(cors({
    origin:"http://localhost:5173", //allows api requests from the frontend
})); //must be FIRST to avoid CORS errors

app.use(express.json()); //this gets the json input (title,, content,,,) for the notesRoutes

app.use(rateLimiter);
app.use((req,res,next) => {
    console.log(`NEW ${req.method} REQUEST RECIEVED FROM ${req.url}`); //runs this first before processing the request 
    next();                              //process the request (notesRoutes)
});
//

app.use("/api/notes", notesRoutes); //adds a prefix that will be applied before any specifics for the URL


//find the dist folder and serve the folder?
//const __dirname = path.resolve()
//app.use(express.static(path.join(__dirname, "../frontend/dist")))
//app.get("*", (req, res) => {
//    res.sendFile(path.join(__dirname, "../frontend", "dist"))

//})

//listen on a port
const PORT = process.env.PORT; // || number; for a backup port

//run db.js
connectDB().then(() => {

    //after connecting to the database, then listen on the port
    app.listen(PORT, () => { console.log("CONNECTED TO PORT", PORT); });
})


