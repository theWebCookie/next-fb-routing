export default function handler(req, res) {
  const { method, body, query } = req;
  if (method === 'POST') {
    const { email, name, text } = body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid data.' });
      return;
    }

    const newComment = {
      id: new Date().toISOString,
      email,
      name,
      text,
    };
    res.status(200).json({ comment: newComment });
  } else if (method === 'GET') {
    const mockList = [
      { id: 'c1', name: 'User', text: 'First' },
      { id: 'c2', name: 'User', text: 'Seccond' },
      { id: 'c3', name: 'User', text: 'Third' },
    ];
    res.status(200).json({ comments: mockList });
  }
}
