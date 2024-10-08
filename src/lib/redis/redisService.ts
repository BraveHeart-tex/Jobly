import Redis from "ioredis";
import { env } from "@/env.js";
import { DateTime } from "luxon";

const client = new Redis(env.REDIS_CONNECTION_STRING, {
  lazyConnect: true,
  enableAutoPipelining: true,
  retryStrategy(times) {
    if (times > 20) {
      return null;
    }
    return Math.min(times * 500, 2000);
  },
});

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

export const saveToCache = async (
  key: string,
  value: string,
  ttl?: string | number,
) => {
  try {
    await client.set(key, value, "EX", ttl || 0);
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
  }
};

export const getMatchingKeys = async (pattern: string): Promise<string[]> => {
  try {
    const matchingKeys: string[] = [];
    let cursor = "0";

    do {
      const result = await client.scan(cursor, "MATCH", pattern, "COUNT", 100);
      cursor = result[0];
      matchingKeys.push(...result[1]);
    } while (cursor !== "0");

    return matchingKeys;
  } catch (error) {
    console.error("getMatchingKeys error", error);
    return [];
  }
};
