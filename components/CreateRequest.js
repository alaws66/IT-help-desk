'use client'

import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateRequest = () => {
  const router = useRouter();

  const [department, setDepartment] = useState('HR');
  const [issueHeadline, setHeadline] = useState('');
  const [issueDescription, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    issueHeadline: false,
    issueDescription: false
  });

  const [alert, setAlert] = useState(false);

  const departments = [
    'HR',
    'IT',
    'Finance',
    'Facilities',
    'Marketing',
    'Sales',
    'Project Office',
    'Customer Services',
    'Operations'
  ];

  const handleClick = async ( status ) => {
    setLoading(true);

    if (issueHeadline && issueDescription) {
      const userResponse = await fetch('http://localhost:3000/api/user');
      const user = await userResponse.json();

      const requestResponse = await fetch('http://localhost:3000/api/create-request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: user.firstName + ' ' + user.lastName,
          department,
          issueHeadline,
          issueDescription,
          status
        })
      });

      if (requestResponse.status === 200) {
        router.refresh();
        router.push('/requests');
      } else {
        setAlert(true);
      }
    } else {
      setError({
        issueHeadline: issueHeadline ? false : true,
        issueDescription: issueDescription ? false : true
      });
    }

    setLoading(false);
  }

  const handleChange = (input, set, e) => {
    set(e.target.value);

    setError({...error, [input]: e.target.value ? false : true});
  }

  return (
    <>
      <div className="flex flex-col gap-3 mx-3 sm:mx-5 w-full lg:w-3/4 2xl:w-1/2">
        <TextField
          error={error.issueHeadline}
          id="issueHeadline"
          label="Issue Headline"
          value={issueHeadline}
          helperText={error.issueHeadline && 'Please enter a valid headline'}
          className="w-full"
          onChange={e => handleChange('issueHeadline', setHeadline, e)}
        />

        <FormControl fullWidth>
          <InputLabel id="department">Department</InputLabel>
          <Select
            labelId="department"
            id="department"
            label="Department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            {departments.map((title) => (
              <MenuItem key={title} value={title}>{title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          error={error.issueDescription}
          id="issueDescription"
          label="Issue Description"
          value={issueDescription}
          helperText={error.issueDescription && 'Please enter a valid description'}
          multiline
          minRows={5}
          className="w-full"
          onChange={e => handleChange('issueDescription', setDescription, e)}
        />

        {/* form action buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            disabled={loading}
            variant="contained"
            color="error"
            className="order-1"
          >
            Delete Request
          </Button>

          <div className="flex gap-3 sm:order-2">
            <Button
              disabled={loading}
              variant="outlined"
              className="w-full sm:w-auto"
              onClick={() => handleClick('Draft')}
            >
              Save As Draft
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              className="w-full sm:w-auto"
              onClick={() => handleClick('Backlog')}
            >
              Submit
            </Button>
          </div>
        </div>

        {/* error alert */}
        {alert &&
          <Alert
            severity="error"
            onClose={() => setAlert(false)}
          >
            Error - Unable to create request
          </Alert>
        }
      </div>
    </>
  );
}

export default CreateRequest;