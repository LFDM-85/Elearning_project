export function getToken() {
  return sessionStorage.getItem('token');
}

export function setToken(token: string) {
  return sessionStorage.setItem('token', token);
}

export function getRefreshToken() {
  return sessionStorage.getItem('refreshToken');
}

export function setRefreshToken(refreshToken: string) {
  return sessionStorage.setItem('refreshToken', refreshToken);
}