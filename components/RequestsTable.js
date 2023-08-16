'use client'

import formatDate from '@/utils/formatDate';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
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
                  <TableCell className="text-blue-700 cursor-pointer">
                    Assign User
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RequestsTable;