import MeetupList from "../components/meetups/MeetupList";
import clientConnect from "../lib/mongodb";

export default function Home(props) {
    return (
        <MeetupList meetups={props.meetups}/>
    )
}

export async function getServerSideProps(context){
    const client = await clientConnect();
    const db           = await client.db("meetups");
    const collection   = await db.collection("meetups").find({}).toArray();
    return {
        props : {
            meetups : collection.map(mp => {
                const da = {...mp,id:mp._id.toString()};
                delete da._id;
                return da;
            })
            // meetups : DUMMY_MEETUPS
        }
    }
}