//PACKAGE IMPORTS
import cors from "cors" //Used to accept requests from a different origin 
import express from "express"; //Used to create the backend server, create API routes, handle HTTP requests, etc
//const express = require("express"); //imports with no warnings
import path from "path"; //Used to work with file and directory paths

//LOCAL IMPORTS 
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";


//Load the credentials from the .env file to the process.env space
//Lets us access credentials without hardcoding them directly into the code
//Imports all credentials at once 
import dotenv from "dotenv"
dotenv.config();

//Creates a new express application 
const app = express() 

//MIDDLEWARE//

//Runs inbetween the req and res on the backend server
//Aka in the middle of processing an HTTP request 

//CORS allows the API to accept requests from the frontend (a different origin/URL)
//Must be ran firs in the middleware to avoid CORS errors 
//Since in production, we are running frontend and backend from the same origin, it is only needed when not in production
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173", 
    }));
}

//Reads incoming JSON data and converts it into a JavaScript object
//Runs before the routes so that they can access the body/title/content data
app.use(express.json()); 

//Applies the rate limiting to incoming requests
//Checks whether the client has exceeded the allowed number of requests 
app.use(rateLimiter);

//Log Request
//Outputs information about the request 
app.use((req,res,next) => {
    console.log(`NEW ${req.method} REQUEST RECIEVED FROM ${req.url}`); //runs this first before processing the request 
    next();                              //tells the program to continue to process the request (notesRoutes)
});

//Gives all routes the "/api/notes" prefix before any URL specifics 
//For organization and avoid repetition when typing out the URLs
app.use("/api/notes", notesRoutes); 

//Finds the dist folder and runs the frontend react application when in production
// Express 5 requires the wildcard (*) to have a name, splat is the wildcard and it catches all the routes
if(process.env.NODE_ENV === "production"){
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

//Get the port 
const PORT = process.env.PORT; // || number; for a backup port

//Run db.js
//After connecting to the database, the rest of the function will run (.then...)
connectDB().then(() => {

    //Listen on the port for incoming HTTP requests
    app.listen(PORT, () => { console.log("CONNECTED TO PORT", PORT); });
})


