import { validateRequestByRole } from "@/lib/auth/actions";

const AppHomePage = async () => {
	await validateRequestByRole(["candidate", "employer"]);

	return <div>AppHomePage</div>;
};

export default AppHomePage;
