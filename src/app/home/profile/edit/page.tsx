import PageContainer from "@/components/common/PageContainer";
import UserProfileAboutSection from "@/features/user/profile/components/UserProfileAboutSection";
import UserProfilePersonalInformation from "@/features/user/profile/components/UserProfilePersonalInformation";
import UserProfileStats from "@/features/user/profile/components/UserProfileStats";
import UserProfileWorkExperienceSection from "@/features/user/profile/components/UserProfileWorkExperienceSection";
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
      <PageContainer className="grid gap-2 pb-4">
        <UserProfilePersonalInformation />
        <UserProfileStats />
        <UserProfileAboutSection />
        <UserProfileWorkExperienceSection
          workExperiences={profileDetailsData.workExperiences}
        />
      </PageContainer>
    </main>
  );
};

export default EditProfilePage;
