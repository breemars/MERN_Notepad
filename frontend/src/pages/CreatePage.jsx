import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {

  {/* Keep track of user input */}
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  {/* Runs once they submit the form */}
  const handleSubmit = async (e) => {
    
    {/* Stops the page from refreshing on click */}
    e.preventDefault();

    {/* Ensure the fields are filled */}
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    {/* Try to send a request to the API */}
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");

      {/* Back to the home page */}
      navigate("/");

    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });

      } else {
        toast.error("Failed to create note");
      }

    } finally {
      setLoading(false);
    }
  };

  {/* HTML */}
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          
          {/* Back button */}
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100/40">
            <div className="card-body">

              {/* Title */}
              <h2 className="card-title text-2xl">Create New Note</h2>
              
              {/* Once the user submits the form, call handleSubmit */}
              <form onSubmit={handleSubmit}>

                {/* Note Title */}
                <fieldset class="fieldset">
                  <label class="fieldset-legend text-xl">title</label>
                  <input type="text" placeholder="note title goes here..." class="input input-bordered bg-amber-50 text-black input-lg w-auto" 
                    value={title} onChange={(e) => setTitle(e.target.value)}/>
                </fieldset>

                {/* Note Body */}

                <fieldset class="fieldset mb-4">
                  <label class="fieldset-legend text-xl">content</label>
                  <textarea type="text" placeholder="write your note here..." class="textarea textarea-bordered h-40 bg-amber-50 text-black w-auto" 
                    value={content} onChange={(e) => setContent(e.target.value)}/>
                </fieldset>

                {/* Create Note Button */}
                <div className="card-actions justify-end mt-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
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
export default CreatePage;