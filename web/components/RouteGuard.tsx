"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("authData");

    if (authData) {
      const { token, expiresAt } = JSON.parse(authData);
      const now = new Date();

      if (token === "adminAuthenticated" && new Date(expiresAt) > now) {
        // Authenticated and token is still valid
        return;
      }
    }

    // Redirect to login if not authenticated or token expired
    router.push("/");
  }, [router]);

  return <>{children}</>;
};

export default RouteGuard;
