import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
} from '@chakra-ui/react';
import React from 'react';

interface ISalaryDataFilterFormProps {}

const SalaryDataFilterForm = (props: ISalaryDataFilterFormProps) => {
  // TODO: show 30 results per page
  const clearFilters = () => {};
  return (
    <Box>
      <form>
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
            <FormLabel color={'gray.600'}>Job Title</FormLabel>
            <Input
              type='text'
              placeholder='Search by job title'
              focusBorderColor='gray.500'
            />
          </FormControl>
          <FormControl>
            <FormLabel color={'gray.600'}>City / State</FormLabel>
            <Input
              type='text'
              placeholder='Search by city or state'
              focusBorderColor='gray.500'
            />
          </FormControl>
          <FormControl>
            <FormLabel color={'gray.600'}>Sort</FormLabel>
            <Select defaultValue={'all'} focusBorderColor='gray.500'>
              <option value='all'>All</option>
              <option value='remote'>Highest</option>
              <option value='full-time'>Lowest</option>
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
          bg={'gray.700'}
          _hover={{
            bg: 'gray.600',
          }}
          onClick={() => clearFilters()}
        >
          Clear Filters
        </Button>
      </form>
    </Box>
  );
};

export default SalaryDataFilterForm;
