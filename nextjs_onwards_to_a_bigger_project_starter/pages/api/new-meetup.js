import clientConnect from "../../lib/mongodb";

async function handler(req,res) {
    if(req.method === "POST"){
        const data  = req.body,
        client      = await clientConnect(),
        db          = await client.db('meetups'),
        collection  = await db.collection('meetups'),
        result      = await collection.insertOne(data);
        
        console.log(result);
        client.close();
        res.status(201).json({message : "Meetup Inserted...!"})
    }
}

export default handler;