const APPLE_LOGIN_CLIENT_ID = 'com.bankidz.bankidz-web';
const APPLE_LOGIN_REDIRECT_URL = 'https://api.bankidz.com/apple/login';
const config = {
  client_id: APPLE_LOGIN_CLIENT_ID, // This is the service ID we created.
  redirect_uri: APPLE_LOGIN_REDIRECT_URL, // As registered along with our service ID
  response_type: 'code id_token',
  // state: 'origin:web', // Any string of your choice that you may use for some logic. It's optional and you may omit it.
  // scope: 'name email', // To tell apple we want the user name and emails
  scope: 'name', // To tell apple we want the user name and emails fields in the response it sends us.
  response_mode: 'form_post',
  m: 11,
  v: '1.5.4',
  nonce: 'hi',
};
const queryString = Object.entries(config)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');
export const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?${queryString}`;
