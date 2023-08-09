import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === 'POST') {
    const email = body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kefqvdm.mongodb.net/events?retryWrites=true&w=majority`
    );
    const db = client.db();
    await db.collection('newsletter').insertOne({ email: email });
    client.close();

    res.status(200).json({ message: 'Signed Up!' });
  }
}
