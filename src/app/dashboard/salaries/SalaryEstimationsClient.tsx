'use client';
import {
  Box,
  Button,
  Flex,
  Heading,
  Skeleton,
  Spinner,
  Stack,
  Text,
  chakra,
  useColorMode,
} from '@chakra-ui/react';
import SalaryDataTable from './SalaryDataTable';
import SalaryDataFilterForm from './SalaryDataFilterForm';
import { useQuery } from 'react-query';
import customFetch from '@/app/utils/customFetch';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { SalaryEstimationDataset } from '@prisma/client';

interface SalaryDataResponse {
  data: SalaryEstimationDataset[];
  page: number;
  hasNextPage: boolean;
}

const SalaryEstimationsClient = (): JSX.Element => {
  const colorMode = useColorMode().colorMode;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ['salaries', { page: currentPage }],
    async () => {
      const response = await customFetch.get('/salaryData', {
        params: { page: currentPage },
      });
      return response.data;
    }
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (!data && !isLoading) {
    return (
      <Flex
        justifyContent='center'
        gap={4}
        alignItems='center'
        flexDirection='column'
      >
        <Text>Something went wrong while fetching the data.</Text>
        <Button
          colorScheme='facebook'
          onClick={() => refetch()}
          leftIcon={<ArrowLeftIcon />}
        >
          Try again
        </Button>
      </Flex>
    );
  }

  if (isLoading && !isFetching) {
    return (
      <Flex
        justifyContent='center'
        gap={4}
        alignItems='center'
        flexDirection='column'
      >
        <Text>Fetching the latest salary estimations data...</Text>
        <Spinner color='facebook.500' />
      </Flex>
    );
  }

  return (
    <Stack gap={6}>
      <Stack gap={4}>
        <Heading
          color={colorMode === 'light' ? 'facebook.600' : 'facebook.300'}
        >
          Salary Estimations
        </Heading>
        <Text color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
          You can use this page to estimate your salary based on your location.
          Our dataset is based on the{' '}
          <chakra.span textDecoration='underline' textUnderlineOffset='3px'>
            Glassdoor
          </chakra.span>{' '}
          estimates.
        </Text>
      </Stack>
      <SalaryDataFilterForm />
      {isLoading ? (
        <Skeleton
          isLoaded={!isLoading && !isFetching}
          height={'500px'}
        ></Skeleton>
      ) : (
        <SalaryDataTable data={data} />
      )}
      <Text color='gray.500'>Showing 10 results per page by default.</Text>
      <Flex gap={4} justifyContent='center' alignItems='center'>
        <Button
          colorScheme='facebook'
          leftIcon={<ArrowLeftIcon />}
          isDisabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </Button>
        <Button
          colorScheme='facebook'
          rightIcon={<ArrowRightIcon />}
          onClick={handleNextPage}
          disabled={!data?.hasNextPage}
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
};

export default SalaryEstimationsClient;
