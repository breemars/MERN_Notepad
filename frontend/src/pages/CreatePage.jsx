import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router"; //useNavigate: Used to change the current route/URL using JS
import api from "../lib/axios";

const CreatePage = () => {

  {/* STATES - Keep track of user input */}
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  //This is a React Hook 
  //It establishes the connection to the router when the component renders
  //It needs to be called within the react component, not a function
  const navigate = useNavigate();

  {/* Runs once they submit the form */}
  const handleSubmit = async (e) => {
    
    {/* Stops the FORM from refreshing on click, forms automatically do this, BUTTONS DO NOT */}
    e.preventDefault();

    {/* Ensure the fields are filled */}
    //trim removes whitespace from beginning and end
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    //At this point, display the loading message to the user
    setLoading(true);

    {/* Try to send a POST request to the backend API */}
    try {
      await api.post("/notes", {title, content});

      toast.success("Note created successfully!");

      {/* Back to the home page after a successful creation*/}
      navigate("/");

    } catch (error) {
      console.log("Error creating note", error);

      //Rate Limited
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });

      } else {
        toast.error("Failed to create note");
      }

    } finally {
      //Finished Loading 
      setLoading(false);
    }
  };

  {/* UI */}
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8"> {/* Container = responsive width container / mx-auto = center the element */}
        <div className="max-w-2xl mx-auto">
          
          {/* Back button (to HomePage) */}
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
                <fieldset className="fieldset">
                  <label className="fieldset-legend text-xl">title</label>
                  <input type="text" placeholder="note title goes here..." className="input input-bordered bg-amber-50 text-black input-lg w-auto" 
                    value={title} onChange={(e) => setTitle(e.target.value)}/>
                    {/* Updates the title var that is defined only on create page. if the user gets out of the page, the local vars are not submitted to the database and reset back to "" */}
                </fieldset>

                {/* Note Body */}
                <fieldset className="fieldset mb-4">
                  <label className="fieldset-legend text-xl">content</label>
                  <textarea type="text" placeholder="write your note here..." className="textarea textarea-bordered h-40 bg-amber-50 text-black w-auto" 
                    value={content} onChange={(e) => setContent(e.target.value)}/>
                </fieldset>

                {/* Create Note Button */}
                <div className="card-actions justify-end mt-4">
                  {/* "type = submit" tells the browser that this button submits the form */}
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