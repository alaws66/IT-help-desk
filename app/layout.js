import { Suspense } from 'react';
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

export const metadata = {
  title: 'IT help desk',
  description: 'Create, view and update issuenrequests to FAB Ltd',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} m-0`}>
        <header className="w-full h-12 bg-zinc-700 shadow-md">
          <div className="flex justify-center items-center h-full text-white">
            <h1 className="text-2xl">IT help desk</h1>
          </div>
        </header>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}