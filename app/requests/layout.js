import Logout from '@/components/Logout';
import { Suspense } from 'react';
import Loading from '../loading';

export default function RootLayout({ children }) {
  return (
    <>
      <Logout />
      <main className="h-[calc(100vh-48px)]">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
    </>
  )
}