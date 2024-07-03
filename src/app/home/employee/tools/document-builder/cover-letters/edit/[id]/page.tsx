import { validateRequestByRole } from "@/lib/auth/actions";

const CreateCoverLetterPage = async () => {
  await validateRequestByRole(["employee"]);
  return <div>CreateCoverLetterPage</div>;
};

export default CreateCoverLetterPage;
