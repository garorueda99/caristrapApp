import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

//ASSETS
export const shortAssetsNameList = async () => {
  const { db } = await connectToDatabase();
  try {
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
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const postAsset = async (asset) => {
  const { db } = await connectToDatabase();
  const res = await db.collection('assets').insertOne(asset);
};

export const fullAssetsList = async () => {
  try {
    const { db } = await connectToDatabase();
    return await db.collection('assets').find().toArray();
  } catch {
    return [];
  }
};

export const deleteValidation = async (assets) => {
  // const todos = todosList();
  return;
};

export const deleteAssets = async (assets) => {
  const { db } = await connectToDatabase();
  await db.collection('assets').deleteMany({
    _id: {
      $in: assets,
    },
  });
};

//TODOS
export const deleteTodos = async (todos) => {
  const { db } = await connectToDatabase();
  todos['_ids'].forEach(async (todo) => {
    const result = await db
      .collection('todos')
      .findOne({ _id: new ObjectId(Object.keys(todo)[0]) });
    delete result.assets[Object.values(todo)[0]];
    await db.collection('todos').replaceOne({ _id: result._id }, { ...result });
  });
};

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

export const todosList = async () => {
  const { db } = await connectToDatabase();
  const todosDB = await db.collection('todos').find().toArray();
  const assets = await shortAssetsNameList();
  const todosAndAssets = [];
  const todosTable = [];
  todosDB.map((todo) => {
    for (const asset in todo.assets) {
      todosTable.push({
        _id: { [todo._id]: asset },
        title: todo.title,
        startDate: todo.startDate,
        frequency: todo.frequency || 'none',
        status: todo[asset] ? 'Pending' : 'Closed',
      });
    }
  });

  todosTable.map((todo) => {
    const machineInfo = assets.find((x) =>
      x['_id'].equals(new ObjectId(Object.values(todo._id)[0]))
    );
    todosAndAssets.push({
      ...todo,
      machine_name: machineInfo ? machineInfo.machine_name : 'N/A',
      tag: machineInfo ? machineInfo.tag : 'N/A',
    });
  });

  return todosAndAssets;
};

export const shortTodosAssetsList = async () => {
  const { db } = await connectToDatabase();
  try {
    return await db
      .collection('todos')
      .aggregate([
        {
          $project: {
            _id: 0,
            assets: 1,
          },
        },
      ])
      .toArray();
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const saveTodo = async (todo) => {
  const { db } = await connectToDatabase();
  const result = await db.collection('todos').insertOne(todo);
};