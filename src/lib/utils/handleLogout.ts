/**
 * API 호출 없이 오직 Client-side logout을 처리합니다.
 */
function logoutClient() {
  window.location.href = '/auth/login';
  localStorage.clear();
}

export default logoutClient;
