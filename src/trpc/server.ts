import "server-only";

import { SHARED_ROUTES } from "@/lib/routes";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const headerStore = new Headers(await headers());

  headerStore.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: headerStore,
  });
});

export const api = createCaller(createContext, {
  onError({ error }) {
    if (error.code === "UNAUTHORIZED") {
      return redirect(SHARED_ROUTES.LOGIN);
    }
  },
});
