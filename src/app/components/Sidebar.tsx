'use client';
import React, { ReactNode } from 'react';
import { Box, useColorModeValue, Drawer, DrawerContent } from "@chakra-ui/react";
import MobileNav from './Navigation/MobileNav';
import SidebarContent from './SidebarContent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleSidebar } from '../redux/features/sidebar';
import { Button } from "@/components/ui/button";
import { seedData } from "../../../seed";

export default function SidebarWithHeader({ children, username }: { children: ReactNode; username: string }) {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.sidebarReducer);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={() => dispatch(toggleSidebar())}
        returnFocusOnClose={false}
        onOverlayClick={() => dispatch(toggleSidebar())}
        size="full"
      >
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
      {/* mobile nav */}
      <MobileNav username={username} />
      {/* main content */}
      <Box
        ml={{ base: 0, md: 60 }}
        p={{
          base: "1rem",
          lg: "4rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
