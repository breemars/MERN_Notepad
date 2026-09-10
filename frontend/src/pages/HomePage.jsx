//useState: stores information that can change over time, the component is re-rendered when it does
//useEffect: actions like getting data or listening for events (some external system) that automatically start on render
import { useEffect, useState } from 'react'
 
import Navbar from "../components/Navbar"
import NoteCard from "../components/NoteCard"
import NoNotesFound from "../components/NoNotesFound"
import RateLimitedUI from "../components/RateLimitedUI"
import toast from 'react-hot-toast'
import api from "../lib/axios"

const HomePage = () => {

    {/* States - when a change is detected to one of these, the browser will re-render */}
    //const [value (ex: true/false boolean), function used to update the value] = useState(starting value)
    const [isRateLimited, setIsRateLimited] = useState(false) //Keeps track of whether the backend has indicated that the user is rate limited
    const [notes, setNotes] = useState([]) //notes is an array, not a boolean. It holds all the notes returned from the database server. It starts off as an empty array.
    const [loading, setLoading] = useState(true) //keeps track of whether we are waiting for an API request to finish, initially set to true as we need to get the notes when it first loads

    {/* Effect - used to get the notes from the backend database */}
    useEffect(() => {
        //Need an async function to use 'await', create an async function inside of useEffect to run: (useEffect shouldn't be async)
        const fetchNotes = async () => {
            try {
                {/* ALT WAY: const res = await fetch("https://localhost:5001/api/notes") */}
                {/* const data = await res.json() */}

                //Send a GET request to our backend
                const res = await api.get("/notes")
                
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false) //Request succeeded
            } catch (error) {
                console.log("Error fetching notes")
                console.log(error)
                if(error.response?.status == 429){ //"?" prevents an error if the error did not include a response/status
                    setIsRateLimited(true) //Rate limited, causes RateLimitedUI component to be displayed
                } else {
                    toast.error("Failed to Load Notes")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchNotes();
    }, [])
    

    //UI


    return (
        //At least as tall as the browser
        <div className="min-h-screen">
            
            <Navbar />

            {/* If rate limited, show the pop up component */}
            {isRateLimited && <RateLimitedUI />}

            { /* max-w-7xl limits the width, mx-auto centers the container, p-4 padding, mt-6 top margin */ }
            <div className="max-w-7xl mx-auto p-4 mt-6">
                
                {/* Loading text */}
                {loading && <div className="text-center text-primary py-10">Loading Notes...</div>}
                
                {/* No Notes text */}
                {notes.length === 0 && !isRateLimited && !loading && <NoNotesFound />}
                
                {/* Display notes cards */}
                { /* grid: mobile 1 col, med 2 cols, large screens 3 cols / gap-6 = spacing */ }
                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Map all the notes to NotesCard components */}
                        {/* _id = the id that MongoDB made, note = pass the entire note obj, setNote = passes the updating function so that NoteCard can update the note's state */}
                        {notes.map((note) => (           
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage