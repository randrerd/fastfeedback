import { Box, Divider, Heading, Text } from '@chakra-ui/layout';
import { format, parseISO } from 'date-fns';

type FeedbackProps = {
  author: string;
  text: string;
  createdAt: string;
};
const Feedback = (props: FeedbackProps) => {
  const { author, text, createdAt } = props;
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading as="h3" size="sm" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider borderColor="gray.200" backgroundColor="gray.200" my={8} />
    </Box>
  );
};

export default Feedback;
