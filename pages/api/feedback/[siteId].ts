import { getAllFeedback } from '@/lib/db-admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const siteId = req.query.siteId;

    if (typeof siteId === 'string') {
      const feedback = await getAllFeedback(siteId);

      res.status(200).json({ feedback });
    }
  } catch (err) {
    console.log(err);
  }
};
