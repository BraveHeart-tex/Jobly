import type React from "react";

interface SettingBlockProps {
  title: string;
  description?: string;
  renderSettingControl: () => React.JSX.Element;
}

const SettingBlock = ({
  title,
  description,
  renderSettingControl,
}: SettingBlockProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-sm xl:text-base">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {renderSettingControl()}
    </div>
  );
};
export default SettingBlock;
