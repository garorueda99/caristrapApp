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
        .json({ message: 'This route only accepts POST requests' });
  }
  todos = await todosList();
  res.status(200).json({ todos });
};
