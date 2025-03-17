import { redirect } from 'react-router-dom';

export async function authLoader() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return redirect('/login');
  }
  return null;
}
