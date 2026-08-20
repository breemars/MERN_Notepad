import mongoose from "mongoose";

//Schema
const noteSchema = new mongoose.Schema(
{
    title: {type: String, required: true},
    content: {type: String, required: true}
},
{ timestamps: true} //timestamps makes created and updated dates and times 
);

//Model
const Note = mongoose.model("Note", noteSchema);

export default Note;