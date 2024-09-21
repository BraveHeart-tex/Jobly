import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { authActions } from "@/features/auth/actions/authActions";
import EditUserProfileForm from "@/features/user/profile/components/EditUserProfileForm";
import { SHARED_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const user = await authActions.getCurrentUser();

  if (!user) {
    redirect(SHARED_ROUTES.LOGIN);
  }

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
