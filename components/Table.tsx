import { Box, ChakraProps, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

export const Th: FunctionComponent<ChakraProps> = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    {...props}
  ></Text>
);

export const Td: FunctionComponent<ChakraProps> = (props) => {
  const { children } = props;

  return (
    <Box
      as="td"
      color="gray.900"
      p={4}
      borderBottom="1px solid"
      borderBottomColor="gray.100"
      {...props}
    >
      {children}
    </Box>
  );
};

export const Tr: FunctionComponent<ChakraProps> = (props) => (
  <Box
    as="tr"
    backgroundColor="gray.50"
    borderTopLeftRadius={8}
    borderTopRightRadius={8}
    borderBottom="1px solid"
    borderBottomColor="gray.200"
    height="40px"
    {...props}
  ></Box>
);

export const Table: FunctionComponent<ChakraProps> = (props) => {
  const { children } = props;
  return (
    <Box
      as="table"
      textAlign="left"
      backgroundColor="white"
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
      width="100%"
      {...props}
    >
      {children}
    </Box>
  );
};
