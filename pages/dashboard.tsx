import { useAuth } from '@/lib/auth';

import FreePlanEmptyState from '@/components/FreePlanEmptyState';
import EmptyState from '@/components/EmptyState';
import Head from 'next/head';

const Dashboard = () => {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {!auth.user ? <FreePlanEmptyState /> : <EmptyState />}
    </>
  );
};

export default Dashboard;
