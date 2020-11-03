import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import CookieService from '../../../lib/cookie';
import { connectToDatabase } from '../../../lib/mongodb';

const signup = async (user) => {
  const newUser = {
    ...user,
    date: new Date(),
  };
  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection('users')
      .replaceOne({ email: newUser.email }, newUser, { upsert: true });
  } catch (error) {
    console.log(
      'There was a problem while saving the user in the server',
      error
    );
    res.status(405);
  }
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'user was not saved on DB' });
  }

  // exchange the did from Magic for some user data
  const did = req.headers.authorization.split('Bearer').pop().trim();
  const user = await new Magic(
    process.env.MAGIC_SECRET_KEY
  ).users.getMetadataByToken(did);

  //user structure:
  // {
  //   issuer: 'did:***************************************',
  //   publicAddress: '********************************************',
  //   email: 'garo99@gmail.com'
  // }

  //Saving in mongoDB
  signup(user);

  //Encrypts the token
  const encrypted_token = await Iron.seal(
    user,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );

  //returns the encrypted user token
  CookieService.setTokenCookie(res, encrypted_token);

  res.end();
};
