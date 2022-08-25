// API BASE_URL
export const BASE_URL = 'https://api.bankidz.com'; // 배포 환경
// export const BASE_URL = 'https://bankids.click'; // 테스트 환경

// Client DOMAIN
export const DOMAIN = 'https://bankidz.com'; // 배포 환경(고정)
// export const DOMAIN = 'http://localhost:3000'; // 테스트 환경
export const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
export const REDIRECT_URI = `${DOMAIN}/auth/kakao/callback`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const AWS_S3_URL = `${process.env.REACT_APP_AWS_S3_URL}`;
