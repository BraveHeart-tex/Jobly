import type React from "react";

type AppLayoutProps = {
	children?: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
	return <main>{children}</main>;
};

export default AppLayout;
