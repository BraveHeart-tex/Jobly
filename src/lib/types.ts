import prisma from "@/app/libs/prismadb";
import { IconType } from "react-icons/lib";

export interface TotalApplicationStat {
  _count: {
    applicationStatus: number;
  };
  applicationStatus: string;
}

export interface ApplicationStatusCount {
  status: string;
  count: number;
}

export type TableMap = {
  [key in TableName]: (typeof prisma)[key];
};

export type WhereCondition<T> = {
  [key in keyof T]?: T[key];
};

export type SelectCondition<T> = {
  [key in keyof T]?: boolean;
};
export interface IGenericParams<T> {
  tableName: TableName;
  whereCondition?: WhereCondition<T>;
  selectCondition?: SelectCondition<T>;
}

export type CreateGenericInput<T> = {
  [key in keyof Omit<T, "id" | "createdAt" | "updatedAt">]: T[key];
};

export type UpdateGenericInput<T> = {
  [key in keyof Partial<T>]: T[key];
};

export type TableName = "user" | "account" | "jobApplication" | "salaryEstimationDataset";

export type CreateGenericWithCurrentUserInput<T> = {
  [key in keyof Omit<T, "id" | "createdAt" | "updatedAt" | "userId">]: T[key];
};

export type StatusMapping = {
  border: string;
  text: string;
  icon: IconType;
};

export type StatusMappings = {
  [status: string]: StatusMapping;
};


export interface FormattedMonthlyApplication {
  date: string;
  count: number;
}

export interface ResponseData {
  formattedMonthlyApplications: FormattedMonthlyApplication[];
}