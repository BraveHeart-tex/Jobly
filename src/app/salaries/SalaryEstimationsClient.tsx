'use client';
import {
  Heading,
  Stack,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';
import SalaryDataTable from './SalaryDataTable';
import SalaryDataFilterForm from './SalaryDataFilterForm';

const SalaryEstimationsClient = () => {
  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Heading color={useColorModeValue('facebook.600', 'gray.300')}>
          Salary Estimations
        </Heading>
        <Text color={useColorModeValue('gray.500', 'gray.400')}>
          You can use this page to estimate your salary based on your location.
          Our dataset is based on the{' '}
          <chakra.span textDecoration={'underline'} textUnderlineOffset={'3px'}>
            Glassdoor
          </chakra.span>{' '}
          estimates.
        </Text>
      </Stack>
      <SalaryDataFilterForm />
      <SalaryDataTable />
    </Stack>
  );
};

export default SalaryEstimationsClient;
