import AppLogo from "@/app/assets/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ILogoProps {
  width?: string;
  height?: string;
  className?: string;
}

const Logo = ({ className }: ILogoProps) => {
  return (
    <Image
      src={AppLogo}
      alt="Jobly application"
      width={300}
      height={300}
      className={cn("cursor-pointer dark:invert", className)}
    />
  );
};

export default Logo;
