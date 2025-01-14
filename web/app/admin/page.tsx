import React from "react";
import RouteGuard from "@/components/RouteGuard";

export default function page() {
  return (
    <RouteGuard>
      <div>Administration</div>;
    </RouteGuard>
  );
}
