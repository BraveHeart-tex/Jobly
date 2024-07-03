import { validateRequestByRole } from "@/lib/auth/actions";

const UserApplicationPage = async () => {
  await validateRequestByRole(["employee"]);

  return <div>UserApplicationPage</div>;
};

export default UserApplicationPage;
