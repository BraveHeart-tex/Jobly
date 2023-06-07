import AppLogo from '@/app/assets/logo.svg';
import { useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

interface ILogoProps {
  width?: string;
  height?: string;
}

const Logo = ({ width, height }: ILogoProps) => {
  return (
    <Image
      src={AppLogo}
      alt='Jobly application'
      style={{
        width: width || '100%',
        height: height || '100%',
        filter: 'invert(1)',
        cursor: 'pointer',
      }}
    />
  );
};

export default Logo;
