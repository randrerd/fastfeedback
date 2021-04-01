import { compareDesc, parseISO } from 'date-fns';
import { SiteDetails } from './db';
import { firestore } from './firebase-admin';

export type FeedbackDetails = {
  id?: string;
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating?: number;
  siteId: string;
  status: 'pending' | 'approved' | string;
  text: string;
};

const getAllFeedback = async (siteId: string) => {
  try {
    const snapshot = await firestore
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get();

    const feedback: FeedbackDetails[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data() as FeedbackDetails;
      feedback.push({ id: doc.id, ...data });

      feedback.sort((a, b) =>
        compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
      );
    });

    return { feedback };
  } catch (err) {
    return { err };
  }
};

const getAllSites = async () => {
  const snapshot = await firestore.collection('sites').get();

  const sites: SiteDetails[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data() as SiteDetails;

    sites.push({ id: doc.id, ...data });
  });

  return { sites };
};

const getUserSites = async (uid: string) => {
  const snapshot = await firestore
    .collection('sites')
    .where('authorId', '==', uid)
    .get();

  const data: { sites: SiteDetails[] } = { sites: [] };

  snapshot.forEach((doc) => {
    const current = doc.data() as SiteDetails;

    data.sites.push({ id: doc.id, ...current });
  });

  return data;
};

export { getAllFeedback, getAllSites, getUserSites };
