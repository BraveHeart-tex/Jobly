import { validateRequestByRole } from "@/features/auth/utils";

const AppHomePage = async () => {
  await validateRequestByRole(["candidate", "employer"]);

  return <div>AppHomePage</div>;
};

export default AppHomePage;
