import firebase from './firebase';

const firestore = firebase.firestore();

type TFormattedUser = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
};

type TSiteDetails = {
  authorId: string | null;
  createdAt: string;
  site: string;
  url: string;
};

const createUser: (uid: string, data: TFormattedUser) => void = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ ...data }, { merge: true });
};

const createSite: (data: TSiteDetails) => void = (data) => {
  return firestore.collection('sites').add(data);
};

export { createUser, createSite };
