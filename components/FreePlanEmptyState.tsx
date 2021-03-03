import React from 'react';
import { Stack, Heading, Text, Button } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => {
  return (
    <DashboardShell>
      <Stack
        borderRadius="8px"
        spacing="3"
        m="0 auto"
        width="50%"
        textAlign="center"
      >
        <Heading size="md">Get feedback on your site instantly.</Heading>
        <Text>Start today, then grow with us.</Text>
        <Button
          color="whiteAlpha.900"
          backgroundColor="blackAlpha.900"
          variant="solid"
          size="md"
          width="min"
          alignSelf="center"
        >
          Upgrade to starters
        </Button>
      </Stack>
    </DashboardShell>
  );
};

export default FreePlanEmptyState;
