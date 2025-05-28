import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017/";
const options = {};

async function clientConnect(){
    if(!global._mongoClientPromise){
        const client = new MongoClient(uri,options);
        await client.connect();
        global._mongoClientPromise = client;
    }
    return global._mongoClientPromise;
}

export default clientConnect;