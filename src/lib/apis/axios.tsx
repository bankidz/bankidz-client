import axios from 'axios';
import { BASE_URL } from '@lib/constants/BASE_URL';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

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

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
axiosPrivate.interceptors.request.use((request) => {
  const accessToken = getLocalStorage('accessToken');
  // @ts-expect-error
  if (!request.headers['X-AUTH-TOKEN']) {
    // @ts-expect-error
    request.headers['X-AUTH-TOKEN'] = `${accessToken}`;
  }
  return request;
});
axiosPrivate.interceptors.response.use((response) => {
  return response.data;
});
