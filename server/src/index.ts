import dotenv from "dotenv";
dotenv.config();
import express,{Application}from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDataBase } from "./database";
import { typeDefs,resolvers } from "./graphql";

const app=express();
const PORT=process.env.PORT||3000;

const mount =async(app :Application)=>{
  
    const db= await connectDataBase();
    const server=new ApolloServer({typeDefs,resolvers,context:()=>({db})});

    server.applyMiddleware({app,path:"/api"});
    app.listen(PORT)
    
    console.log(`[app] //localhost:${PORT}`);

    const listings=await db.listings.find({}).toArray();

    console.log(listings); 
}

mount(app);




