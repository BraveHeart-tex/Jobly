'use client';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';

const NotFoundPageClient = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      minH={'100vh'}
      py={10}
      px={6}
    >
      <Heading
        display='inline-block'
        as='h2'
        size='2xl'
        color={useColorModeValue('facebook.500', 'gray.200')}
      >
        404 Page Not Found :(
      </Heading>
      <Text color={'gray.500'} mb={6} mt={3}>
        It looks like you found a glitch in the matrix...
      </Text>
      <Button
        color='white'
        bg={useColorModeValue('facebook.500', 'gray.700')}
        _hover={{
          bg: useColorModeValue('facebook.300', 'gray.600'),
        }}
        variant='solid'
      >
        <Link
          href='/dashboard'
          _hover={{
            textDecoration: 'none',
          }}
        >
          Go to Dashboard
        </Link>
      </Button>
    </Box>
  );
};

export default NotFoundPageClient;
