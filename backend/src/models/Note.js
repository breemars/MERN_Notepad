import mongoose from "mongoose";

//Schema
//Defines the structure for "notes" stored in MongoDB
//Every note will have: title, content, createdAt (automatically added), updatedAt (automatically added)
//Notes without titles or content will be rejected
const noteSchema = new mongoose.Schema(
{
    title: {type: String, required: true},
    content: {type: String, required: true}
},
{ timestamps: true} //Timestamps makes the createdAt and updatedAt dates and times fields, MongoDB will automatically maintain these
);

//Model
//Provides the interface we use to interact with MongoDB
//Enables function calls like Note.find() 
const Note = mongoose.model("Note", noteSchema);

export default Note;