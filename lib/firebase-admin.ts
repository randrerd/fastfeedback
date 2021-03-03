import admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/firestore';

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert({
    //   client_email: process.env.FIREBASE_CLIENT_EMAIL,
    //   private_key: process.env.FIREBASE_PRIVATE_KEY,
    //   project_id: 'your-project-id'
    // }),
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: '"fast-feedback-a48a7'
    }),
    databaseURL: 'https://your-project-id.firebaseio.com'
  });
}

export default admin.database();
