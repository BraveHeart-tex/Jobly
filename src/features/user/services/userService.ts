import { userRepository } from "@/features/user/repositories/userRepository";
import type { DBUser, DBUserInsertModel } from "@/server/db/schema/users";

export const userService = {
  async getUserByEmail(email: string) {
    return await userRepository.getUserByEmail(email);
  },
  async getUserById(id: DBUser["id"]) {
    return await userRepository.getUserById(id);
  },
  async createUser(data: DBUserInsertModel) {
    return await userRepository.createUser(data);
  },
  async deleteUserById(id: DBUser["id"]) {
    return await userRepository.deleteUserById(id);
  },
};
