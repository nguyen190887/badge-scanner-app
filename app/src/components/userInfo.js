import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import { isLoggedIn, getUserName, signOut } from '../utils/auth';

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  useEffect(() => {
    (async () => {
      const [loggedIn, username] = await Promise.all([
        isLoggedIn(),
        getUserName(),
      ]);
      setLoggedIn(loggedIn);
      setUserName(username);
    })();
  });

  const logout = async e => {
    e.preventDefault();
    await signOut();
    navigate('/login');
  };

  return (
    <>
      {loggedIn ? (
        <div>
          Your login: {username} -{' '}
          <a href="#" onClick={logout}>
            Logout
          </a>
        </div>
      ) : (
        <Link to="/login/">Login</Link>
      )}
    </>
  );
};
