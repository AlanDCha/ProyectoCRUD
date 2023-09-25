import { MongoClient } from "mongodb";
import 'dotenv/config';

const client = new MongoClient(process.env.MONGODB_URI);

const run = async() => {
  try {
    const database = client.db('padrinos');
    const users = database.collection('user');

    // * Query for a something
    const query = { name: 'Ada Lovelace' };
    const user = await users.findOne(query);

    console.log(user);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
} 

run();