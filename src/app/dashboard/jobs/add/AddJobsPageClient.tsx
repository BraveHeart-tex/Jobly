'use client';
import { Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import AddJobForm from './AddJobForm';

const AddJobsPageClient = () => {
  return (
    <Stack gap={8}>
      <Stack gap={4}>
        <Heading
          as={'h1'}
          color={useColorModeValue('facebook.500', 'gray.200')}
          textTransform={'capitalize'}
        >
          Add a new job application
        </Heading>
        <Text
          color={useColorModeValue('gray.500', 'gray.400')}
          width={{
            base: '100%',
            md: '75%',
          }}
          lineHeight={1.7}
        >
          You can fill out the form below to register your job application. Your
          application will be automatically added to the list of jobs in the
          Jobs List page.
        </Text>
      </Stack>
      <AddJobForm />
    </Stack>
  );
};

export default AddJobsPageClient;
