import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import EditUserProfileForm from "@/features/user/profile/components/EditUserProfileForm";
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
        <PageTitle>Edit Profile</PageTitle>
        <EditUserProfileForm initialData={profileDetailsData} />
      </PageContainer>
    </main>
  );
};

export default EditProfilePage;
