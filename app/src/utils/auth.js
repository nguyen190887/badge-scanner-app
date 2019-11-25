import { Auth } from 'aws-amplify';

const isBrowser = typeof window !== `undefined`

export const setUser = user =>
  window.localStorage.appUser = JSON.stringify(user);

const getUser = () => {
  if (window.localStorage.appUser) {
    let user = JSON.parse(window.localStorage.appUser);
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = async () => {
  return (await Auth.currentSession()).isValid();
};

export const getCurrentUser = () => isBrowser && getUser();

export const logout = callback => {
  if (!isBrowser) return;
  setUser({});
  callback();
};
