// import { MongoClient } from "mongodb";
// import 'dotenv/config';
import mongoose from "mongoose";

// const client = new MongoClient(process.env.MONGODB_URI);

export const connectDB = url => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    dbName: 'padrinos',
  })
}

// const run = async() => {
//   try {
//     const database = client.db('padrinos');
//     const users = database.collection('user');

//     const query = { name: 'Ada Lovelace' };
//     const user = await users.findOne(query);

//     console.log(user);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// } 

// run();