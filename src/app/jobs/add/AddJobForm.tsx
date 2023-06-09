'use client';

import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

const AddJobForm = () => {
  return (
    <form className='testing'>
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
      <FormControl isRequired>
        <FormLabel>Comments</FormLabel>
        <Input
          type='text'
          placeholder='Optional comments you may have regarding this job application.'
        />
      </FormControl>
    </form>
  );
};

export default AddJobForm;
