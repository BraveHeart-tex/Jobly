'use client';

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
} from '@chakra-ui/react';

const AddJobForm = () => {
  const handleSubmit = () => {
    console.log('submit');
  };
  return (
    <Box
      boxShadow={'xl'}
      rounded={'lg'}
      p={8}
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <chakra.form
        onSubmit={() => handleSubmit()}
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
          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              placeholder='Job title'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Company name</FormLabel>
            <Input
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              placeholder='Company name'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
        </InputGroup>
        <InputGroup
          display={'flex'}
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={4}
        >
          <FormControl isRequired>
            <FormLabel>Application Status</FormLabel>
            <Select
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              placeholder='Select option'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Job Type</FormLabel>
            <Select
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
            </Select>
          </FormControl>
        </InputGroup>
        <InputGroup
          display={'flex'}
          flexDirection={{ base: 'column', lg: 'row' }}
          gap={4}
        >
          <FormControl isRequired>
            <FormLabel>Job Location</FormLabel>
            <Input
              type='text'
              placeholder={'Job Location'}
              borderColor={useColorModeValue('facebook.200', 'gray.600')}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Comments (Optional)</FormLabel>
            <Textarea
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
        >
          Add
        </Button>
      </chakra.form>
    </Box>
  );
};

export default AddJobForm;
