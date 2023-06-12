'use client';
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from './Logo';
import NavItem from './Navigation/NavItem';
import LinkItems from '../utils/NavLinks';
import { toggleSidebar } from '../redux/features/sidebar';
import { useAppDispatch } from '../redux/hooks';

interface SidebarProps extends BoxProps {}

const SidebarContent = ({ ...rest }: SidebarProps) => {
  const dispatch = useAppDispatch();
  return (
    <Box
      transition='3s ease'
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
      bg={useColorModeValue('facebook.500', 'gray.800')}
    >
      <Flex
        h='20'
        alignItems='center'
        mx='8'
        justifyContent='space-between'
        mt={3}
      >
        <Logo />
        <CloseButton
          color={'white'}
          display={{ base: 'flex', md: 'none' }}
          onClick={() => dispatch(toggleSidebar())}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem href={link.href} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
