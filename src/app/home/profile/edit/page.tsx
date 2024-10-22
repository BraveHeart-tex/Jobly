import ClientOnly from "@/components/common/ClientOnly";
import PageContainer from "@/components/common/PageContainer";
import FormDialogContainer from "@/features/user/profile/components/FormDialogContainer";
import UserProfileAboutSection from "@/features/user/profile/components/UserProfileAboutSection";
import UserProfileEducationSection from "@/features/user/profile/components/UserProfileEducationSection";
import UserProfilePersonalInformation from "@/features/user/profile/components/UserProfilePersonalInformation";
import UserProfileStickyHeader from "@/features/user/profile/components/UserProfileStickyHeader";
import UserProfileWorkExperienceSection from "@/features/user/profile/workExperience/components/UserProfileWorkExperienceSection";
import { SHARED_ROUTES } from "@/lib/routes";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const EditProfilePage = async () => {
  const profileDetailsData = await api.userProfile.fetchUserProfileDetails();

  if (!profileDetailsData) {
    redirect(SHARED_ROUTES.LOGIN);
  }

  return (
    <main>
      <PageContainer className="grid gap-2 pb-8 relative">
        <UserProfileStickyHeader
          avatarUrl={profileDetailsData.avatarUrl}
          userFullName={`${profileDetailsData.firstName} ${profileDetailsData.lastName}`}
          title={profileDetailsData.title}
        />
        <UserProfilePersonalInformation {...profileDetailsData} />
        <UserProfileAboutSection
          bio={profileDetailsData.bio}
          highlightedSkills={profileDetailsData.highlightedSkills}
        />
        <UserProfileWorkExperienceSection
          experiences={profileDetailsData.workExperiences}
        />
        <UserProfileEducationSection
          educationBackground={profileDetailsData.educationalBackground}
        />
      </PageContainer>
      <ClientOnly>
        <FormDialogContainer />
      </ClientOnly>
    </main>
  );
};

export default EditProfilePage;
