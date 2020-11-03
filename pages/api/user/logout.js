import CookieService from '../../../lib/cookie';

export default async (req, res) => {
  //returns the encrypted user token
  CookieService.expireTokenCookie(res, null);
  res.end();
};
