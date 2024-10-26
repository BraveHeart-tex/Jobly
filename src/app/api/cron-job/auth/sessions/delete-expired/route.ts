import { env } from "@/env";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  const secretKey = request.headers.get("x-secret-key");

  if (secretKey !== env.SECRET_CRON_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.info("Deleting expired sessions...");

  try {
    // TODO:
    // await deleteExpiredSessions();

    console.info("Deleted expired sessions");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("delete expired sessions error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
