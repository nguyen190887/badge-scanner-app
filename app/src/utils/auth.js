import Auth from '@aws-amplify/auth';
import { isBrowser } from './common'

export const signIn = async (username, password) =>
  isBrowser && (await Auth.signIn(username, password));

export const signOut = async () => isBrowser && (await Auth.signOut());

export const currentSession = async () =>
  isBrowser && (await Auth.currentSession());

export const isLoggedIn = async () => {
  const currentSession = await Auth.currentSession();
  return currentSession && currentSession.isValid();
};

export const getRole = async () => {
  if (isBrowser) {
    const user = await Auth.currentAuthenticatedUser();
    return user.signInUserSession.accessToken.payload["cognito:groups"];
  }
}

export const getUserName = async () => 
  isBrowser && (await Auth.currentUserInfo()).attributes.email;
  
export const _getUserName = async () => {
const userInfo = await Auth.currentUserInfo();
console.log(userInfo);
return 'test';
}
