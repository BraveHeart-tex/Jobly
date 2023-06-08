'use client';
import {
  Box,
  Flex,
  Heading,
  chakra,
  Text,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import AccordionComponent from '../AccordionComponent';
import { FAQContent, FAQTitles } from '@/app/utils/FAQContent';
import { Link } from '@chakra-ui/next-js';

const WelcomePageComponent = () => {
  return (
    <Box>
      <Flex flexDirection={'column'} gap={4} textAlign={'center'}>
        <Heading color={'gray.700'} as={'h1'} fontSize={'5xl'}>
          Welcome to Jobly!
        </Heading>
        <chakra.p color={'gray.500'}>
          All your job applications in one, convenient place.
        </chakra.p>
      </Flex>
      <Flex flexDirection={'column'} gap={8}>
        <Flex flexDirection={'column'} gap={4}>
          <Heading color={'gray.700'} as={'h2'} fontSize={'3xl'}>
            What is Jobly?
          </Heading>
          <Text
            color={'gray.500'}
            fontSize={'md'}
            lineHeight={1.7}
            width={{
              base: '100%',
              lg: '50%',
            }}
          >
            Jobly is a web application that allows you to keep track of all your
            job applications in one place. You can add, edit, and delete
            applications as you please.
          </Text>
        </Flex>
        <Flex gap={4} flexDirection={'column'}>
          <Heading color={'gray.700'} as={'h2'} fontSize={'3xl'}>
            How can I use Jobly?
          </Heading>
          <Text color={'gray.500'} fontSize={'md'} lineHeight={1.7}>
            Check out the FAQ below for more information on how to use Jobly.
          </Text>
          <Box mt={4}>
            <AccordionComponent titles={FAQTitles} contents={FAQContent} />
          </Box>
        </Flex>
      </Flex>
      <Flex flexDirection={'column'} gap={4} mt={8}>
        <Heading color={'gray.700'} as={'h3'} fontSize={'2xl'}>
          Useful Links to Get Started
        </Heading>
        <SimpleGrid columns={2} spacing={4}>
          {/* TODO: Map over useful links array */}
          <GridItem>
            <Link
              href={'/jobs'}
              color={'gray.500'}
              fontSize={'md'}
              lineHeight={1.7}
              _hover={{
                color: 'gray.700',
              }}
            >
              Jobs
            </Link>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default WelcomePageComponent;
