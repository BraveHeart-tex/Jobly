import { validateRequestByRole } from "@/features/auth/utils";

const CreateCoverLetterPage = async () => {
  await validateRequestByRole(["candidate"]);
  return <div>CreateCoverLetterPage</div>;
};

export default CreateCoverLetterPage;
