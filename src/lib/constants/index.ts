/*
 ** =============================================================================
 ** API Base URL
 ** =============================================================================
 */
// export const BASE_URL = 'https://api.bankidz.com'; // 배포 환경
export const BASE_URL = 'https://bankids.click'; // 테스트 환경

/*
 ** =============================================================================
 ** AWS S3 URL
 ** =============================================================================
 */
export const AWS_S3_URL = `${process.env.REACT_APP_AWS_S3_URL}`;

/*
 ** =============================================================================
 ** Modal Animation
 ** =============================================================================
 */
export const MODAL_CLOSE_TRANSITION_TIME = 200; // milliseconds
export const MODAL_SLIDE_FROM_POSITION = '-10%';
export const MODAL_SLIDE_TO_POSITION = '-50%';

/*
 ** =============================================================================
 ** KAKAO AUTH URL
 ** =============================================================================
 */
const DOMAIN = 'https://bankidz.com'; // 배포 환경(고정)
// export const DOMAIN = 'http://localhost:3000'; // 테스트 환경
const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
const REDIRECT_URI = `${DOMAIN}/auth/kakao/callback`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

/*
 ** =============================================================================
 ** APPLE AUTH URL
 ** =============================================================================
 */
const APPLE_LOGIN_CLIENT_ID = 'com.bankidz.bankidz-web';
const APPLE_LOGIN_REDIRECT_URL = 'https://bankidz.com/auth/apple/callback';
const config = {
  client_id: APPLE_LOGIN_CLIENT_ID, // This is the service ID we created.
  redirect_uri: APPLE_LOGIN_REDIRECT_URL, // As registered along with our service ID
  response_type: 'code id_token',
  state: 'origin:web', // Any string of your choice that you may use for some logic. It's optional and you may omit it.
  scope: 'name email', // To tell apple we want the user name and emails fields in the response it sends us.
  response_mode: 'form_post',
  m: 11,
  v: '1.5.4',
};
const queryString = Object.entries(config)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');
export const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?${queryString}`;
