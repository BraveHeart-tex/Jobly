'use client';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  chakra,
  Box,
} from '@chakra-ui/react';

const AddJobForm = () => {
  return (
    <Box boxShadow={'md'} rounded={'lg'} p={8}>
      <chakra.form
        display={'grid'}
        gridTemplateColumns={{
          base: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(3, 1fr)',
        }}
        gap={4}
      >
        <FormControl isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input placeholder='Job title' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Company name</FormLabel>
          <Input placeholder='Company name' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Application Status</FormLabel>
          <Select placeholder='Select option'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Job Type</FormLabel>
          <Select>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Comments (Optional)</FormLabel>
          <Input
            type='text'
            placeholder='Optional comments for this job application.'
          />
        </FormControl>
      </chakra.form>
      <Button
        type='submit'
        bg={'gray.700'}
        color={'white'}
        _hover={{
          bg: 'gray.600',
        }}
        mt={8}
        width={{
          base: '100%',
          lg: '50%',
          xl: '25%',
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddJobForm;
