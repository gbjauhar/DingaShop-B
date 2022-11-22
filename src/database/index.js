import pkg from 'mongodb';
import dotenv from 'dotenv';

const { MongoClient } = pkg;

dotenv.config();

export default async function connectToMongo() {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
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
