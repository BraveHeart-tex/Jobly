'use client';
import React, { ReactNode } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';

import MobileNav from './Navigation/MobileNav';
import SidebarContent from './SidebarContent';

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobile nav */}
      <MobileNav onOpen={onOpen} />
      {/* main content */}
      <Box
        ml={{ base: 0, md: 60 }}
        p={{
          base: '2rem',
          lg: '4rem',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
