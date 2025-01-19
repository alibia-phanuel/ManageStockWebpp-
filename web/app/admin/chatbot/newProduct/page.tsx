import React from "react";
import RouteGuard from "@/components/RouteGuard";
import Formulaire from "@/components/Formulaire";
const Page = () => {
  return (
    <RouteGuard>
      <div className="flex justify-center   items-center relative py-6 px-3">
        <Formulaire />
      </div>
    </RouteGuard>
  );
};

export default Page;
