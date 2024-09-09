import { validateRequestByRole } from "@/features/auth/utils";

const UserApplicationPage = async () => {
  await validateRequestByRole(["candidate"]);

  return <div>UserApplicationPage</div>;
};

export default UserApplicationPage;
