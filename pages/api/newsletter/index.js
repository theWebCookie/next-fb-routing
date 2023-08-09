export default function handler(req, res) {
  const { method, body } = req;
  if (method === 'POST') {
    const email = body.email;
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }
    res.status(200).json({ email: email });
  }
}
