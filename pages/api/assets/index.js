import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'DELETE':
      await db.collection('assets').deleteMany({
        _id: {
          $in: JSON.parse(req.body)['_ids'].map((d) => new ObjectId(d)),
        },
      });
      await db
        .collection('assets')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            res.status(200).json({
              assets: result,
            });
          } else {
            res.status(500).json({ status: 400, message: 'Not found' });
          }
        });
      break;
    case 'POST':
      const result = await db
        .collection('assets')
        .insertOne(JSON.parse(req.body));
      await db
        .collection('assets')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            res.status(200).json({
              assets: result,
            });
          } else {
            res.status(500).json({ status: 400, message: 'Not found' });
          }
        });
      break;
    case 'GET':
      await db
        .collection('assets')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            res.status(200).json({
              assets: result,
            });
          } else {
            res.status(500).json({ status: 400, message: 'Not found' });
          }
        });
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route only accepts POST requests' });
  }

  //   if (req.method !== 'POST' || 'GET') {
  //     return res
  //       .status(405)
  //       .json({ message: 'This route only accepts POST requests' });
  //   }
  //   const result = await db.collection('assets').insertOne(JSON.parse(req.body));
  //   res.json({ ok: true });
};
