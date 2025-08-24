import { AdminLoginForm } from '@/components/AdminLoginForm/AdminLoginForm';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = params?.next ?? '/admin';
  return <AdminLoginForm next={next} />;
}
