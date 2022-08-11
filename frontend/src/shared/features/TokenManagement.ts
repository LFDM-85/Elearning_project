import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getToken() {
  // return localStorage.getItem('token');
  return cookies.get('token');
}

export function setToken(token: string) {
  // return localStorage.setItem('token', token);
  return cookies.set('token', token);
}
