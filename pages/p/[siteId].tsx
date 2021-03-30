import { GetStaticPropsContext } from 'next';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const siteId = context.params ? (context.params.siteId as string) : '';
  const feedback = await getAllFeedback(siteId);

  return {
    props: { initialFeedback: feedback }
  };
};

export const getStaticPaths = async () => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: { siteId: site.id?.toString() }
  }));

  return {
    paths,
    fallback: false
  };
};

const SiteFeedback = () => {
  return 'hue';
};

export default SiteFeedback;
