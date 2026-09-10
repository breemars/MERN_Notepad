import ratelimit from "../config/upstash.js";

//Limits how frequently clients can make requests
const rateLimiter = async (req,res,next) => {

    try {
        //Asks the rate limiter whether this request is allowed
        const {success} = await ratelimit.limit("my-limit-key"); //place holder for user ID, normally it should be applied per user
    
        //Client has exceeded the allowed number of requests and return
        if(!success){
            return res.status(429).json({
                message:"TOO MANY REQUESTS"
            });
        }

        //If successful, continue processing the request
        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    } 
};

export default rateLimiter;