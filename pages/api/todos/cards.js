'use strict';
import { connectToDatabase } from '../../../lib/mongodb';
import { saveTodo } from '../../../lib/mongolib';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      await saveTodo(JSON.parse(req.body));
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route only accepts POST requests' });
  }
  const todosDB = await db.collection('todos').find().toArray();
  res.status(200).json(todosDB);
};
