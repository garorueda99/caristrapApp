'use strict';
import { connectToDatabase } from '../../../lib/mongodb';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ message: 'This route only accepts GET requests' });
  }
  let userFromCookie;

  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users').find().toArray();
    return res.status(200).json(users);
  } catch (error) {
    console.log('COOKIE AUTH ERROR', error);
    return res.status(400).json({ message: 'cookie auth error' });
  }
  res.json(userFromCookie);
};
