import { userRepository } from "@/features/user/repositories/userRepository";
import type { DBUser } from "@/server/db/schema/users";

export const userService = {
  async getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
  },
  async getUserById(id: DBUser["id"]) {
    return await userRepository.getUserById(id);
  },
};
