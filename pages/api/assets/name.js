import { shortAssetsNameList } from '../../../lib/mongolib';

export default async (req, res) => {
  const assets = await shortAssetsNameList();
  if (assets.length) {
    res.status(200).json({
      assets,
    });
  } else {
    res.status(500).json({ assets: [] });
  }
};
