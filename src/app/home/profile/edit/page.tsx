import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import EditUserProfileForm from "@/features/user/profile/components/EditUserProfileForm";
import { groupExperiences } from "@/features/user/profile/components/utils";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const profileDetailsData = await api.userProfile.getUserProfileInformation();

  if (!profileDetailsData) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  console.info(
    JSON.stringify(
      groupExperiences(profileDetailsData.workExperiences),
      null,
      2,
    ),
  );

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
