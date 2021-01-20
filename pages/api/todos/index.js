'use strict';
import { todosList, saveTodo, deleteTodos } from '../../../lib/mongolib';

export default async (req, res) => {
  let todos = [];
  switch (req.method) {
    case 'DELETE':
      await deleteTodos(JSON.parse(req.body));
      todos = await todosList();
      break;
    case 'GET':
      break;
    case 'POST':
      await saveTodo(JSON.parse(req.body));
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route do not accept this request' });
  }
  todos = await todosList();
  res.status(200).json([...todos]);
};
