import express from "express"; //imports the express
//const express = require("express"); //imports with no warnings

const app = express() //create new express app


app.get("/api/notes", (req,res) => {
    res.send("you got 5 notes");
});

//listen on a port
app.listen(5001, () => { console.log("PORT 5001"); });
