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
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import Logo from '../Logo';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      borderBottomWidth='1px'
      bg={useColorModeValue('facebook.500', 'gray.800')}
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
        borderColor={'white'}
        _hover={{
          bg: useColorModeValue('facebook.300', 'gray.700'),
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
              bg={useColorModeValue('facebook.600', 'gray.700')}
              borderColor={useColorModeValue('facebook.600', 'gray.700')}
              color={'white'}
            >
              <MenuItem
                bg={useColorModeValue('facebook.600', 'gray.700')}
                _hover={{
                  bg: useColorModeValue('facebook.500', 'gray.600'),
                }}
              >
                Sign out
              </MenuItem>
              <MenuItem
                display={'flex'}
                alignItems={'center'}
                gap={2}
                justifyContent={'space-between'}
                bg={useColorModeValue('facebook.600', 'gray.700')}
                _hover={{
                  bg: useColorModeValue('facebook.500', 'gray.600'),
                }}
              >
                <Text>Switch to {useColorModeValue('Dark', 'Light')} Mode</Text>
                <Switch
                  onChange={toggleColorMode}
                  aria-label='Toggle color mode'
                  position={'relative'}
                  size={'lg'}
                  colorScheme={useColorModeValue('gray', 'yellow')}
                >
                  {useColorModeValue(
                    <MoonIcon
                      position={'absolute'}
                      right={3}
                      top={1.5}
                      color={'gray.700'}
                    />,
                    <SunIcon
                      position={'absolute'}
                      left={1.5}
                      top={1.5}
                      color={'yellow.500'}
                    />
                  )}
                </Switch>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
