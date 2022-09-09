import { BASE_URL } from './BASE_URL';

const APPLE_LOGIN_CLIENT_ID = 'com.bankidz.bankidz-web';
const APPLE_LOGIN_REDIRECT_URL = `${BASE_URL}/apple/revoke`;
const config = {
  client_id: APPLE_LOGIN_CLIENT_ID, // This is the service ID we created.
  redirect_uri: APPLE_LOGIN_REDIRECT_URL, // As registered along with our service ID
  response_type: 'code id_token',
  scope: 'name', // To tell apple we want the user name and emails fields in the response it sends us.
  response_mode: 'form_post',
  // m: 11,
  // v: '1.5.4',
  nonce: `${process.env.REACT_APP_APPLE_NONCE}`,
};
const queryString = Object.entries(config)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');
export const APPLE_DEAUTH_URL = `https://appleid.apple.com/auth/authorize?${queryString}`;
