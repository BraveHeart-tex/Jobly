import type {
  JobTrackerApplication,
  JobTrackerApplicationStatus,
} from "@/server/db/schema/jobTrackerApplications";

export interface Column {
  id: JobTrackerApplicationStatus;
  title: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

export type JobType = "Job";

export interface TaskDragData {
  type: JobType;
  job: JobTrackerApplication;
}
