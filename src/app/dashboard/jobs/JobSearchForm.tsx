'use client';
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
import React from 'react';

const JobSearchForm = () => {
  const clearFilters = () => {
    // TODO: CLEAR FILTERS with setValue from react-hook-form
    console.log('clear filters');
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
              type='text'
              placeholder='Search by company name'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Application Status
            </FormLabel>
            <Select defaultValue={'all'} focusBorderColor='gray.600'>
              <option value='all'>All</option>
              <option value='interview'>Interview</option>
              <option value='declined'>Declined</option>
              <option value='pending'>Pending</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Job Type
            </FormLabel>
            <Select
              defaultValue={'all'}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              {/* TODO: CHANGE VALUES */}
              <option value='all'>All</option>
              <option value='remote'>Remote</option>
              <option value='full-time'>Full Time</option>
              <option value='part-time'>Part Time</option>
              <option value='internship'>Internship</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.200')}>
              Sort
            </FormLabel>
            <Select
              defaultValue={'all'}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value='all'>All</option>
              <option value='remote'>Latest</option>
              <option value='full-time'>Oldest</option>
            </Select>
          </FormControl>
        </SimpleGrid>
        <Button
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
          onClick={() => clearFilters()}
        >
          Clear Filters
        </Button>
      </form>
    </Box>
  );
};

export default JobSearchForm;
