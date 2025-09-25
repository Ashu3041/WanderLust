const express = require("express");
const mongoose = require("mongoose");
const Listing = require( "./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require( "./utils/ExpressError.js");
const dotenv = require( "dotenv");
dotenv.config();



// PORT CONNECTION
const PORT=process.env.PORT || 8080;

const MONGO_URI= process.env.MONGO_URI

const app=express();

// MODDLEWARES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));



app.set("view engine","ejs");


app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));


app.engine("ejs",ejsMate);



// // DATABASE
async function main() {
    await mongoose.connect(MONGO_URI);
}

main().then(()=>{
    console.log("Connected to DB🎉✅");
}).catch(err=>{
    console.log(err);
    console.log("DB not Connected ❌")
});

// ROUTES

app.get("/",(req,res)=>{
    console.log("Hi It is Working");
    res.send("Hello");
});


//Index Route


app.get("/listings",wrapAsync(async (req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index",{allListings});
}));


//New Route

app.get("/listings/new",(req,res)=>{
    res.render("listings/new");
});



//Show Route

app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const List=await Listing.findById(id);
    res.render("listings/show",{List});
}));


//Create Routes


app.post("/listings",wrapAsync(async(req,res)=>{
    // try{
    // let{title,description,price,location,country,image}=req.body;
    // let List=new Listing({
    // title,
    // description,
    // price,
    // location,
    // country,
    // image
    // });

    // await List.save();


    // let Data=req.body.listing;
    // let List=new Listing(Data);
    // await List.save();


    const List=new Listing(req.body.listing);
    await List.save();
    console.log(List);
    res.redirect("/listings");
    console.log("New List Added 👨‍💻");
    // }catch(err){
    //     console.log(err);
    //     next(err);
    // } 
}));

//Edit


app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const List=await Listing.findById(id);
    res.render("listings/edit",{List});
}));

// Update Route


app.put("/listings/:id",wrapAsync(async (req,res)=>{
    try{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    
    res.redirect("/listings");
    console.log("List Updated ☝️");
    }catch(err){
        console.log(err);
    } 
}));

// Delete Route


app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    try{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    
    res.redirect("/listings");
    console.log("List Delete 😈");
    }catch(err){
        console.log(err);
    } 
}));



// // FOR ALL RESPONSE
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page Not Found"));
// });


// CUSTOM MIDDLEWARE
app.use((err,req,res,next)=>{
    let {statusCode,message}=err;
    res.status(statusCode).send(message);
});



app.listen(PORT,()=>{
    console.log(`App is Listening to http://localhost:${PORT}`);
    
});