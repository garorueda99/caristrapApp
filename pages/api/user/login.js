import { Magic } from '@magic-sdk/admin';
import Iron from '@hapi/iron';
import CookieService from '../../../lib/cookie';
import { signup } from '../../../lib/mongolib';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'user was not saved on DB' });
  }

  // exchange the did from Magic for some user data
  const did = req.headers.authorization.split('Bearer').pop().trim();
  const user = await new Magic(
    process.env.MAGIC_SECRET_KEY
  ).users.getMetadataByToken(did);

  //Saving user in mongoDB
  const authUser = await signup(user);

  //Encrypts the token
  const encrypted_token = await Iron.seal(
    authUser,
    process.env.ENCRYPTION_SECRET,
    Iron.defaults
  );

  //returns the encrypted user token
  CookieService.setTokenCookie(res, encrypted_token);

  res.end();
};
