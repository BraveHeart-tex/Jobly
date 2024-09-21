import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import EditUserProfileForm from "@/features/user/profile/components/EditUserProfileForm";
import { api } from "@/trpc/server";

const EditProfilePage = async () => {
  const profileDetails = await api.userProfile.getUserProfileInformation();

  return (
    <main>
      <PageContainer className="grid gap-2">
        <PageTitle>Edit Profile</PageTitle>
        <EditUserProfileForm />
      </PageContainer>
    </main>
  );
};

export default EditProfilePage;
