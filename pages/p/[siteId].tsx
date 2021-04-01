import { GetStaticPropsContext } from 'next';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

import Feedback from '@/components/Feedback';
import { FeedbackDetails, getAllFeedback, getAllSites } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const siteId = context.params ? (context.params.siteId as string) : '';
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: { initialFeedback: feedback }
  };
};

export const getStaticPaths = async () => {
  const { sites } = await getAllSites();
  if (sites) {
    const paths = sites.map((site) => ({
      params: { siteId: site.id?.toString() }
    }));
    return {
      paths,
      fallback: false
    };
  }
};

const SiteFeedback = (props: { initialFeedback: FeedbackDetails[] }) => {
  const { initialFeedback } = props;
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef<HTMLInputElement>(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (auth.user) {
      const newFeedback = {
        author: auth.user.name as string,
        authorId: auth.user.uid,
        siteId: router.query.siteId as string,
        text: inputEl && inputEl.current ? inputEl.current.value : '',
        createdAt: new Date().toISOString(),
        provider: auth.user.provider as string,
        status: 'pending'
      };

      setAllFeedback([newFeedback, ...allFeedback]);
      createFeedback(newFeedback);
    }
  };

  return (
    <Box width="full" maxWidth="700px" margin="0 auto">
      <FormControl as="form" my={8} onSubmit={onSubmit}>
        <FormLabel htmlFor="comment">Comment</FormLabel>
        <Input ref={inputEl} type="text" id="comment" />
        <Button mt={2} type="submit" fontWeight="600">
          Add Comment
        </Button>
      </FormControl>
      {allFeedback.map((feedback, key) => (
        <Feedback
          author={feedback.author}
          createdAt={feedback.createdAt}
          text={feedback.text}
          key={feedback.id ? feedback.id : key}
        />
      ))}
    </Box>
  );
};

export default SiteFeedback;
