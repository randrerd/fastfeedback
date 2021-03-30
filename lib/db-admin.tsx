import { SiteDetails } from './db';
import firebase from './firebase-admin';

export type FeedbackDetails = {
  id?: string;
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating: number;
  siteId: string;
  status: 'pending' | 'approved' | string;
  text: string;
};
const getAllFeedback = async (siteId: string) => {
  const snapshot = await firebase
    .collection('feedback')
    .where('siteId', '==', siteId)
    .get();

  const feedback: FeedbackDetails[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as FeedbackDetails;
    feedback.push({ id: doc.id, ...data });
  });

  return feedback;
};

const getAllSites = async () => {
  const snapshot = await firebase.collection('sites').get();

  const sites: SiteDetails[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as SiteDetails;

    sites.push({ id: doc.id, ...data });
  });

  return sites;
};

export { getAllFeedback, getAllSites };
