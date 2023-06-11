'use client';
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import {
  setCitySearchTerm,
  setSearchTerm,
  setSortTerm,
  clearFilters,
} from '@/app/redux/features/search';
import { useAppDispatch } from '@/app/redux/hooks';
import { useForm } from 'react-hook-form';

const SalaryDataFilterForm = () => {
  const dispatch = useAppDispatch();
  const { reset, register } = useForm();

  const clearAllFilters = () => {
    reset();
    dispatch(clearFilters());
  };

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
            <FormLabel color={useColorModeValue('gray.600', 'gray.400')}>
              Job Title
            </FormLabel>
            <Input
              {...register('searchTerm')}
              type='text'
              onChange={(e) => {
                setTimeout(() => {
                  dispatch(setSearchTerm(e.target.value));
                }, 3000);
              }}
              placeholder='Search by job title'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.400')}>
              City / State
            </FormLabel>
            <Input
              {...register('citySearchTerm')}
              onChange={(e) => {
                setTimeout(() => {
                  dispatch(setCitySearchTerm(e.target.value));
                }, 3000);
              }}
              type='text'
              placeholder='Search by city or state'
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={useColorModeValue('gray.600', 'gray.400')}>
              Sort by Salary
            </FormLabel>
            <Select
              {...register('sortTerm')}
              onChange={(e) => dispatch(setSortTerm(e.target.value))}
              focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
            >
              <option value='desc'>Highest</option>
              <option value='asc'>Lowest</option>
            </Select>
          </FormControl>
        </SimpleGrid>
        <Flex gap={4}>
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
            bg={useColorModeValue('red.500', 'gray.700')}
            _hover={{
              bg: useColorModeValue('facebook.300', 'gray.600'),
            }}
            onClick={() => clearAllFilters()}
          >
            Clear Filters
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default SalaryDataFilterForm;
