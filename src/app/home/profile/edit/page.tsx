import PageContainer from "@/components/common/PageContainer";
import UserProfileAboutSection from "@/features/user/profile/components/UserProfileAboutSection";
import UserProfileEducationSection from "@/features/user/profile/components/UserProfileEducationSection";
import UserProfilePersonalInformation from "@/features/user/profile/components/UserProfilePersonalInformation";
import UserProfileStats from "@/features/user/profile/components/UserProfileStats";
import UserProfileStickyHeader from "@/features/user/profile/components/UserProfileStickyHeader";
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
    <main className="pt-10">
      <PageContainer className="grid gap-2 pb-8 relative">
        <UserProfileStickyHeader />
        <UserProfilePersonalInformation />
        <UserProfileStats />
        <UserProfileAboutSection />
        <UserProfileWorkExperienceSection
          workExperiences={profileDetailsData.workExperiences}
        />
        <UserProfileEducationSection
          educationBackground={profileDetailsData.educationalBackground}
        />
      </PageContainer>
    </main>
  );
};

export default EditProfilePage;
