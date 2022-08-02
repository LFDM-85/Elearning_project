import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getToken() {
  return cookies.get('auth');
  // return sessionStorage.getItem('token');
}

export function setToken(token: string) {
  return cookies.set('auth', token, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 5 * 60 * 1000,
  });
  // return sessionStorage.setItem('token', token);
}

export function getRefreshToken() {
  return cookies.get('refreshCookie');

  // return sessionStorage.getItem('refreshToken');
}

export function setRefreshToken(refreshToken: string) {
  return cookies.set('refreshCookie', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 48 * 60 * 60 * 1000,
  });

  // return sessionStorage.setItem('refreshToken', refreshToken);
}
