import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/lib/firebase-admin';
import { getUserSites } from '@/lib/db-admin';

export type SiteData = {
  id?: string;
  url: string;
  name: string;
  createdAt: string;
  authorId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const { sites } = await getUserSites(uid);

    res.status(200).json(sites);
  } catch (err) {
    res.status(500).json({ err });
  }
};
