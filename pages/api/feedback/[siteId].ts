import { getAllFeedback } from '@/lib/db-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const siteId = req.query.siteId;

  if (typeof siteId === 'string') {
    const { feedback, err } = await getAllFeedback(siteId);

    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ feedback });
    }
  }
};
