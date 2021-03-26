import React from 'react';
import { Stack, Heading, Text, Button } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => {
  return (
    <Stack
      spacing={'3'}
      m="0 auto"
      width="50%"
      textAlign="center"
      align="center"
      py="5em"
    >
      <Heading size="md">You haven't added any sites</Heading>
      <Text>Welcome 👋🏼 Let's get started</Text>

      <AddSiteModal isFirst />
    </Stack>
  );
};

export default EmptyState;
