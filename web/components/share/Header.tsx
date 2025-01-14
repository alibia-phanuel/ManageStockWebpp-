import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import Link from "next/link";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="bg-white  text-green-50 w-full h-[70px] flex justify-center items-center px-4">
      <div className="container  flex justify-between items-center">
        <div className="bg-[#4C5459] p-3 rounded-lg md:hidden">
          <FaBarsStaggered className="text-[18px]" />
        </div>
        <Navigation />
        <div>
          <p className=" font-semibold">
            <Link className="text-red-500" href="#">
              Se déconnecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
