'use client';

import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import JobTypeOptions from '@/app/utils/JobTypeOptions';
import customFetch from '@/app/utils/customFetch';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  chakra,
  Box,
  useColorModeValue,
  InputGroup,
  Textarea,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IAddJobFormInputTypes {
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  jobLocation: string;
  comments?: string;
}

const AddJobForm = () => {
  const toast = useToast();
  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IAddJobFormInputTypes>({
    defaultValues: {
      jobTitle: '',
      companyName: '',
      applicationStatus: '',
      jobType: '',
      jobLocation: '',
      comments: '',
    },
  });

  const onSubmit: SubmitHandler<IAddJobFormInputTypes> = (data) => {
    addJob(data);
  };

  const { mutate: addJob, isLoading } = useMutation({
    mutationFn: (data: IAddJobFormInputTypes) =>
      customFetch.post('/jobs', data),
    onSuccess: () => {
      reset();
      toast({
        title: 'Job added successfully',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: (error) => {
      toast({
        title: 'An error occurred',
        description: 'Unable to add job. Please try again later.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  return (
    <Box
      boxShadow={'xl'}
      rounded={'lg'}
      p={8}
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <chakra.form
        onSubmit={handleSubmit(onSubmit)}
        display={'grid'}
        gridTemplateColumns={'1fr'}
        gap={4}
        color={useColorModeValue('facebook.600', 'gray.300')}
      >
        <InputGroup
          display={'flex'}
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
          gap={4}
        >
          <FormControl isRequired isInvalid={Boolean(errors.jobTitle)}>
            <FormLabel>Job Title</FormLabel>
            <Input
              type='text'
              id='jobTitle'
              {...register('jobTitle', {
                required: 'Job Title is required.',
                minLength: {
                  value: 3,
                  message: 'Job Title must be at least 3 characters long',
                },
                maxLength: {
                  value: 100,
                  message: 'Job Title must be at most 100 characters long',
                },
              })}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              placeholder='Job title'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
            <FormErrorMessage>
              {errors.jobTitle && errors.jobTitle.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.companyName)}>
            <FormLabel>Company name</FormLabel>
            <Input
              type='text'
              id='companyName'
              {...register('companyName', {
                required: 'Company name is required.',
                minLength: {
                  value: 3,
                  message: 'Company name must be at least 3 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Company name must be at most 50 characters long',
                },
              })}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              placeholder='Company name'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
            <FormErrorMessage>
              {errors.companyName && errors.companyName.message}
            </FormErrorMessage>
          </FormControl>
        </InputGroup>
        <InputGroup
          display={'flex'}
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={4}
        >
          <FormControl isRequired isInvalid={Boolean(errors.applicationStatus)}>
            <FormLabel>Application Status</FormLabel>
            <Select
              id='applicationStatus'
              {...register('applicationStatus', {
                required: 'Application status is required.',
              })}
              placeholder='Select Application Status'
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              {applicationStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.applicationStatus && errors.applicationStatus.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={Boolean(errors.jobType)}>
            <FormLabel>Job Type</FormLabel>
            <Select
              id='jobType'
              {...register('jobType', {
                required: 'Job type is required.',
              })}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              {jobTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.jobType && errors.jobType.message}
            </FormErrorMessage>
          </FormControl>
        </InputGroup>
        <InputGroup
          display={'flex'}
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={4}
        >
          <FormControl isRequired isInvalid={Boolean(errors.jobLocation)}>
            <FormLabel>Job Location</FormLabel>
            <Input
              id='jobLocation'
              {...register('jobLocation', {
                required: 'Job location is required.',
                minLength: {
                  value: 3,
                  message: 'Job location must be at least 3 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Job location must be at most 50 characters long',
                },
              })}
              type='text'
              placeholder={'Job Location'}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
            <FormErrorMessage>
              {errors.jobLocation && errors.jobLocation.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Comments (Optional)</FormLabel>
            <Textarea
              id='comments'
              {...register('comments')}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
              placeholder='Optional comments for this job application.'
              resize={'none'}
            />
          </FormControl>
        </InputGroup>
        <Button
          type='submit'
          bg={useColorModeValue('facebook.500', 'gray.700')}
          color={'white'}
          _hover={{
            bg: useColorModeValue('facebook.300', 'gray.600'),
          }}
          mt={8}
          width={{
            base: '100%',
            lg: '50%',
            xl: '25%',
          }}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Add
        </Button>
      </chakra.form>
    </Box>
  );
};

export default AddJobForm;
