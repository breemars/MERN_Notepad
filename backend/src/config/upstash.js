import {Ratelimit} from "@upstash/ratelimit"; //Used to create and configure a rate limiter
import {Redis} from "@upstash/redis";         //Used to store and track the number of requests made by users

//Load the credentials from the .env file to the process.env space
//Lets us access credentials without hardcoding them directly into the code
//Despite running it once in server.js, that is not being executed before this initializes, so it needs to be here too 
import dotenv from "dotenv";
dotenv.config(); 

//Create a new rate limiter
//Allows 100 requests per 60 secs
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), //Gets the credentials from process.env
    limiter: Ratelimit.slidingWindow(100, "60 s"), //Define the type of rate limter
});

export default ratelimit; 