'use strict';
import { connectToDatabase } from '../../lib/mongodb';
import { todosList, saveTodo, deleteTodos } from '../../lib/mongolib';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let todos = [];
  switch (req.method) {
    case 'DELETE':
      await deleteTodos(JSON.parse(req.body));
      todos = await todosList();
      break;
    case 'GET':
      todos = await todosList();
      break;
    case 'POST':
      await saveTodo(JSON.parse(req.body));
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route only accepts POST requests' });
  }
  todos = await todosList();
  res.status(200).json({ todos });
};
