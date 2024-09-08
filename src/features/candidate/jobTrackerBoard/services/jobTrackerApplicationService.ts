import type {
  JobTrackerApplication,
  JobTrackerApplicationInsertModel,
} from "@/server/db/schema/jobTrackerApplications";
import { jobTrackerApplicationRepository } from "../repositories/jobTrackerRepository";
import type { MakeFieldsRequired } from "@/lib/types";

export const jobTrackerApplicationService = {
  async getApplications(userId: number) {
    return await jobTrackerApplicationRepository.getApplicationsByUserId(
      userId,
    );
  },

  async createApplication(data: JobTrackerApplicationInsertModel) {
    return await jobTrackerApplicationRepository.createApplication(data);
  },

  async deleteApplication({
    id,
    userId,
  }: {
    id: JobTrackerApplication["id"];
    userId: JobTrackerApplication["userId"];
  }) {
    return await jobTrackerApplicationRepository.deleteApplicationById({
      id,
      userId,
    });
  },

  async updateApplication(
    data: MakeFieldsRequired<JobTrackerApplicationInsertModel, "id" | "userId">,
  ) {
    return await jobTrackerApplicationRepository.updateApplication(data);
  },

  async deleteApplicationsByStatus({
    userId,
    status,
  }: Pick<JobTrackerApplicationInsertModel, "userId" | "status">) {
    return await jobTrackerApplicationRepository.deleteApplicationsByStatus({
      userId,
      status,
    });
  },

  async saveApplicationDetails(data: JobTrackerApplicationInsertModel[]) {
    return await jobTrackerApplicationRepository.saveApplicationDetails(data);
  },
};
