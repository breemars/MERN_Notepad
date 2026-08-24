import Note from "../models/Note.js";

export async function getAllNotes(_,res) { //skip 'req' bc it is not used
    try {
        const notes = await Note.find().sort({createdAt: -1}); //newest first (desc order)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal server error"});
    }

};

export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id);

        //give a specific error message if its not found
        //still must be a 24 character hex string, 12 byte Uint8Array, or an integer
        if(!note) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json(note);
    } catch (error) {
        console.error("Error finding note", error);
        res.status(500).json({message:"Internal server error"});
    }

};

export async function createNote(req,res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        console.log(title, content);

        await newNote.save();
        res.status(201).json({message: "note created successfully", title});
    } catch (error) {
        console.error("ERROR creating note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};

export async function updateNote(req,res) {
    try {
        const {title,content} = req.body;
        const result = await Note.findByIdAndUpdate(req.params.id, {title, content});
        
        //give a specific error message if its not found
        //still must be a 24 character hex string, 12 byte Uint8Array, or an integer
        if(!result) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json({message: "note updated successfully", title});
    } catch (error) {
        console.error("ERROR updating note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};

export async function deleteNote(req,res) {
    try {
        const result = await Note.findByIdAndDelete(req.params.id);
        
        //give a specific error message if its not found
        //still must be a 24 character hex string, 12 byte Uint8Array, or an integer
        if(!result) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json({message: "note deleted successfully"});
    } catch (error) {
        console.error("ERROR deleting note", error);
        res.status(500).json({message:"Internal server error"});        
    }
};