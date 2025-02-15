import mongoose from "mongoose";

export const connectDB = async() =>{
    try {
        await mongoose.connect('mongodb+srv://rjayalakshmi901:7SILqBgQcsl6PPXM@cluster0.mmmaj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Learning-Dashboard');
        console.log("db connected sucessfully")
    } catch (error) {
        console.log(error);
    }
}