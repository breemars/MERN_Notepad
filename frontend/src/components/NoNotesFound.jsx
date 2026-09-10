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
      
      <div className="bg-amber-300/60 border-4 border-black rounded-full p-8 ">
        <NotebookIcon className="size-10 text-black" />
      </div>
      
      <h3 className="text-2xl font-bold">No Notes Yet</h3>
      

      <Link to="/create" className="btn btn-secondary border-black/60 border-2">
        Create Your First Note
      </Link>
    
    </div>
  );
};
export default NoNotesFound;