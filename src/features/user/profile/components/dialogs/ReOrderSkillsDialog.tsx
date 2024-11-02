"use client";
import FormDialog from "@/components/common/FormDialog";
import SortableDndContext from "@/components/common/SortableDndContext";
import SortableItem from "@/components/common/SortableItem";
import { showSuccessToast } from "@/components/toastUtils";
import { useGetUserSkills } from "@/features/user/profile/hooks/useGetUserSkills";
import { useProfilePageSearchParams } from "@/features/user/profile/hooks/useProfilePageSearchParams";
import { useSaveUserSkillOrder } from "@/features/user/profile/hooks/useSaveUserSkillOrder";
import type { OrderedUserSkill } from "@/features/user/profile/types";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useMemo, useState } from "react";

const ReOrderSkillsDialog = () => {
  const [orderedSkills, setOrderedSkills] = useState<OrderedUserSkill[]>([]);

  const { closeModal } = useProfilePageSearchParams();
  const router = useRouter();

  const { saveUserSkillOrder, isSavingUserSkillOrder } = useSaveUserSkillOrder({
    onSuccess: async () => {
      await closeModal();
      router.refresh();
      showSuccessToast("Skills order saved successfully.");
    },
  });
  const { userSkills, isFetchingUserSkills } = useGetUserSkills();

  const handleSubmit = async () => {
    if (!isDirty) {
      await closeModal();
      return;
    }

    saveUserSkillOrder({
      items: orderedSkills.map((item, index) => ({
        ...item,
        displayOrder: index + 1,
      })),
    });
  };

  const isDirty = useMemo(() => {
    if (!userSkills) return false;
    const prevSkillIds = userSkills.map((skill) => skill.skillId).join(",");
    const skillIds = orderedSkills.map((skill) => skill.skillId).join(",");

    return prevSkillIds !== skillIds;
  }, [userSkills, orderedSkills]);

  useEffect(() => {
    if (!userSkills || userSkills.length === 0) return;
    setOrderedSkills(userSkills);
  }, [userSkills]);

  return (
    <FormDialog
      title="Reorder Skills"
      onClose={closeModal}
      onSubmit={handleSubmit}
      isDirty={isDirty}
      isLoadingInitialData={isFetchingUserSkills}
      isSaveDisabled={isSavingUserSkillOrder}
      isCloseDisabled={isSavingUserSkillOrder}
    >
      {!isFetchingUserSkills && orderedSkills.length === 0 && (
        <p>No skills were found.</p>
      )}
      <SortableDndContext
        items={orderedSkills}
        setItems={(items) => {
          setOrderedSkills(
            items.map((item, index) => ({
              ...item,
              displayOrder: index + 1,
            })),
          );
        }}
      >
        <div className="flex flex-col gap-2">
          {orderedSkills
            .sort((a, b) => {
              if (a?.displayOrder && b?.displayOrder) {
                return a.displayOrder - b.displayOrder;
              }

              return a.id - b.id;
            })
            .map((userSkill) => (
              <SortableItem
                idField="id"
                nameField="name"
                key={userSkill.id}
                item={userSkill}
              />
            ))}
        </div>
      </SortableDndContext>
    </FormDialog>
  );
};
export default ReOrderSkillsDialog;
