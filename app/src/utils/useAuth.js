
import { useEffect, useState } from 'react';
import { isLoggedIn, getUserName } from '../utils/auth';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  useEffect(() => {
    (async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        setUserName(await getUserName());
        setLoggedIn(loggedIn);
      }
    })();
  });

  return ({ loggedIn: loggedIn, username: username });
};
