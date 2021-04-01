import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/firebase-admin';
import { getAllSites } from '@/lib/db-admin';

export type SiteData = {
  id?: string;
  url: string;
  name: string;
  createdAt: string;
  authorId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sites, err } = await getAllSites();

  if (err) {
    res.status(500).json(err);
  } else {
    res.status(200).json(sites);
  }
};
