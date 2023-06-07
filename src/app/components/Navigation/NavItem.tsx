import { FlexProps, Flex, Icon } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  href: string;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
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
          bg: 'gray.700',
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
