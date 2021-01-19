// user info

import Iron from '@hapi/iron';
import CookieService from '../../../lib/cookie';
import { updateUserProfile } from '../../../lib/mongolib';

export default async (req, res) => {
  let userFromCookie;
  switch (req.method) {
    /*
     * This route checks if a user is autheticated
     */
    case 'GET':
      try {
        if (Object.keys(req.cookies).length !== 0) {
          userFromCookie = await Iron.unseal(
            CookieService.getAuthToken(req.cookies),
            process.env.ENCRYPTION_SECRET,
            Iron.defaults
          );
        } else {
          return res.status(400).json({ message: 'No cookies were sent' });
        }
      } catch (error) {
        console.log('COOKIE AUTH ERROR', error);
        return res.status(400).json({ message: 'cookie auth error' });
      }
      res.json(userFromCookie);
      break;
    case 'PATCH':
      await updateUserProfile(JSON.parse(req.body));
      res.end();
      break;
    default:
      return res
        .status(405)
        .json({ message: 'This route do not accept this request' });
  }
};
