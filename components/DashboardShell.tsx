import React from 'react';
import {
  Flex,
  Link,
  Stack,
  Avatar,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="gray.50">
      <Box backgroundColor="#ffffff">
        <Flex
          alignItems="center"
          width="80%"
          justifyContent="space-between"
          m="0 auto"
          backgroundColor="whiteAlpha.900"
        >
          <Stack
            spacing={2}
            isInline
            justifyContent="center"
            alignItems="center"
          >
            <Logo boxSize={7} />
            <Link pl={5} pr={5} pt={4} pb={4}>
              Sites
            </Link>
            <Link pl={5} pr={5} pt={4} pb={4}>
              Feedback
            </Link>
          </Stack>
          <Stack
            spacing={4}
            isInline
            justifyContent="flex-start"
            alignItems="center"
          >
            {auth.user && (
              <Link
                onClick={() => {
                  if (auth.signout) {
                    auth.signout();
                  }
                }}
              >
                Sign Out
              </Link>
            )}
            <Avatar src={auth.user?.photoUrl ? auth.user.photoUrl : ''} />
          </Stack>
        </Flex>
      </Box>
      <Box>
        <Box width="72.5%" m="0 auto" mt="2em">
          <Flex justify="space-between" align="flex-end">
            <Box>
              <Text color="gray.700">Sites</Text>
              <Heading>My Site</Heading>
            </Box>
            {auth.user && <AddSiteModal />}
          </Flex>
          <Box backgroundColor="#ffffff" pb="5em" mt="2em">
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardShell;
