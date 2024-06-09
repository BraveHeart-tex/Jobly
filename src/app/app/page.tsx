import { validateRequest } from "@/lib/auth/validate-request";
import { ROUTES } from "@/lib/constants";
import { redirect } from "next/navigation";

const AppHomePage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return <div>AppHomePage</div>;
};

export default AppHomePage;
