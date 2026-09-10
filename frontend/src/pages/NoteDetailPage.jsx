import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router"; //useParams: gets dynamic values from the URL
import api from "../lib/axios";

//Displays all of the details of the note
//The user can make changes to the title or content here too
const NoteDetailPage = () => {

  {/* Keep track of user input */}
  const [note, setNote] = useState(null); //Store the note we are currently editing/viewing
  const [saving, setSaving] = useState(false); //Keeps track of whether changes are saving
  const [loading, setLoading] = useState(true); //Keeps track of whether we are loading information from the database 
  //"Loading" is important to make sure we have all the information before attempting to display it
  //Initially true as we need to load the note when the page is rendered

  //Used to navigate back to homepage when needed
  const navigate = useNavigate();

  const { id } = useParams(); //Gets the id from the URL (as defined in the route path in App.jsx)

  {/* Send a GET request to get all the note details */}
  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`) //Get the data from the backend
        setNote(res.data) //Store the note's data 

      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to Fetch the Note")

      } finally {
        setLoading(false) //Finished loading the note
      }
    };

    fetchNote(); //Run the function right away when the component first loads

  }, [id]); //The effect depends on id, so if id changes, it will run it again


  {/* Delete the current note */}
  const handleDelete = async () => {
    
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/"); //Back to the homepage 

    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  {/* Save / Update the note with a PUT request to the API */}
    const handleSave = async () => {
      
        //Makes sure both fields contain text
        if (!note.title.trim() || !note.content.trim()) {
          toast.error("Please add a title or content");
          return;
        }

        setSaving(true); //Disables the save button

        //Try to send the updated note to the backend
        try {
          await api.put(`/notes/${id}`, note);
          toast.success("Note updated successfully");
          navigate("/"); //back to the homepage 

        } catch (error) {
          console.log("Error saving the note:", error);
          toast.error("Failed to update note");

        } finally {
          setSaving(false);
        }
  };

  {/* Shows spinning wheel when loading the note details instead of the note fields*/}
  if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10 text-black" />
        </div>
      );
  }
  

  {/* UI */}
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          
          <div className="flex items-center justify-between mb-6"> 

            {/* Back button (to Homepage) */}
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>

            {/* Delete button */}
            <button className="btn btn-error" onClick={() => handleDelete()}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>

          </div>

          <div className="card bg-base-100/40">
            <div className="card-body">

              {/* Title */}
              <h2 className="card-title text-2xl">Edit Note</h2>
              
              {/* FORM, we dont do onSubmit here and using onClick is honestly better, the form will not automatically reload */}
              <form>

                {/* Note Title */}
                {/* ...note copies all note properties, then "title:" only changes the title */}
                {/* e.target.value is the new title value */}
                <fieldset className="fieldset">
                  <label className="fieldset-legend text-xl">title</label>
                  <input type="text" placeholder="new title goes here..." className="input input-bordered bg-amber-50 text-black input-lg w-auto" 
                    value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                </fieldset>

                {/* Note Body */}
                <fieldset className="fieldset mb-4">
                  <label className="fieldset-legend text-xl">content</label>
                  <textarea type="text" placeholder="edit your note here..." className="textarea textarea-bordered h-40 bg-amber-50 text-black w-auto" 
                    value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })}/>
                </fieldset>

                {/* Create Note Button */}
                {/* Button is disabled while saving */}
                <div className="card-actions justify-end mt-4">
                  <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}> 
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};
export default NoteDetailPage;