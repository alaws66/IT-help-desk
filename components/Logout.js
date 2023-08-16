'use client'

import logoutUser from '@/utils/logoutUser';
import { LogoutRounded } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Link from 'next/link';

const Logout = () => {
  const handleClick = async () => {
    // find logged in user
    const response = await fetch('http://localhost:3000/api/user');
    const user = await response.json();

    // logout current user
    await logoutUser(user._id);
  }

  return (
    <Link
      href="/"
      replace
      className="absolute top-3 right-3 flex items-center no-underline text-white"
      onClick={handleClick}
    >
      <Tooltip title="Logout">
        <LogoutRounded />
      </Tooltip>
    </Link>
  );
}

export default Logout;