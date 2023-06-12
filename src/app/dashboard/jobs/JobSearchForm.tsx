'use client';
import {
  clearFilters,
  setSearchTerm,
  setCompanySearchTerm,
  setApplicationStatus,
  setJobType,
  setSortTerm,
} from '@/app/redux/features/search';
import { useAppDispatch } from '@/app/redux/hooks';
import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import JobTypeOptions from '@/app/utils/JobTypeOptions';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFieldValues {
  searchTerm: string;
  companySearchTerm: string;
  applicationStatus: string;
  jobType: string;
  sortTerm: string;
}

const JobSearchForm = () => {
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFieldValues>();

  const clearAllFilters = () => {
    reset();
    dispatch(clearFilters());
  };

  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);

  const onsubmit: SubmitHandler<IFieldValues> = async (data) => {
    dispatch(setSearchTerm(data.searchTerm));
    dispatch(setCompanySearchTerm(data.companySearchTerm));
    dispatch(setApplicationStatus(data.applicationStatus));
    dispatch(setJobType(data.jobType));
    dispatch(setSortTerm(data.sortTerm));
  };

  return (
    <Box>
      <form
        style={{
          padding: '1rem',
          backgroundColor: useColorModeValue('#edf2f7', '#1A202C'),
          borderRadius: '8px',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
        }}
        onSubmit={handleSubmit(onsubmit)}
      >
        <Heading
          as={'h3'}
          fontSize={'3xl'}
          color={useColorModeValue('facebook.500', 'gray.200')}
        >
          Job Application Search Form
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            lg: 2,
            xl: 3,
          }}
          gap={4}
          my={4}
        >
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Job Title
            </FormLabel>
            <Input
              id='searchTerm'
              {...register('searchTerm')}
              type='text'
              placeholder='Search by job title'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Company
            </FormLabel>
            <Input
              id='companySearchTerm'
              {...register('companySearchTerm')}
              type='text'
              placeholder='Search by company name'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Application Status
            </FormLabel>
            <Select
              defaultValue={''}
              id='applicationStatus'
              {...register('applicationStatus')}
              focusBorderColor='gray.600'
            >
              <option value=''>All</option>
              {applicationStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Job Type
            </FormLabel>
            <Select
              id='jobType'
              {...register('jobType')}
              defaultValue={''}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value=''>All</option>
              {jobTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Sort
            </FormLabel>
            <Select
              id='sortTerm'
              {...register('sortTerm')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </FormControl>
        </SimpleGrid>
        <Box>
          <Button
            type='submit'
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            mr={{ base: 0, lg: 2 }}
            my={{ base: 2, lg: 0 }}
            w={{
              base: 'full',
              md: '50%',
              lg: '25%',
            }}
            color={'white'}
            bg={useColorModeValue('facebook.500', 'gray.700')}
            _hover={{
              bg: useColorModeValue('facebook.300', 'gray.600'),
            }}
          >
            Search
          </Button>
          <Button
            w={{
              base: 'full',
              md: '50%',
              lg: '25%',
            }}
            color={'white'}
            bg={useColorModeValue('red.500', 'gray.800')}
            _hover={{
              bg: useColorModeValue('red.400', 'gray.900'),
            }}
            onClick={() => clearAllFilters()}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Clear Filters
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default JobSearchForm;
