import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default async function connectToMongo() {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🌀 connected to MongoDB');
    return (await mongoClient.connect()).db('DingaShop');
  } catch (err) {
    console.log(err);
    return err;
  }
}

const db = await connectToMongo();

export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
export const productsCollection = db.collection('products');
