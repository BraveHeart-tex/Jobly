import Redis from "ioredis";
import { env } from "@/env.js";
import { DateTime } from "luxon";

const client = new Redis(env.REDIS_CONNECTION_STRING);

const getLogTimestamp = () =>
  DateTime.now().toUTC().toFormat("yyyy-MM-dd HH:mm:ss");

client.on("connect", () => {
  console.info(
    `[${getLogTimestamp()}] [INFO] [redisService]: Client connected.`,
  );
});

client.on("ready", () => {
  console.info(
    `[${getLogTimestamp()}] [INFO] [redisService]: Client is ready.`,
  );
});

client.on("error", (error) => {
  console.error(
    `[${getLogTimestamp()}] [ERROR] [redisService]: Client error: ${error.message}`,
    {
      errorStack: error.stack,
    },
  );
});

client.on("end", () => {
  console.info(
    `[${getLogTimestamp()}] [INFO] [redisService]: Client disconnected.`,
  );
});

process.on("SIGINT", () => {
  client.quit();
});

export const getUserKey = (userId: number) => `user:${userId}`;
export const getSessionKey = (sessionId: string) => `session:${sessionId}`;

export const getFromCache = async (key: string): Promise<string | null> => {
  try {
    return await client.get(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const saveToCache = async (key: string, value: string) => {
  try {
    await client.set(key, value);
  } catch (error) {
    console.error(error);
  }
};

export const deleteFromCache = async (key: string) => {
  try {
    await client.del(key);
  } catch (error) {
    console.error(error);
  }
};

export const deleteMultipleKeysFromCache = async (
  keys: string[],
): Promise<void> => {
  try {
    await client.del(...keys);
  } catch (error) {
    console.error(`Error deleting keys: ${keys.join(", ")}`, error);
    throw error;
  }
};
