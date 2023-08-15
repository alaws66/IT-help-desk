import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className="h-[calc(100vh-48px)]">
      <div className="flex justify-center items-center h-full">
        <div className="px-5 sm:px-10 py-10 w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 rounded-md">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}