import express from "express"; //used for HTTP routes and API endpoints 

//Keeping the controller logic in its own seperate file make its easier to organize
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notesController.js"

//Creates a new Express Router instance 
const router = express.Router();  

//Links routes to controller functions 
router.get("/", getAllNotes);  //ex: GET /api/notes -> calls the getAllNotes controller function
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;