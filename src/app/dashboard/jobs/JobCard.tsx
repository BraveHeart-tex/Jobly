'use client';
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { TfiLocationPin } from 'react-icons/tfi';
import { BsBriefcase, BsCalendarDay, BsInfoCircle } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
import { Link } from '@chakra-ui/next-js';
import { JobApplication } from '@prisma/client';
import formatDate from '@/app/utils/formatDate';
import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import JobTypeOptions from '@/app/utils/JobTypeOptions';

interface IJobCardProps {
  jobApplication: JobApplication;
}

const JobCard = ({ jobApplication }: IJobCardProps) => {
  // TODO: will handle edit, delete and view details
  return (
    <Box
      position={'relative'}
      p={4}
      bg={useColorModeValue('gray.100', 'gray.800')}
      boxShadow={'md'}
      rounded={'md'}
    >
      <chakra.header display={'flex'} gap={4}>
        <Avatar
          name='Company Name'
          rounded={'sm'}
          bgColor={useColorModeValue('facebook.500', 'gray.700')}
        />
        <Stack gap={1}>
          <Text fontWeight={'500'} fontSize={'lg'}>
            {jobApplication.jobTitle}
          </Text>
          <Text color={'gray.500'} fontSize={'sm'}>
            {jobApplication.companyName}
          </Text>
        </Stack>
      </chakra.header>
      <hr className='divider' />
      <Stack gap={4}>
        {/* Job Card Info */}
        <SimpleGrid
          columns={2}
          gap={4}
          color={useColorModeValue('gray.600', 'gray.300')}
        >
          {/* Location Info */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <TfiLocationPin />
            </chakra.span>
            <chakra.span>{jobApplication.location}</chakra.span>
          </Box>
          {/* Location Info End */}
          {/* Job Type Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <BsBriefcase />
            </chakra.span>
            <chakra.span>{JobTypeOptions[jobApplication.jobType]}</chakra.span>
          </Box>
          {/* Job Type End */}
          {/* Created At Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <BsCalendarDay />
            </chakra.span>
            <chakra.span>
              {formatDate(new Date(jobApplication.createdAt))}
            </chakra.span>
          </Box>
          {/* Created At End */}
          {/* Application Status Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <BsInfoCircle />
            </chakra.span>
            <chakra.span>
              {ApplicationStatusOptions[jobApplication.applicationStatus]}
            </chakra.span>
          </Box>
          {/* Application Status End */}
        </SimpleGrid>
        {/* Job Card Actions */}
        <Flex justifyContent={'space-between'} mt={1}>
          <Flex gap={2}>
            <Button
              color={'white'}
              bgColor={useColorModeValue('facebook.500', 'gray.700')}
              _hover={{
                bgColor: useColorModeValue('facebook.300', 'gray.600'),
              }}
            >
              Edit
            </Button>
            <Button
              color={'white'}
              bgColor={'red.500'}
              _hover={{
                bgColor: 'red.600',
              }}
            >
              Delete
            </Button>
          </Flex>
          <Button
            variant={'ghost'}
            color={useColorModeValue('facebook.300', 'gray.400')}
            _hover={{
              color: useColorModeValue('facebook.500', 'gray.500'),
              bg: useColorModeValue('gray.200', 'gray.900'),
            }}
            leftIcon={<FiEye />}
          >
            <Link
              href={`dashboard/jobs/${jobApplication.id}`}
              _hover={{
                textDecoration: 'none',
              }}
            >
              View Details
            </Link>
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default JobCard;
