import { validateRequestByRole } from "@/features/auth/utils";

const EditProfilePage = async () => {
  const { user } = await validateRequestByRole(["employer", "candidate"]);

  return <div>Edit Profile Page {user.firstName}</div>;
};

export default EditProfilePage;
