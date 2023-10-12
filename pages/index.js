import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";





const Home = (props)=> {

  return <>
  <Head>
    <title>My Meetup</title>
    <meta title='my meetups' content="find any meetup nearby you"></meta>
  </Head>
  <MeetupList meetups={props.data} />
  </>
}

export async function getStaticProps(){
  const client = await MongoClient.connect(`mongodb+srv://${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}@cluster0.bhci9is.mongodb.net/?retryWrites=true&w=majority/meetups`)
    const db =  await client.db()
    const collection = db.collection('meetups')
   const data = await collection.find({}).toArray()
  //  console.log(data)
   client.close()
   return {
     props:{
       data:data.map((meetup)=>({
        id:meetup._id.toString(),
        title:meetup.title,
        image:meetup.image,
        description:meetup.description,
        address:meetup.address
      }))
     }
   }
}



export default Home;