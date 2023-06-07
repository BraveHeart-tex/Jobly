import {
  FlexProps,
  Box,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import Logo from '../Logo';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      borderBottomWidth='1px'
      bg={'gray.800'}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{
        base: 'space-between',
        md: 'flex-end',
      }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        color={'white'}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
        border={'1px'}
        borderColor={'gray.400'}
        _hover={{
          bg: 'gray.700',
        }}
      />

      <Box
        display={{
          base: 'block',
          md: 'none',
        }}
      >
        <Logo width='100px' height='100px' />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack color={'white'}>
                <Avatar size={'sm'} name='Bora Karaca' />
                <Text fontSize='sm'>Bora Karaca</Text>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={'gray.700'}
              borderColor={'blackAlpha.500'}
              color={'white'}
            >
              <MenuItem
                bg={'gray.700'}
                _hover={{
                  bg: 'gray.600',
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
