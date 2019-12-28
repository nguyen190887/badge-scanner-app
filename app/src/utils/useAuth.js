
import { useEffect, useState } from 'react';
import { isLoggedIn, getUserName, getRole } from '../utils/auth';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState('');
  const [roleName, setRoleName] = useState(['guest']);

  useEffect(() => {
    (async () => {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        setRoleName(await getRole());
        setUserName(await getUserName());
        setLoggedIn(loggedIn);
      }
    })();
  });

  return ({ loggedIn: loggedIn, username: username, roleName: roleName });
};
