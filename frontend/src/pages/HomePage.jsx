//import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import RateLimitedUI from "../components/RateLimitedUI"
import toast from 'react-hot-toast'
import api from "../lib/axios"

const HomePage = () => {

    {/* States - when a change is detected, the browser will re-render */}
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    {/* Effects - Actions like getting data or listening for events (some external system) that automatically start on render */}
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                {/* ALT WAY: const res = await fetch("https://localhost:5001/api/notes") */}
                {/* const data = await res.json() */}

                const res = await api.get("/notes")
                
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)
            } catch (error) {
                console.log("Error fetching notes")
                console.log(error)
                if(error.response?.status == 429){
                    setIsRateLimited(true)
                } else {
                    toast.error("Failed to Load Notes")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchNotes();
    }, [])
    
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* If rate limited, show the pop up component */}
            {isRateLimited && <RateLimitedUI />}

        
            <div className="max-w-7xl mx-auto p-4 mt-6">
                
                {/* Loading text */}
                {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
                
                {/* Display notes cards */}
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Map all the notes to NotesCard components */}
                        {notes.map((note) => (           
                            <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage