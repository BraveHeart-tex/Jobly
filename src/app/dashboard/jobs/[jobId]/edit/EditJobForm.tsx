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
import { JobApplication } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

interface IEditJobFormInputTypes {
  jobTitle: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  jobLocation: string;
  comments?: string;
}

interface IEditJobModalFormProps {
  currentJobApplication: JobApplication;
}

const EditJobModalForm = ({
  currentJobApplication,
}: IEditJobModalFormProps) => {
  const queryClient = useQueryClient();

  const toast = useToast();

  const applicationStatusOptions = Object.values(ApplicationStatusOptions);
  const jobTypeOptions = Object.values(JobTypeOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditJobFormInputTypes>({
    defaultValues: {
      jobTitle: currentJobApplication.jobTitle,
      companyName: currentJobApplication.companyName,
      applicationStatus:
        ApplicationStatusOptions[currentJobApplication.applicationStatus],
      jobType: JobTypeOptions[currentJobApplication.jobType],
      jobLocation: currentJobApplication.location,
      comments: currentJobApplication.comments || '',
    },
  });

  const onSubmit: SubmitHandler<IEditJobFormInputTypes> = (data) => {
    editJob(data);
  };

  const { mutate: editJob, isLoading: isEditJobLoading } = useMutation({
    mutationFn: async (data: IEditJobFormInputTypes) => {
      const response = await customFetch.put(
        `/jobs/${currentJobApplication.id}`,
        data
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('fetchJobs');
      toast({
        title: 'Job application edited successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    onError: () => {
      toast({
        title: 'Error editing job application',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
  });

  return (
    <Box mb={4}>
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
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
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
          flexDirection={{
            base: 'column',
            lg: 'row',
          }}
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
          width={{
            base: '100%',
            lg: '50%',
            xl: '25%',
          }}
          isLoading={isEditJobLoading}
          isDisabled={isEditJobLoading}
        >
          Edit
        </Button>
      </chakra.form>
    </Box>
  );
};

export default EditJobModalForm;
