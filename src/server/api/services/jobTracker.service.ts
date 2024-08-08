import type { MakeFieldsRequired } from "@/lib/types";
import type { JobTrackerApplicationSchema } from "@/schemas/jobTrackerApplicationSchema";
import { buildConflictUpdateColumns, db } from "@/server/db";
import { jobTrackerApplications } from "@/server/db/schema";
import type {
	JobTrackerApplication,
	JobTrackerApplicationInsertModel,
} from "@/server/db/schema/jobTrackerApplications";
import { and, eq } from "drizzle-orm";
import type { User } from "lucia";

export const getJobTrackerApplications = async (userId: User["id"]) => {
	return db.query.jobTrackerApplications.findMany({
		where: eq(jobTrackerApplications.userId, userId),
	});
};

export const createJobTrackerApplication = async (
	data: JobTrackerApplicationSchema,
) => {
	const [response] = await db
		.insert(jobTrackerApplications)
		.values(data)
		.$returningId();

	return response?.id;
};

export const deleteJobTrackerApplicationById = async ({
	id,
	userId,
}: {
	id: JobTrackerApplication["id"];
	userId: JobTrackerApplication["userId"];
}) => {
	return db
		.delete(jobTrackerApplications)
		.where(
			and(
				eq(jobTrackerApplications.id, id),
				eq(jobTrackerApplications.userId, userId),
			),
		);
};

export const updateJobTrackerApplication = async (
	data: MakeFieldsRequired<JobTrackerApplicationInsertModel, "id" | "userId">,
) => {
	return db
		.update(jobTrackerApplications)
		.set(data)
		.where(
			and(
				eq(jobTrackerApplications.id, data.id),
				eq(jobTrackerApplications.userId, data.userId),
			),
		);
};

export const deleteJobTrackerApplicationByStatus = async ({
	userId,
	status,
}: Pick<JobTrackerApplicationInsertModel, "userId" | "status">) => {
	return db
		.delete(jobTrackerApplications)
		.where(
			and(
				eq(jobTrackerApplications.status, status),
				eq(jobTrackerApplications.userId, userId),
			),
		);
};

export const saveJobTrackerApplicationDetails = async (
	data: JobTrackerApplicationInsertModel[],
) => {
	return db
		.insert(jobTrackerApplications)
		.values(data)
		.onDuplicateKeyUpdate({
			set: buildConflictUpdateColumns(jobTrackerApplications, ["id"]),
		});
};
