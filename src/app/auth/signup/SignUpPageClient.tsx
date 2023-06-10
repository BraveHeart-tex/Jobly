'use client';
import AppLogo from '@/app/assets/logo.svg';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Stack,
  useColorModeValue,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPageClient = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post('/api/user/auth/register', data)
      .then((response) => {
        setIsLoading(false);
        toast({
          title: 'Successfully signed up.',
          description: 'We have created your account for you.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        router.push('/auth/login');
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        toast({
          title: 'An error occurred.',
          // @ts-ignore
          description: error.response?.data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('facebook.500', 'gray.900')}
      p={4}
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
        borderRadius='md'
        boxShadow='lg'
        maxW='400px'
        w='100%'
      >
        <Flex direction='column' align='center' mb={8}>
          <Image
            src={AppLogo}
            alt='Jobly Logo'
            width={200}
            style={{
              filter: useColorModeValue('invert(0)', 'invert(1)'),
              marginBottom: '1rem',
            }}
          />
          <Heading
            as='h2'
            size='xl'
            textAlign='center'
            mb={4}
            color={useColorModeValue('facebook.500', 'gray.100')}
          >
            Create an Account
          </Heading>
          <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.300')}>
            Start your journey by creating a new account
          </Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} color={useColorModeValue('gray.600', 'gray.300')}>
            {/* @ts-ignore */}
            <FormControl isInvalid={errors.name}>
              <Input
                id='name'
                type='text'
                placeholder='Full Name'
                size='lg'
                borderRadius='md'
                borderColor={useColorModeValue('gray.400', 'gray.700')}
                focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
                {...register('name', {
                  required: 'Full name is required.',
                })}
              />
              <FormErrorMessage>
                {/* @ts-ignore */}
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            {/* @ts-ignore */}
            <FormControl isInvalid={errors.email}>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                size='lg'
                borderRadius='md'
                borderColor={useColorModeValue('gray.400', 'gray.700')}
                focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
                {...register('email', {
                  required: 'A valid email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email.',
                  },
                })}
              />
              <FormErrorMessage>
                {/* @ts-ignore */}
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            {/* @ts-ignore */}
            <FormControl isInvalid={errors.password}>
              <Input
                id='password'
                type={'password'}
                placeholder='Password'
                size='lg'
                borderRadius='md'
                borderColor={useColorModeValue('gray.400', 'gray.700')}
                focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
                {...register('password', {
                  required: 'Password is required.',
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                })}
              />
              <FormErrorMessage>
                {/* @ts-ignore */}
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              size='lg'
              color='white'
              bg={useColorModeValue('facebook.500', 'gray.700')}
              _hover={{
                bg: useColorModeValue('facebook.300', 'blackAlpha.400'),
              }}
              borderRadius='md'
              type='submit'
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Sign Up
            </Button>
            <Divider />
            <Button
              variant={'outline'}
              leftIcon={<FcGoogle />}
              size='lg'
              borderRadius='md'
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/dashboard',
                })
              }
              isLoading={isLoading}
              isDisabled={isLoading}
              fontSize={{ base: '15px', md: '17px', lg: '18px' }}
            >
              Sign Up with Google
            </Button>
            <Text textAlign='center' mt={4}>
              Already have an account?{' '}
              <Link
                color={useColorModeValue('facebook.600', 'yellow.400')}
                href='/auth/login'
              >
                Log In
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default SignUpPageClient;
