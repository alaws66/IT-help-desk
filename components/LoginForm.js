'use client'

import { Button, TextField } from '@mui/material';

const LoginForm = () => {
  return (
    <form autoComplete="off" className="flex flex-col gap-3">
      {/* username input */}
      <TextField
        id="username"
        label="Username"
        className="w-full"
      />

      {/* password input */}
      <TextField
        type="password"
        id="password"
        label="Password"
        className="w-full"
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
          variant="contained"
          className="w-full"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;