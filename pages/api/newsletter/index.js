import { connectDB, insertDocument } from '@/helpers/db-utils';
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { method, body } = req;
  if (method === 'POST') {
    const email = body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'newsletter', { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    res.status(200).json({ message: 'Signed Up!' });
  }
}
