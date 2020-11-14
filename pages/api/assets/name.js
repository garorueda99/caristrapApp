import { connectToDatabase } from '../../../lib/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  await db
    .collection('assets')
    .find()
    .toArray((err, assets) => {
      //   console.log(assets)
      const response = [];
      assets.map((element) =>
        response.push({
          _id: element['_id'],
          machine_name: element.machine_name,
          tag: element.tag,
        })
      );
      if (response.length) {
        res.status(200).json({
          assets: response,
        });
      } else {
        res.status(500).json({ status: 400, message: 'Not found' });
      }
    });
};

b.map((element) =>
  newList.push({
    ...element,
    machine_name: a.find((x) => x['_id'] === element.machine_name).machine_name,
    tag: a.find((x) => x['_id'] === element.machine_name).tag,
  })
);
