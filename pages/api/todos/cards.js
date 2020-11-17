'use strict';
import { connectToDatabase } from '../../../lib/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'GET':
      const todosDB = await db.collection('todos').find().toArray();
      res.status(200).json(todosDB);
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route only accepts POST requests' });
  }
};
