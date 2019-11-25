import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { setUser } from '../utils/auth';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await Auth.signIn(username, password);
      setUser(user);
      window.location.href = '/'; // FIXME: use gatsby style
    } catch (e) {
      alert('Failed to login');
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm;
