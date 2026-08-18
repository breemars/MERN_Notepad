import express from "express"; //imports the express
//const express = require("express"); //imports with no warnings

const app = express() //create new express app

import notesRoutes from "./routes/notesRoutes.js"
app.use("/api/notes", notesRoutes); //adds a prefix that will be applied before any specifics for the URL

//listen on a port
app.listen(5001, () => { console.log("PORT 5001"); });
