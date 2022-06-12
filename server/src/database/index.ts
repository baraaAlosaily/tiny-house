import * as mongoDB from "mongodb";
import { Database } from "../lib/type";

const user=process.env.DB_USER;
const password=process.env.DB_PASSWORD;
const dbName=process.env.DB_DBNAME;
const cluster=process.env.DB_CLUSTER;

const url=`mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

export const connectDataBase= async():Promise<Database>=>{

    const client: mongoDB.MongoClient = await new mongoDB.MongoClient(url,{useNewUrlParser: true,useUnifiedTopology: true} as mongoDB.ConnectOptions);
           
    await client.connect();
        
    const db: mongoDB.Db = client.db('tinyHouse');
   
    return {
        listings:db.collection('houses'),
    };

}