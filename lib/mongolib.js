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

export const updateAssetsList = async (assetsList) => {
  const { db } = await connectToDatabase();
  assetsList.map(async (asset) => {
    try {
      const id = asset._id;
      const info = { ...asset };
      delete info._id;
      const result = await db
        .collection('assets')
        .replaceOne({ _id: new ObjectId(id) }, { ...info });
    } catch {
      return [];
    }
  });

  return await db.collection('assets').find().toArray();
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

export const deleteTodo = async (todoId) => {
  const { db } = await connectToDatabase();
  await db.collection('todos').deleteOne({ _id: new ObjectId(todoId) });
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
        _id: todo._id,
        asset: asset,
        title: todo.title,
        startDate: todo.startDate,
        frequency: todo.frequency || 'none',
        status: !todo[asset] ? 'Open' : 'Close',
      });
    }
  });
  todosTable.map((todo) => {
    const machineInfo = assets.find((x) => {
      return x['_id'].equals(new ObjectId(todo.asset));
    });
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

export const replaceTodo = async (todo) => {
  const { db } = await connectToDatabase();
  const id = todo._id;
  const info = { ...todo };
  delete info._id;
  const result = await db
    .collection('todos')
    .replaceOne({ _id: new ObjectId(id) }, { ...info });
};

//LOGIN
export const signup = async (user) => {
  const currentUser = {
    ...user,
    date: new Date(),
  };

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('users').findOneAndUpdate(
      { email: currentUser.email },
      { $set: { ...currentUser }, $setOnInsert: { profile: 'user' } },
      {
        upsert: true,
        returnNewDocument: true,
      }
    );
    if (result.lastErrorObject.updatedExisting) {
      const { email, profile } = result.value;
      return { email, profile };
    } else {
      return { email: user.email, profile: 'user' };
    }
  } catch (error) {
    console.log(
      'There was a problem while saving the user in the server',
      error
    );
    res.status(405);
  }
};

//USER

export const updateUserProfile = async (info) => {
  const { db } = await connectToDatabase();
  try {
    const { email, newProfile } = info;
    const result = await db
      .collection('users')
      .updateOne({ email }, { $set: { profile: newProfile } });
  } catch {
    return [];
  }
};
