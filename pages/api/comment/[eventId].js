import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const eventId = query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kefqvdm.mongodb.net/events?retryWrites=true&w=majority`
  );

  if (method === 'POST') {
    const { email, name, text } = body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid data.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId;

    res.status(200).json({ comment: newComment });
  } else if (method === 'GET') {
    const db = client.db();
    const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
}
