import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { ROUTES } from "@/lib/constants";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { redirect } from "next/navigation";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const api = createCaller(createContext, {
  onError({ error }) {
    if (error.code === "UNAUTHORIZED") {
      return redirect(ROUTES.LOGIN);
    }
  },
});
