'use client'

import formatDate from '@/utils/formatDate';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useState } from 'react';

const DisplayRequest = ({ request }) => {
  const [status, setStatus] = useState(request.status);

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
    </div>
  );
}

export default DisplayRequest;