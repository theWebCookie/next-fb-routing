import { connectDB, getAllDocuments, insertDocument } from '@/helpers/db-utils';

export default async function handler(req, res) {
  const { method, body, query } = req;
  const eventId = query.eventId;
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

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

    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;

      res.status(200).json({ comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Adding comment failed!' });
    }
  } else if (method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId: eventId });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }
  client.close();
}
