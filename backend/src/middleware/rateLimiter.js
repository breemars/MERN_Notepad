import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) => {

    try {
        const {success} = await ratelimit.limit("my-limit-key"); //place holder for user ID so that it is applied per user
    
        if(!success){
            return res.status(429).json({
                message:"TOO MANY REQUESTS"
            });
        }
        next();
    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    } 
};

export default rateLimiter;