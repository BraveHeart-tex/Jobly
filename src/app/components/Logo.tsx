import AppLogo from '@/app/assets/logo.svg';
import Image from 'next/image';

const Logo = () => {
  return <Image src={AppLogo} alt='Jobly application' />;
};

export default Logo;
