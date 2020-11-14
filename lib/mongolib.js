import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export const assetsNameList = async () => {
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

export const deleteTodos = async () => {};

export const todosList = async () => {
  const { db } = await connectToDatabase();
  const todosDB = await db.collection('todos').find().toArray();
  const assets = await assetsNameList();
  const todosAndAssets = [];
  const todosTable = [];
  todosDB.map((todo) =>
    todo.assets.map(async (asset) => {
      todosTable.push({
        title: todo.title,
        assetId: Object.keys(asset)[0],
        startDate: todo.startDate,
        frequency: todo.frequency || 'none',
        status: !asset[Object.keys(asset)[0]] ? 'Pending' : 'Closed',
      });
    })
  );

  assets.map((x) => console.log(x));

  todosTable.map((todo) =>
    //   console.log(new ObjectId(todo.assetId));
    //   console.log(
    //     'ASSET INFO:',
    //     assets.find((x) => {
    //       console.log(
    //         'Hello',
    //         x['_id'],
    //         ObjectId(todo.assetId),
    //         x['_id'].equals(ObjectId(todo.assetId))
    //       );
    //       return x['_id'] == ObjectId(todo.assetId);
    //     })
    //   );
    // }
    todosAndAssets.push({
      ...todo,
      machine_name: assets.find((x) =>
        x['_id'].equals(new ObjectId(todo.assetId))
      ).machine_name,
      tag: assets.find((x) => x['_id'].equals(new ObjectId(todo.assetId))).tag,
    })
  );

  return todosAndAssets;
};
