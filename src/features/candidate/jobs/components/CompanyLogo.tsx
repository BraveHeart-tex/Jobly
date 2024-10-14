import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarPlaceholder } from "@/lib/utils/string";
import Image from "next/image";

interface CompanyLogoProps {
  companyName: string;
  logo?: string | null;
  className?: string;
}

const CompanyLogo = ({ companyName, logo, className }: CompanyLogoProps) => {
  if (!logo) {
    return (
      <Avatar className={className}>
        <AvatarFallback>{getAvatarPlaceholder(companyName)}</AvatarFallback>
      </Avatar>
    );
  }

  return <Image src={logo} width={80} height={80} alt={companyName} />;
};

export default CompanyLogo;
