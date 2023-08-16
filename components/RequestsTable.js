'use client'

import formatDate from '@/utils/formatDate';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RequestsTable = ({ requests }) => {
  const router = useRouter();

  const titles = [
    'ID',
    'Issue Headline',
    'Department',
    'Date Requested',
    'Status',
    'Technician'
  ];

  const handleClick = async (id) => {
    // find logged in user
    const response = await fetch(`http://localhost:3000/api/user?id=${id}`);
    const loggedInUser = await response.json();

    if (loggedInUser) {
      router.refresh();
    }
  }

  return (
    <div>
      <TableContainer className="max-h-[40rem] overflow-y-scroll rounded-md">
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-[#1976d2]">
            <TableRow>
              {titles.map((title, index) => (
                <TableCell key={index} className="text-[0.95rem] font-bold text-white">
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={request.issueHeadline}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-black/20"
              >
                <TableCell
                  className="text-blue-700 cursor-pointer"
                  onClick={() => router.push(`requests/${request._id}`)}
                >
                  {index + 1}
                </TableCell>
                <TableCell>{request.issueHeadline}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{formatDate(request.dateRequested)}</TableCell>
                <TableCell>{request.status}</TableCell>
                {request.technician ?
                  <TableCell className="capitalize">{request.technician}</TableCell>
                  :
                  <TableCell
                    className="text-blue-700 cursor-pointer"
                    onClick={() => handleClick(request._id)}
                  >
                    Assign User
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* create new request button */}
      <div className="mt-5 text-right">
        <Button variant="contained">
          <Link href="/requests/create" className="no-underline text-white">
            Create new request
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default RequestsTable;