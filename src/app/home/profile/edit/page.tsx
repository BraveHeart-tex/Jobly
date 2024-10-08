import ClientOnly from "@/components/common/ClientOnly";
import PageContainer from "@/components/common/PageContainer";
import ProfileFormDialogContainer from "@/features/user/profile/components/ProfileFormDialogContainer";
import UserProfileAboutSection from "@/features/user/profile/components/UserProfileAboutSection";
import UserProfileAnalyticsSection from "@/features/user/profile/components/UserProfileAnalyticsSection";
import UserProfileEducationSection from "@/features/user/profile/components/UserProfileEducationSection";
import UserProfilePersonalInformation from "@/features/user/profile/components/UserProfilePersonalInformation";
import UserProfileStickyHeader from "@/features/user/profile/components/UserProfileStickyHeader";
import ProfileWorkExperienceList from "@/features/user/profile/workExperience/components/ProfileWorkExperiences";
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
      <PageContainer className="grid gap-2 pb-8 relative">
        <UserProfileStickyHeader />
        <UserProfilePersonalInformation />
        <UserProfileAnalyticsSection />
        <UserProfileAboutSection
          bio={profileDetailsData.bio}
          highlightedSkills={profileDetailsData.highlightedSkills}
        />
        <ProfileWorkExperienceList
          experiences={profileDetailsData.workExperiences}
        />
        <UserProfileEducationSection
          educationBackground={profileDetailsData.educationalBackground}
        />
      </PageContainer>
      <ClientOnly>
        <ProfileFormDialogContainer />
      </ClientOnly>
    </main>
  );
};

export default EditProfilePage;
