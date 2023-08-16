import Logout from '@/components/Logout';
import { Suspense } from 'react';

export default function RootLayout({ children }) {
  return (
    <>
      <Logout />
      <main className="h-[calc(100vh-48px)]">
        <Suspense>
          {children}
        </Suspense>
      </main>
    </>
  )
}