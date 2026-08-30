"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/types/authType";
import { getDashboardPathByRole } from "@/lib/utils/roleRedirect";

// Both student login methods (QR & password, see StudentQrLoginPanel and
// StudentPasswordLoginForm) do the exact same thing right after a successful
// login: persist the access token, then send the user to their role's
// dashboard. Shared here once instead of duplicated in both forms.
export function useRedirectAfterLogin() {
  const router = useRouter();

  return useCallback(
    (accessToken: string, role: UserRole) => {
      localStorage.setItem("access_token", accessToken);
      router.push(getDashboardPathByRole(role));
    },
    [router]
  );
}
