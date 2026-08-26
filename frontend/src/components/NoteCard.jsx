import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from "lucide-react";
{/* Needs the {} since it is an export function */}
import { formatDate } from "../lib/dateFormatter.js" 

const colors = ["amber-200", "pink-500", "cyan-300", "indigo-500"]


const NoteCard = ({note}) => {
    const randomHoverColor = colors[Math.floor(Math.random() * colors.length)];

    

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
        border-${randomHoverColor}
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

    
                    <button className="btn btn-ghost btn-xs text-error p-1.5">
                    {/* onClick={(e) => handleDelete(e, note._id)} */}
                    
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>


    </Link>
  )
}

export default NoteCard