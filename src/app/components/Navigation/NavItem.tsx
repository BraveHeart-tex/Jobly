import { FlexProps, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { closeSidebar } from '@/app/redux/features/sidebar';
import { useAppDispatch } from '@/app/redux/hooks';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  href: string;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => dispatch(closeSidebar())}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        color={'white'}
        _hover={{
          bg: useColorModeValue('facebook.300', 'gray.700'),
          transform: 'translateX(12px)',
        }}
        transition={'all .3s ease'}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            color={'white'}
            _groupHover={{}}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
export default NavItem;
