import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  return localStorage.setItem('token', token);
}

export function getRefreshToken() {
  return cookies.get('refreshCookie');

  // return sessionStorage.getItem('refreshToken');
}

export function setRefreshToken(refreshToken: string) {
  // return cookies.set('refreshCookie', refreshToken, {
  //   httpOnly: true,
  //   sameSite: 'none',
  //   maxAge: 48 * 60 * 60 * 1000,
  // });

  return sessionStorage.setItem('refreshToken', refreshToken);
}
