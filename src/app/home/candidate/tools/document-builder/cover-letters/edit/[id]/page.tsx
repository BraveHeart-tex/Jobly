import { validateRequestByRole } from "@/lib/auth/actions";

const CreateCoverLetterPage = async () => {
  await validateRequestByRole(["candidate"]);
  return <div>CreateCoverLetterPage</div>;
};

export default CreateCoverLetterPage;
