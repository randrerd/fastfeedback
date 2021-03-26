// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/firebase-admin';

export type SiteData = {
  id?: string;
  url: string;
  name: string;
  createdAt: string;
  authorId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot = await db.collection('sites').get();

    const arr: SiteData[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as SiteData;
      const obj: SiteData = {
        id: doc.id,
        ...data,
      };
      arr.push(obj);
    });
    res.status(200);
    res.send(arr);
  } catch (err) {
    console.log({ err });
  }
};
