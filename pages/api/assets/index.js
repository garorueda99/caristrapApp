import { connectToDatabase } from '../../../lib/mongodb';
export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'This route only accepts POST requests' });
  }
  const result = await db.collection('assets').insertOne(JSON.parse(req.body));
  res.json({ ok: true });
};
