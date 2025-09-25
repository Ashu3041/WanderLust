const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String, 
        required:true
        },
    description:String,
    image:{
        filename:
        {type:String,
         default:"https://unsplash.com/photos/close-up-of-a-person-in-warm-textured-clothing-dK65jJX1CR0",
                set:(v)=>
                v===""
                    ?"https://unsplash.com/photos/close-up-of-a-person-in-warm-textured-clothing-dK65jJX1CR0"
                    :v
        },url: {
                type: String,
                default: "https://unsplash.com/photos/close-up-of-a-person-in-warm-textured-clothing-dK65jJX1CR0"
                }
    },
    price:Number,
    location:String,
    country:String
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;