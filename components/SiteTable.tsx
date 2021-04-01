import { Box, ChakraProps, Link, Skeleton, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { SiteData } from 'pages/api/sites';
import { Table, Tr, Th, Td } from './Table';
import NextLink from 'next/link';

const SiteTable = ({ sites }: { sites: SiteData[] }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => {
          return (
            <Box as="tr" key={site.id}>
              <Td fontWeight="600">{site.name}</Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                  <Link>View Feedback</Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), 'PPP')}</Td>
            </Box>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SiteTable;
