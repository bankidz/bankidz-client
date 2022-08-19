import axios from 'axios';

// 배포 환경
// const BASE_URL = 'https://api.bankidz.com';
// 테스트 환경
const BASE_URL = 'https://bankids.click';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// axiosPrivateInstance는 useAxiosPrivate hook에서 import 되고,
// 해당 hook은 axiosPrivateInstance에 interceptors를 더한 instance를 리턴한다.
export const axiosPrivateInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
