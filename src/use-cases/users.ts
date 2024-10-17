import type { UpdateUserNameAndLastNameParams } from "@/data-access/types";
import { updateUserNameAndLastName } from "@/data-access/users";

export const updateUserNameAndLastNameUseCase = async ({
  userId,
  firstName,
  lastName,
}: UpdateUserNameAndLastNameParams) => {
  return await updateUserNameAndLastName({ userId, firstName, lastName });
};
