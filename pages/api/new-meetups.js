import {MongoClient} from 'mongodb';

async function postMeetups(req,res){
    if(req.method === 'POST'){
        console.log('triggred')
  
    
    const client = await MongoClient.connect('mongodb+srv://pramodsinghthakur0591:ZUVgHFvp81LBdUkq@cluster0.bhci9is.mongodb.net/?retryWrites=true&w=majority/meetups')
          const db = await client.db()
  
          const collection  = await db.collection('meetups')
          await collection.insertOne(req.body)
          
          console.log(res.status)
          client.close()
          res.status(201).json({message:'data posted successfully'})
        }   
  }

export default postMeetups;