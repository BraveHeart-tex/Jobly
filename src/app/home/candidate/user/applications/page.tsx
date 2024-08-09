import { validateRequestByRole } from "@/lib/auth/actions";

const UserApplicationPage = async () => {
  await validateRequestByRole(["candidate"]);

  return <div>UserApplicationPage</div>;
};

export default UserApplicationPage;
