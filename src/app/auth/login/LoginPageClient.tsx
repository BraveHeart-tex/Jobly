'use client';
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  Divider,
  Flex,
  Stack,
  Text,
  Link,
  useToast,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import AppLogo from '@/app/assets/logo.svg';
import { SignInResponse, signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginPageClient = () => {
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();
  const { register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback: SignInResponse | undefined) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast({
          title: 'Sign in successful.',
          description: 'Welcome back!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        router.push('/dashboard');
      }
      if (callback?.error) {
        toast({
          title: 'Sign in failed, please try again.',
          description: 'Invalid email or password.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
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
            color={useColorModeValue('facebook.500', '')}
          >
            Welcome!
          </Heading>
          <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.400')}>
            Log in to access your account
          </Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl>
              <Input
                id='email'
                type='email'
                placeholder='Email'
                required
                size='lg'
                borderRadius='md'
                borderColor={useColorModeValue('gray.400', 'gray.700')}
                focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
                {...register('email', {
                  required: 'This is required',
                })}
              />
            </FormControl>
            <FormControl>
              <Input
                id='password'
                type='password'
                placeholder='Password'
                required
                size='lg'
                borderRadius='md'
                borderColor={useColorModeValue('gray.400', 'gray.700')}
                focusBorderColor={useColorModeValue('facebook.500', 'gray.500')}
                {...register('password', {
                  required: 'This is required',
                })}
              />
            </FormControl>
            <Button
              color='white'
              bg={useColorModeValue('facebook.500', 'gray.700')}
              _hover={{
                bg: useColorModeValue('facebook.300', 'blackAlpha.400'),
              }}
              size='lg'
              borderRadius='md'
              type='submit'
              isDisabled={loading}
              isLoading={loading}
            >
              Sign In
            </Button>
            <Divider />
            <Button
              variant={'outline'}
              leftIcon={<FcGoogle />}
              size='lg'
              borderRadius='md'
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              fontSize={{ base: '15px', md: '17px', lg: '18px' }}
              isDisabled={loading}
              isLoading={loading}
            >
              Sign In with Google
            </Button>
            <Text textAlign='center' mt={4}>
              Don&apos;t have an account?{' '}
              <Link
                color={useColorModeValue('facebook.600', 'yellow.400')}
                href='/auth/signup'
              >
                Sign Up
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPageClient;
