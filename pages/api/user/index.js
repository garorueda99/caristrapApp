import Iron from '@hapi/iron';
import CookieService from '../../../lib/cookie';

/**
 * This route checks if a user is autheticated
 */

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ message: 'This route only accepts GET requests' });
  }
  let userFromCookie;

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
    console.log('ERROR:', error);
  }
  res.json(userFromCookie);
};
