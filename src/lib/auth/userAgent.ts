import type { InsertDeviceSessionModel } from "@/server/db/schema/deviceSessions";
import { UAParser } from "ua-parser-js";

export interface LocationData {
  city?: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export type DeviceInfo = Required<
  Pick<
    InsertDeviceSessionModel,
    "browser" | "operatingSystem" | "deviceName" | "deviceType"
  >
>;

interface ReadonlyHeaders extends Headers {
  append(...args: unknown[]): void;
  set(...args: unknown[]): void;
  delete(...args: unknown[]): void;
}

export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  return {
    browser: `${browser.name} ${browser.version}`,
    operatingSystem: `${os.name} ${os.version}`,
    deviceName: device.model || "Unknown Device",
    deviceType: device.type || "Unknown Device",
  };
};

export const getClientIp = (headersList: ReadonlyHeaders) => {
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",")[0] ||
    headersList.get("cf-connecting-ip") ||
    headersList.get("x-client-ip") ||
    "127.0.0.1";

  return ip;
};

export const getLocationData = async (ip: string): Promise<LocationData> => {
  // Skip lookup for localhost/private IPs
  if (
    ip === "127.0.0.1" ||
    ip === "localhost" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip === "::1"
  ) {
    return {
      city: "Local",
      country: "Development",
    };
  }

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,city,region,country,lat,lon`,
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    return {
      city: data.city,
      region: data.region,
      country: data.country,
      latitude: data.lat,
      longitude: data.lon,
    };
  } catch (error) {
    console.error("Error fetching location data:", error);
    return {};
  }
};

export const formatLocation = (location: LocationData): string => {
  if (!location.city && !location.region && !location.country) {
    return "Location unknown";
  }

  const parts = [];
  if (location.city) parts.push(location.city);
  if (location.region) parts.push(location.region);
  if (location.country) parts.push(location.country);

  return parts.join(", ");
};
