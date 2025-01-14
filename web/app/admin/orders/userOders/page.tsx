import React from "react";
import RouteGuard from "@/components/RouteGuard";
const Page = () => {
  return (
    <RouteGuard>
      <div className="flex justify-center items-center ">
        <h1 className="font-bold text-green-700 capitalize text-2xl">
          utilisateurs et leurs commandes
        </h1>
      </div>
    </RouteGuard>
  );
};

export default Page;
