"use server";
import prisma from "../../libs/prismadb";
import {
  CreateGenericInput,
  CreateGenericWithCurrentUserInput,
  IGenericParams,
  TableMap,
  TableName,
  UpdateGenericInput,
} from "./types";
import { currentUser } from "@clerk/nextjs";

const TABLE_MAP: TableMap = {
  jobApplication: prisma.jobApplication,
  salaryEstimationDataset: prisma.salaryEstimationDataset,
  event: prisma.event,
};

export const getTable = async (tableName: TableName) => {
  const table = TABLE_MAP[tableName];

  if (!table) {
    throw new Error("Table not found");
  }

  return table as any;
};

export const getGeneric = async <T>({ tableName, whereCondition, selectCondition }: IGenericParams<T>) => {
  try {
    const table = await getTable(tableName);

    const queryOptions = {
      where: whereCondition,
      select: selectCondition,
    };

    const result = await table.findFirst(queryOptions);

    return result ? { data: result as T } : { error: "Not found" };
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const getGenericList = async <T>({ tableName, whereCondition, selectCondition }: IGenericParams<T>) => {
  try {
    const table = await getTable(tableName);

    const queryOptions = {
      where: whereCondition,
      select: selectCondition,
    };

    const result = await table.findMany(queryOptions);

    return result ? { data: result as T[] } : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const deleteGeneric = async <T>({
  tableName,
  isMany,
  whereCondition,
}: IGenericParams<T> & {
  isMany?: boolean;
}) => {
  try {
    const table = await getTable(tableName);
    const result = whereCondition
      ? // @ts-ignore
        await table.delete({ where: whereCondition })
      : isMany
        ? await table.deleteMany()
        : null;

    return result ? { data: result as T } : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const createGenericWithCurrentUser = async <T>({
  tableName,
  data,
}: IGenericParams<T> & { data: CreateGenericWithCurrentUserInput<T> }) => {
  try {
    const table = await getTable(tableName);
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found");
    }

    const result = await table.create({
      // @ts-ignore
      data: {
        ...data,
        userId: user.id,
      },
    });

    return result ? { data: result as T } : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const updateGeneric = async <T>({
  tableName,
  whereCondition,
  data,
}: IGenericParams<T> & {
  data: UpdateGenericInput<T>;
}) => {
  try {
    const table = await getTable(tableName);

    const result = await table.update({
      data,
      // @ts-ignore
      where: whereCondition,
    });

    return result ? { data: result as T } : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const createGeneric = async <T>({
  tableName,
  data,
  selectCondition,
}: IGenericParams<T> & {
  data: CreateGenericInput<T>;
}) => {
  try {
    const table = await getTable(tableName);

    const result = await table.create({
      // @ts-ignore
      data,
      select: selectCondition,
    });

    return result ? { data: result as T } : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};

export const getGenericListByCurrentUser = async <T>({
  tableName,
  whereCondition,
  selectCondition,
}: IGenericParams<T>) => {
  try {
    const table = await getTable(tableName);
    const currentUserResult = await currentUser();

    if (!currentUserResult) {
      throw new Error("User not found");
    }

    const queryOptions = {
      where: {
        ...whereCondition,
        userId: currentUserResult.id,
      },
      select: selectCondition,
    };

    const result = await table.findMany(queryOptions);

    return result.length
      ? {
          data: result as T[],
        }
      : null;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : error };
  }
};
