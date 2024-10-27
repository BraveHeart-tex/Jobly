import { cachedValidateRequest } from "@/lib/auth/validateRequest";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function LandingHome() {
  const { user } = await cachedValidateRequest();

  if (user) {
    redirect(SHARED_ROUTES.HOME);
  }

  return <main>Landing home page</main>;
}
