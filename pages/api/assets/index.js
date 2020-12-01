import { connectToDatabase } from '../../../lib/mongodb';
import {
  deleteValidation,
  deleteAssets,
  fullAssetsList,
  postAsset,
  updateAssetsList,
} from '../../../lib/mongolib';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  let assets = [];
  switch (req.method) {
    case 'PATCH':
      assets = await updateAssetsList(JSON.parse(req.body));
      res.status(200).json({ assets });
      break;
    case 'DELETE':
      await deleteAssets(
        JSON.parse(req.body)['_ids'].map((d) => new ObjectId(d))
      );
      assets = await fullAssetsList();
      res.status(200).json({ assets });
      break;
    case 'POST':
      await postAsset(JSON.parse(req.body));
      assets = await fullAssetsList();
      res.status(200).json({ assets });
      break;
    case 'GET':
      assets = await fullAssetsList();
      res.status(200).json({ assets });
      break;

    default:
      return res
        .status(405)
        .json({ message: 'This route only accepts POST requests' });
  }
};
