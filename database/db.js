import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection=()=>{
    const DB_URI=`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-0a703mj-shard-00-00.cklnwsc.mongodb.net:27017,ac-0a703mj-shard-00-01.cklnwsc.mongodb.net:27017,ac-0a703mj-shard-00-02.cklnwsc.mongodb.net:27017/?ssl=true&replicaSet=atlas-mqwi93-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        mongoose.connect(DB_URI,{useNewUrlParser: true});
        console.log(`Database connected successfully`);
    }catch(error){
        console.log("Error while connecting with the database ",error.message);
    }
}

export default  Connection;