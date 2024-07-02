import { validateRequest } from "@/lib/auth/validate-request";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

const AppHomePage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  return <div>AppHomePage</div>;
};

export default AppHomePage;
