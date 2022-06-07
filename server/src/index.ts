import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";

const app=express();
const PORT=process.env.PORT||3000;


const server=new ApolloServer({schema});

server.applyMiddleware({app,path:"/api"});


app.listen(PORT)

console.log(`[app] //localhost:${PORT}`);
 