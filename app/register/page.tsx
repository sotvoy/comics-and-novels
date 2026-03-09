import RegisterForm from '@/components/auth/RegisterForm';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Register - C&N',
  description: 'Create a new C&N account',
};

export default function RegisterPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <RegisterForm />
      </div>
    </AuthProvider>
  );
}
