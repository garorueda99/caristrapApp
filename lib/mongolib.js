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
  await db.collection('assets').insertOne(asset);
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
  console.log(await shortTodosAssetsList());
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
export const deleteTodos = async () => {};

export const todosList = async () => {
  const { db } = await connectToDatabase();
  const todosDB = await db.collection('todos').find().toArray();
  const assets = await shortAssetsNameList();
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

  todosTable.map((todo) => {
    const machineInfo = assets.find((x) =>
      x['_id'].equals(new ObjectId(todo.assetId))
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
