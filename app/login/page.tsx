import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - C&N',
  description: 'Sign in to your C&N account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
