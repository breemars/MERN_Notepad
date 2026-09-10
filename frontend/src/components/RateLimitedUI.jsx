import { ZapIcon } from "lucide-react";

//Displays a message when the rate limit has been reached
const RateLimitedUI = () => {
  return (
    <div className="max-w-2xl mx-auto p-8"> {/* Shrink Width and Center Horizontally */}
      <div className="bg-primary/15 border-2 border-primary/30 rounded-lg shadow-md"> {/* Faded Green BG */}
        <div className="flex flex-col md:flex-row items-center p-4"> {/* Makes 2 cols for large screens, one for small */}
          
          <div className="bg-amber-300/40 p-4 border-2 border-primary/50 rounded-full md:mb-0 md:mr-6"> {/* md:mr-6 = medium and larger, add right margin */}
            <ZapIcon className="size-12 text-black" />
          </div>
          
          <div className="flex-1 text-center md:text-left"> {/* flex-1 = take up remaining space in flexbox */}
            <h3 className="text-xl font-bold mb-1">Rate Limit Reached</h3>
            <p className="text-base-content mb-1">
              You've made too many requests in a short period. 
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds.
            </p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;