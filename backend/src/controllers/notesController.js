import Note from "../models/Note.js";

//GET request for all notes
export async function getAllNotes(_,res) { //use "_" instead of "req" bc it is not used
    try {
        //Find all the notes
        const notes = await Note.find().sort({createdAt: -1}); //Sorted by newest first (desc order)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }

};

//GET request for one note
export async function getNoteById(req,res) {
    try {

        //Find the note based on the ID from the URL
        const note = await Note.findById(req.params.id);

        //Throws a specific error message if its not found
        //The ID still must be a 24 character hex string, 12 byte Uint8Array, or an integer for this to run
        if(!note) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json(note);
    } catch (error) {
        console.error("Error finding note", error);
        res.status(500).json({message:"Internal server error"});
    }

};

//POST request for creating a new note
export async function createNote(req,res) {
    try {
        const {title, content} = req.body; //Extract the title and content from the request's body
        const newNote = new Note({title, content}); //Create a new note (locally)
        console.log(title, content);

        await newNote.save(); //Save the note to MongoDB
        res.status(201).json({message: "note created successfully", title});
    
    } catch (error) {
        console.error("ERROR creating note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};

//PUT request for updating a note
export async function updateNote(req,res) {
    try {
        const {title,content} = req.body; //Extract the title and content from the request's body
        const result = await Note.findByIdAndUpdate(req.params.id, {title, content}); //Find the note by ID and updates it
        
        //Throws a specific error message if its not found
        //The ID still must be a 24 character hex string, 12 byte Uint8Array, or an integer for this to run
        if(!result) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json({message: "note updated successfully", title});
    
    } catch (error) {
        console.error("ERROR updating note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};

//DELETE request for deleting a note
export async function deleteNote(req,res) {
    try {
        const result = await Note.findByIdAndDelete(req.params.id); //Find the note by ID and deletes it
        
        //Throws a specific error message if its not found
        //The ID still must be a 24 character hex string, 12 byte Uint8Array, or an integer for this to run
        if(!result) return res.status(404).json({message: "Note not found"});
         
        res.status(200).json({message: "note deleted successfully"});
    
    } catch (error) {
        console.error("ERROR deleting note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};