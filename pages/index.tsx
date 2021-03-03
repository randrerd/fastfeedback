import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/icons';
import { Button, Flex, Container } from '@chakra-ui/react';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex width="90%" m="0 auto" textAlign="center" align="center" h="100vh">
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Container centerContent>
        <Logo boxSize="16" />

        {!auth.user ? (
          <Button
            variant="ghost"
            display="block"
            onClick={(e) => {
              // if (!auth.user && auth.signInWithGithub) {
              if (auth.signInWithGithub) {
                auth.signInWithGithub();
              }
              // } else if (auth.user && auth.signout) {
              //   auth.signout();
              // }
            }}
          >
            Sign In
          </Button>
        ) : (
          <Link href="/dashboard">
            <Button variant="ghost" display="block">
              Go to Dashboard
            </Button>
          </Link>
        )}
      </Container>
    </Flex>
  );
}
