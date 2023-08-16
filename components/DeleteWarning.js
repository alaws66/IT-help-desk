'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';

const DeleteWarning = ({ warning, setWarning, setLoading, id, setAlert }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (id) {
      setLoading(true);

      // delete request
      const response = await fetch('http://localhost:3000/api/delete-request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (response.status === 200) {
        router.refresh();
        router.push('/requests');
      } else {
        setAlert(true);
      }

      setLoading(false);
    } else {
      router.push('/requests')
    }
  }

  return (
    <Dialog open={warning}>
      <DialogTitle className="text-center sm:text-left">
        Are you sure you want to delete this request?
      </DialogTitle>
      <DialogContent>
        {/* action buttons */}
        <DialogActions className='mt-1 p-0'>
          <Button
            className="w-full sm:w-auto"
            onClick={() => setWarning(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            className="w-full sm:w-auto"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteWarning;