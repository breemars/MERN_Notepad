//Import Mongoose
//Mongoose makes it easy to connect to MongoDB
import mongoose from "mongoose";

//Create an function to be used in server.js
//Function is async so we can wait until the connection is made 
export const connectDB = async() => {

    try{
        //Try to connect to the MongoDB database using the credentials in the env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED");
    
    } catch(error) {

        //Failed to connect to the databse
        console.error("ERROR CONNECTING TO MONGODB", error);
        process.exit(1); //Stops the application with an exit code of 1 (failure) 
    }
};