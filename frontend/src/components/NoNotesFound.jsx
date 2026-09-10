import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

//Displays a message when there are no notes created yet
const NoNotesFound = () => {
  return (
    // Main container for the "no notes" message. 
    // // flex -> enables Flexbox 
    // // flex-col -> puts children vertically 
    // // items-center -> centers children horizontally 
    // // justify-center -> centers children vertically 
    // // py-16 -> adds vertical padding 
    // // space-y-6 -> adds spacing between child elements 
    // // max-w-md -> limits the width of the content 
    // // mx-auto -> centers the container horizontally 
    // // text-center -> centers the text
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold">No notes yet</h3>
      
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      
      <Link to="/create" className="btn btn-primary">
        Create Your First Note
      </Link>
    
    </div>
  );
};
export default NoNotesFound;