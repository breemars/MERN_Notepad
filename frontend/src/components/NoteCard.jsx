import { Link } from 'react-router' //Navigate to another route without completely reloading the page, different from an HTML link
import { PenSquareIcon, Trash2Icon } from "lucide-react"; //Icons
{/* Needs the {} around "formatDate" since it is an export function */}
import { formatDate } from "../lib/dateFormatter.js" 
import api from "../lib/axios"
import toast from 'react-hot-toast'

//Array of border colors to randomly choose from 
const colors = ["border-amber-200", "border-pink-500", "border-cyan-300", "border-indigo-500"]

//Recieves 2 props: note - the note object, setNotes - update function from the home page 
const NoteCard = ({note, setNotes}) => {
    

    //DELETE NOTE
    //e: the browser's click event
    //id: id of the note to delete
    const handleDelete = async (e, id) => {
        e.preventDefault(); // the entire notecard is a link, this stops that navigation behaviour

        if (!window.confirm("Are you sure you want to delete this note?")) return; //returns if they select no, will continue otherwise

        try {
            await api.delete(`/notes/${id}`); //Send the DELETE request to the backend
            
            // Refreshes the UI to show that the note has been removed:
            //  get all prev notes (most recent value of notes) => 
            //         create a new array and filter out the note to delete by(get all notes => 
            //              where id is NOT the deleted note's id)
            // updating the state causes HomePage to re-render, redisplaying all the notecards
            setNotes((prev) => prev.filter((note) => note._id !== id)); 
            
            toast.success("Note Deleted Successfully");
        
        } catch (error) {
            console.log("Error Deleting Note", error);
            toast.error("Failed to Delete Note");
        }
    };

    
    //Choose a border color for the current note
    const randomHoverColor = colors[Math.floor(Math.random() * colors.length)];


//Entire notecard is wrapped in a router link to the individual note's detail page
  return (
    <Link to={`/note/${note._id}`} 
    className={`
        card 
        bg-base-100/40
        shadow-lg 
        transition-all 
        duration-200 
        border-t-4 
        border-solid 
        ${randomHoverColor}
        hover:border-white
        hover:shadow-none
        hover:bg-base-100/50
        `}>

        
            
        <div className="card-body">

            <h3 className="card-title text-base-content text-2xl font-bold">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    
                    <button className="btn btn-ghost btn-xs p-1.5">
                        <PenSquareIcon className="size-4" />
                    </button>

                    <button className="btn btn-ghost btn-xs text-error p-1.5"
                        onClick={(e) => handleDelete(e, note._id)}>
                        {/* onClick recieves a callback function to run when a user clicks on the delete icon */ }
                        <Trash2Icon className="size-4" />
                    </button>

                </div>
            </div>
        </div>


    </Link>
  )
}

export default NoteCard