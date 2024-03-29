interface IJobCardHeaderProps {
  companyName: string;
  jobTitle: string;
}

const JobCardHeader = ({ companyName, jobTitle }: IJobCardHeaderProps) => {
  const avatarName = companyName.toUpperCase().split("");
  return (
    <header className="flex gap-4 mb-2">
      <div className="h-10 w-10 shrink-0 overflow-hidden bg-facebook rounded-full bg-faceboo dark:bg-gray-700 flex items-center justify-center text-white">
        <span>{`${avatarName[0] + avatarName[1]}`}</span>
      </div>
      <div className="grid grid-cols-1">
        <p className="font-[500] text-xl">{jobTitle}</p>
        <p className="text-sm">{companyName}</p>
      </div>
    </header>
  );
};
export default JobCardHeader;
