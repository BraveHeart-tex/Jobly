import PageContainer from "@/components/common/PageContainer";
import UserProfilePersonalInformation from "@/features/user/profile/components/UserProfilePersonalInformation";
import UserProfileStats from "@/features/user/profile/components/UserProfileStats";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const profileDetailsData = await api.userProfile.getUserProfileInformation();

  if (!profileDetailsData) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  return (
    <main>
      <PageContainer className="grid gap-2">
        <UserProfilePersonalInformation />
        <UserProfileStats />
      </PageContainer>
    </main>
  );
};

export default EditProfilePage;
