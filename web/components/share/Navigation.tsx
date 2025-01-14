"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname(); // Récupérer le chemin actuel

  return (
    <ul className="flex gap-x-4 capitalize flex-wrap justify-center items-center max-md:hidden">
      <li>
        <Link
          href="/menu/livraison"
          className={
            pathname === "/menu/livraison" ? "text-green-500" : "text-[#4C5459]"
          }
        >
          App livraison
        </Link>
      </li>
      <li>
        <Link
          href="/menu/teams"
          className={
            pathname === "/menu/teams" ? "text-green-500" : "text-[#4C5459]"
          }
        >
          Équipes
        </Link>
      </li>
      <li>
        <Link
          href="/menu/about"
          className={
            pathname === "/menu/about" ? "text-green-500" : "text-[#4C5459]"
          }
        >
          À propos
        </Link>
      </li>
      <li>
        <Link
          href="/menu/contact"
          className={
            pathname === "/menu/contact" ? "text-green-500" : "text-[#4C5459]"
          }
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
