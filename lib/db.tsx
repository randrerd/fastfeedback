import { TFormattedUser } from './auth';
import { FeedbackDetails } from './db-admin';
import firebase from './firebase';

const firestore = firebase.firestore();

export type SiteDetails = {
  id?: string;
  authorId: string | null;
  createdAt: string;
  name: string;
  url: string;
};

const createUser: (uid: string, data: TFormattedUser) => void = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ ...data }, { merge: true });
};

const createSite: (
  data: SiteDetails
) => Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> = (data) => {
  return firestore.collection('sites').add(data);
};

const createFeedback: (
  data: FeedbackDetails
) => Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> = (data) => {
  return firestore.collection('feedback').add(data);
};

export { createUser, createSite, createFeedback };
