import { connectToDatabase } from './mongodb';

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
