import DisplayRequest from '@/components/DisplayRequest';
import { notFound } from 'next/navigation';

const request = async ({ params }) => {
  // get single request
  const requestResponse = await fetch('http://localhost:3000/api/request', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: params.id
    })
  });

  if (requestResponse.status !== 200) {
    notFound();
  }

  const request = await requestResponse.json();

  // get all users
  const usersResponse = await fetch('http://localhost:3000/api/users');

  if (usersResponse.status !== 200) {
    notFound();
  }

  const users = await usersResponse.json();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <DisplayRequest request={request} users={users} />
    </div>
  );
}

export default request;