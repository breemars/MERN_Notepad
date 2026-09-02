import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const NoteDetailPage = () => {

  {/* Keep track of user input */}
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true); //this is important to make sure we have all the information before attempting to display it

  const navigate = useNavigate();

  const { id } = useParams(); //gets the id from the URL

  console.log({id})

  {/* Send a GET request to get all the note details */}
  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        console.log("RAN")
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to Fetch the Note")
      } finally {
        setLoading(false);
      }
    };

    fetchNote(); //run the function right away
  }, [id]);

  console.log(note)

  const handleDelete = async () => {
    //console.log("FUNC");
    
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  {/* Try to send a request to the API */}
    const handleSave = async () => {
      
      console.log(!note.title.trim())
        if (!note.title.trim() || !note.content.trim()) {
          toast.error("Please add a title or content");
          //e.preventDefault();
          return;
        }

        setSaving(true);

        try {
          await api.put(`/notes/${id}`, note);
          toast.success("Note updated successfully");
          navigate("/");
        } catch (error) {
          console.log("Error saving the note:", error);
          toast.error("Failed to update note");
        } finally {
          setSaving(false);
        }
  };

  {/* Shows spinning wheel when loading the note details */}
  if (loading) {
      return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>
      );
  }
  

  {/* HTML */}
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Back button */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button className="btn btn-error btn-outline" onClick={() => handleDelete()}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100/40">
            <div className="card-body">

              {/* Title */}
              <h2 className="card-title text-2xl">Edit Note</h2>
              
              {/* FORM, we dont do onsubmit here bc using a button is honestly better */}
              <form>

                {/* Note Title */}
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