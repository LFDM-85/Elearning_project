import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getToken() {
  cookies.get('user');
  cookies.get('token');
  return;
}

export function setToken(token: string, user: any) {
  cookies.set('user', user);

  return cookies.set('token', token);
}
