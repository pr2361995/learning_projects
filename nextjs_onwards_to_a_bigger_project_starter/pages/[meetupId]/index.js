import React, { Fragment } from 'react'
import MeetUpDetail from '../../components/meetups/MeetUpDetail';
import clientConnect from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

function MeetUpDetailPage(props) {
  return (
    <MeetUpDetail {...props}/>
  )
}

export async function getStaticPaths(){
    const client = await clientConnect();
    const db           = await client.db("meetups");
    const collection   = await db.collection("meetups").find({},{_id:1}).toArray();
    return {
        fallback : true,
        paths : collection.map(id => ({
            params : {
                meetupId : id.toString()
            }
        }))
    }
}

export async function getStaticProps({params}){
    const client = await clientConnect();
    const db           = await client.db("meetups");
    const collection   = await db.collection("meetups").find({_id: ObjectId.createFromHexString(params.meetupId)}).toArray();
    const pass = {...collection[0],id:collection[0]._id.toString()}
    delete pass._id
    return {
        props : pass ,
    }
}

export default MeetUpDetailPage