import RequestsTable from '@/components/RequestsTable';
import { notFound } from 'next/navigation';

const requests = async () => {
  const response = await fetch('http://localhost:3000/api/requests');

  if (response.status !== 200) {
    notFound();
  }

  const requests = await response.json();

  return (
    <div className="flex flex-col justify-center items-center mx-3 sm:mx-5 h-full">
      <div className="w-full lg:w-3/4 2xl:w-2/3">
        <h2>Requests</h2>
        <RequestsTable requests={requests} />
      </div>
    </div>
  );
}

export default requests;