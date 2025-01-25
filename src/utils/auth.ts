export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setAccessToken = () => {
  const token: string = window.location.search.substring(1).split('=')[1];
  console.log('# set token: ', token);
  localStorage.setItem('accessToken', token);
};
