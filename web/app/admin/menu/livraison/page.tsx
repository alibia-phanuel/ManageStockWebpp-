import React from "react";
import RouteGuard from "@/components/RouteGuard";
import Image from "next/image";
const Page = () => {
  return (
    <RouteGuard>
      <div className="flex justify-center items-center h-[calc(100vh-70px)] flex-col px-4">
        <h1 className="font-bold text-green-700 capitalize text-xl">
          Version d&apos;App Mobile de livraison Prototype
        </h1>
        <div>
          <Image src="/asset/app.png" width={2000} height={2000} alt="appUi" />
        </div>
      </div>
    </RouteGuard>
  );
};

export default Page;
