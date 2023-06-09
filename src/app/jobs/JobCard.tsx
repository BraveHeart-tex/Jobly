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
} from '@chakra-ui/react';
import { TfiLocationPin } from 'react-icons/tfi';
import { BsBriefcase, BsCalendarDay } from 'react-icons/bs';
import { GrStatusInfo } from 'react-icons/gr';
import { FiEye } from 'react-icons/fi';
import { Link } from '@chakra-ui/next-js';

// Will take props later
const JobCard = () => {
  return (
    <Box
      position={'relative'}
      p={4}
      bg={'gray.100'}
      boxShadow={'md'}
      rounded={'md'}
    >
      <chakra.header display={'flex'} gap={4}>
        <Avatar name='Company Name' rounded={'sm'} bgColor={'gray.700'} />
        <Stack gap={1}>
          <Text fontWeight={'500'} fontSize={'lg'}>
            Job Title
          </Text>
          <Text color={'gray.500'} fontSize={'sm'}>
            Company Name
          </Text>
        </Stack>
      </chakra.header>
      <hr className='divider' />
      <Stack gap={4}>
        {/* Job Card Info */}
        <SimpleGrid columns={2} gap={4}>
          {/* Location Info */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <TfiLocationPin />
            </chakra.span>
            <chakra.span>Job Location</chakra.span>
          </Box>
          {/* Location Info End */}
          {/* Job Type Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <BsBriefcase />
            </chakra.span>
            <chakra.span>Job Type</chakra.span>
          </Box>
          {/* Job Type End */}
          {/* Created At Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <BsCalendarDay />
            </chakra.span>
            <chakra.span>Created At</chakra.span>
          </Box>
          {/* Created At End */}
          {/* Application Status Start */}
          <Box display={'flex'} gap={4} alignItems={'center'}>
            <chakra.span>
              <GrStatusInfo />
            </chakra.span>
            <chakra.span>Application Status</chakra.span>
          </Box>
          {/* Application Status End */}
        </SimpleGrid>
        {/* Job Card Actions */}
        <Flex justifyContent={'space-between'}>
          <Flex gap={2}>
            <Button
              color={'white'}
              bgColor={'gray.700'}
              _hover={{
                bgColor: 'gray.600',
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
            color={'gray.500'}
            bg={'gray.200'}
            _hover={{
              bg: 'gray.300',
            }}
            leftIcon={<FiEye />}
          >
            <Link
              href={'/jobs'}
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
