'use strict';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const assets = async () => {
    const { db } = await connectToDatabase();
    return await db
      .collection('assets')
      .aggregate([
        {
          $project: {
            _id: 1,
            machine_name: 1,
            tag: 1,
          },
        },
      ])
      .toArray();
  };

  // const update = async (data) => {
  //   myResponse = await data;
  // };

  const globalInfo = await assets();

  switch (req.method) {
    case 'DELETE':
      await db.collection('todos').deleteMany({
        _id: {
          $in: JSON.parse(req.body)['_ids'].map((d) => new ObjectId(d)),
        },
      });
      await db
        .collection('todos')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            res.status(200).json({
              todos: result,
            });
          } else {
            res.status(500).json({ status: 400, message: 'Not found' });
          }
        });
      break;
    case 'GET':
      await db
        .collection('todos')
        .find()
        .toArray((err, result) => {
          if (result.length) {
            const list = [];
            result.map((x) =>
              x.assets.map(async (y) => {
                list.push({
                  title: x.title,
                  assetId: Object.keys(y)[0],
                  startDate: x.startDate,
                  machine_name: 'unknown',
                  frequency: x.frequency || 'none',
                  status: y[Object.keys(y)[0]],
                });
                // console.log('LIST', list);
              })
            );
            res.status(200).json({ todos: list });
          } else {
            res.status(200).json({ todos: [] });
          }
        });

      // const res2 = await fetch('/api/assets/name');
      // const assets = await res2.json();
      // console.log('DATA', data, assets);

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
