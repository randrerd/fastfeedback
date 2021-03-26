import { useAuth } from '@/lib/auth';

import FreePlanEmptyState from '@/components/FreePlanEmptyState';
import Head from 'next/head';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  const { data } = useSWR('/api/sites', fetcher);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <DashboardShell>
        {!data ? <SiteTableSkeleton /> : <SiteTable sites={data} />}
      </DashboardShell>
    </>
  );
};

export default Dashboard;
