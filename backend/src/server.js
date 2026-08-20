import express from "express"; //imports the express
//const express = require("express"); //imports with no warnings
//import { connectDB } from "./config/db.js"; I did not have to include this for some reason

//import MONGO_URI
import dotenv from "dotenv"
dotenv.config();

const app = express() //create new express app

//run db.js
connectDB();

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
app.use("/api/notes", notesRoutes); //adds a prefix that will be applied before any specifics for the URL

//listen on a port
const PORT = process.env.PORT; // || number; for a backup port
app.listen(PORT, () => { console.log("CONNECTED TO PORT", PORT); });

