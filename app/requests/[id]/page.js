import DisplayRequest from '@/components/DisplayRequest';
import { notFound } from 'next/navigation';

const request = async ({ params }) => {
  const response = await fetch('http://localhost:3000/api/request', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: params.id
    })
  });

  if (response.status !== 200) {
    notFound();
  }

  const request = await response.json();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <DisplayRequest request={request} />
    </div>
  );
}

export default request;