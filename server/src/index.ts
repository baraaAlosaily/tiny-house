import express from "express";
import bodyParser from "body-parser";
import { listings } from "./listings";
const app=express();
const PORT=process.env.PORT||3000;

app.use(bodyParser.json());

const one=1;
const two=2;

app.get("/",(_req,res)=>{
    res.send(`${one}+${two}=${one+two}`);
})

app.get("/api/listings",(_req,res)=>{ 
   return res.json(listings);
})

app.post("/api/listings",(req,res)=>{
    const id:string=req.body.id;
    for (let i = 0; i < listings.length; i++) {
       if(listings[i].id===id){
           return res.send(listings.splice(i,1));
       }
    }
    res.send("failed");
})

app.listen(PORT,()=>{
    console.log(`you app connected to ${PORT}`);
})
 