'use client'

import formatDate from '@/utils/formatDate';
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

const DisplayRequest = ({ request }) => {
  const router = useRouter();

  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    // update status
    const response = await fetch('http://localhost:3000/api/update-request', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          id: request._id,
          status
        }
      )
    });

    if (response.status === 200) {
      router.refresh();
      router.push('/requests');
    } else {
      setAlert(true);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-3 px-3 sm:px-5 w-full lg:w-3/4 2xl:w-1/2">
      <TextField
        disabled
        id="fullName"
        label="Full Name"
        value={request.fullName}
        className="w-full"
      />

      <TextField
        disabled
        id="issueHeadline"
        label="Issue Headline"
        value={request.issueHeadline}
        className="w-full"
      />

      <div className="flex gap-3">
        <TextField
          disabled
          id="department"
          label="Department"
          value={request.department}
          className="w-full"
        />

        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status"
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Backlog">Backlog</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex gap-3">
        <TextField
          disabled
          id="dateRequested"
          label="Date Requested"
          value={formatDate(request.dateRequested)}
          className="w-full"
        />

        <TextField
          disabled
          id="technician"
          label="Technician"
          value={request.technician ? request.technician : 'Not Assigned'}
          className="w-full"
        />
      </div>

      <TextField
        disabled
        id="issueDescription"
        label="Issue Description"
        value={request.issueDescription}
        multiline
        minRows={5}
        className="w-full"
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
            onClick={() => router.push('/requests')}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            className="w-full sm:w-auto"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {/* error alert */}
      {alert &&
        <Alert
          severity="error"
          onClose={() => setAlert(false)}
        >
          Error - Unable to update request
        </Alert>
      }
    </div>
  );
}

export default DisplayRequest;