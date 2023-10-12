import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';
const Details = (props) => {
  return (
    <>
    <Head>
      <title>{props.meetup.title}</title>
      <meta title={props.meetup.title} content={props.meetup.description}></meta >
    </Head>
    <MeetupDetails
      title={props.meetup.title}
      image={props.meetup.image}
      description={props.meetup.description}
      address={props.meetup.address}
    />
      </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}@cluster0.bhci9is.mongodb.net/?retryWrites=true&w=majority/meetups`
  );
  const db = await client.db();
  const collection = db.collection("meetups");
  const data = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: data.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    revalidate:1
    
  };
}

export async function getStaticProps(context) {
  const id = context.params.meetupId;
  // console.log(id)
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_USERNAME}:${process.env.NEXT_PASSWORD}@cluster0.bhci9is.mongodb.net/?retryWrites=true&w=majority/meetups`
  );
  const db = await client.db();
  const collection = db.collection("meetups");
  const data = await collection.findOne({ _id: new ObjectId(id) });
  //  console.log(data)

  client.close();

  return {
    props: {
      meetup: {
        id: data._id.toString(),
        title: data.title,
        description: data.description,
        image: data.image,
        address: data.address,
      },
    },
    revalidate:1
    
  };
}

export default Details;
