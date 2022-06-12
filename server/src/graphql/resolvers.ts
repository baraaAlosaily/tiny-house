import { IResolvers } from "apollo-server-express";
import { Database } from "../lib/type";
import { ObjectId } from "mongodb";

export const resolvers:IResolvers={
    Query:{
        listings:async(_root:undefined,_args:{},{db}:{db:Database})=>{
            return await db.listings.find({}).toArray();
        },
    },
    Mutation:{
        deleteListing:async(_root:undefined,{id}:{id:string},{db}:{db:Database}) =>{

            const deletedItem= await db.listings.findOneAndDelete({_id:new ObjectId(id)});

            if(!deletedItem.value){
                throw new Error("Failed to delete listing");
            }

            return deletedItem.value;
         }
    },
    Listing:{
        id:(listing:any)=>listing._id.toString(),
    }
}