import { MongoClient } from 'mongodb';
export const connectDB = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kefqvdm.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
