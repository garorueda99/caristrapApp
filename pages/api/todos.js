'use strict';
import { connectToDatabase } from '../../lib/mongodb';

import { todosList } from '../../lib/mongolib';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'DELETE':
      // await db.collection('todos').deleteMany({
      //   _id: {
      //     $in: JSON.parse(req.body)['_ids'].map((d) => new ObjectId(d)),
      //   },
      // });
      // await db
      //   .collection('todos')
      //   .find()
      //   .toArray((err, result) => {
      //     if (result.length) {
      //       res.status(200).json({
      //         todos: result,
      //       });
      //     } else {
      //       res.status(500).json({ status: 400, message: 'Not found' });
      //     }
      //   });
      break;
    case 'GET':
      const todos = await todosList();
      res.status(200).json({ todos });
      break;
    case 'POST':
      const result = await db
        .collection('todos')
        .insertOne(JSON.parse(req.body));
      await db
        .collection('todos')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            res.status(200).json({
              todos: result,
            });
            res.end();
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

// b.map((element) =>
//   newList2.push({
//     ...element,
//     machine_name: a.find((x) => x['_id'] === element.machine_name).machine_name,
//     tag: a.find((x) => x['_id'] === element.machine_name).tag,
//   })
// );
