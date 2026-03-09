import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - C&N',
  description: 'Create a new C&N account',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}
