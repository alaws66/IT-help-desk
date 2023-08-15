'use client'

import loginUser from '@/utils/loginUser';
import { RotateRightRounded } from '@mui/icons-material';
import { Alert, Button, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    username: false,
    password: false,
    login: false
  });

  const handleLogin = async (e) => {
    // set loading icon
    setLoading(true);

    // prevents page reload
    e.preventDefault();

    // check inputs not empty
    if (username && password) {
      // search for user in database
      const status = await loginUser(username, password);

      // if user exists, redirect to reports page. If not, reset inputs
      if (status === 200) {
        setError({ username: false, password: false, login: false });

        router.push('/requests');
      } else {
        setError({ username: false, password: false, login: true });
        setUsername('');
        setPassword('');
      }
    } else {
      // if no username or password set, show error(s)
      setError({ ...error, username: !username, password: !password });
    }

    setLoading(false);
  }

  return (
    <form autoComplete="off" className="flex flex-col gap-3">
      {/* login error alert */}
      {error.login && <Alert severity="error">Error - Invalid username or password</Alert>}

      {/* username input */}
      <TextField
        error={error.username}
        id="username"
        label="Username"
        value={username}
        helperText={error.username && 'Please enter a valid username'}
        className="w-full"
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* password input */}
      <TextField
        error={error.password}
        type="password"
        id="password"
        label="Password"
        value={password}
        helperText={error.password && 'Please enter a valid password'}
        className="w-full"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* form buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outlined"
          className="w-full"
        >
          Create an account
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          className="w-full"
          onClick={handleLogin}
        >
          {loading ? <RotateRightRounded className="animate-spin" /> : 'Login' }
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;