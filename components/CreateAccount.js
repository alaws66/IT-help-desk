'use client'

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { useState } from 'react';

const CreateAccount = ({ open, setOpen }) => {
  const [alert, setAlert] = useState({
    success: false,
    error: false
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false
  });

  const handleCreate = async () => {
    if (firstName && lastName && username && password) {
      setError({
        firstName: false,
        lastName: false,
        username: false,
        password: false
      });

      // create user
      const response = await fetch('http://localhost:3000/api/create-user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            firstName,
            lastName,
            username,
            password
          }
        )
      });

      // check success and display outcome alert
      if (response.status === 200) {
        setAlert({ success: true, error: false });
      } else {
        setAlert({ success: false, error: true });
      }

      setOpen(false);
    } else {
      setError({
        firstName: firstName ? false : true,
        lastName: lastName ? false : true,
        username: username ? false : true,
        password: password ? false : true
      });
    }
  }

  const handleChange = (input, set, e) => {
    set(e.target.value);

    setError({...error, [input]: e.target.value ? false : true});
  }

  return (
    <>
      {/* Account created success alert */}
      {alert.success &&
        <Alert
          severity="success"
          onClose={() => setAlert({ ...alert, success: false })}
        >
          Success - Account created
        </Alert>
      }

      {/* Account created error alert */}
      {alert.error &&
        <Alert
          severity="error"
          onClose={() => setAlert({ ...alert, error: false })}
        >
          Error - Unable to create account
        </Alert>
      }

      <Dialog open={open}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          {/* First name input */}
          <TextField
            autoFocus
            error={error.firstName}
            id="firstName"
            label="First Name"
            value={firstName}
            helperText={error.firstName && 'Please enter a valid first name'}
            className="my-3 w-full"
            onChange={(e) => handleChange('firstName', setFirstName, e)}
          />

          {/* Last name input */}
          <TextField
            error={error.lastName}
            id="lasttName"
            label="Last Name"
            value={lastName}
            helperText={error.lastName && 'Please enter a valid last name'}
            className="w-full"
            onChange={(e) => handleChange('lastName', setLastName, e)}
          />

          {/* Username input */}
          <TextField
            error={error.username}
            id="username"
            label="Username"
            value={username}
            helperText={error.username && 'Please enter a valid username'}
            className="my-3 w-full"
            onChange={(e) => handleChange('username', setUsername, e)}
          />

          {/* Password input */}
          <TextField
            error={error.password}
            type="password"
            id="password"
            label="Password"
            value={password}
            helperText={error.password && 'Please enter a valid password'}
            className="w-full"
            onChange={(e) => handleChange('password', setPassword, e)}
          />

          {/* Action buttons */}
          <DialogActions className="mt-5 p-0">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleCreate}
            >
              Create Account
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateAccount;