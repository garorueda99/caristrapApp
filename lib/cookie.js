import { serialize } from 'cookie';

const TOKEN_NAME = 'api_maintenance_token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

//creates user cookie
function setTokenCookie(res, token) {
  res.setHeader('Set-Cookie', [createCookie(TOKEN_NAME, token)]);
}

function getAuthToken(cookies) {
  return cookies[TOKEN_NAME];
}

//expires cookies

function expireTokenCookie(res, token) {
  res.setHeader('Set-Cookie', [expireCookie(TOKEN_NAME, token)]);
}
function expireCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: 0,
    expires: new Date(Date.now() - 1),
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    ...options,
  });
}

export default { setTokenCookie, getAuthToken, expireTokenCookie };
