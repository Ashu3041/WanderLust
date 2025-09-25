import mongoose from "mongoose";
import data from "./data.js";
import Listing from "../models/listing.js";


// DATABASE
async function main() {
    await mongoose.connect("mongodb+srv://Ashutosh:Ashu@cluster1.7wfek9d.mongodb.net/Project1?retryWrites=true&w=majority&appName=Cluster1");
};

main().then(()=>{
    console.log("Connected to DB🎉✅");
}).catch(err=>{
    console.log(err);
    console.log("DB not Connected ❌")
});


const initDB=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(data.data);
    console.log("Data Was Initialized");
};

initDB();
