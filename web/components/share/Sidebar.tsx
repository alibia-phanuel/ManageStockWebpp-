"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname(); // Récupère le chemin actif
  // Gestion de l'état pour afficher ou cacher le menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Fonction pour gérer le clic
  const showMenu = () => {
    setIsMenuVisible((prev) => !prev); // Inverser l'état actuel
  };
  const links = [
    {
      name: "Dashboard",
      href: "/",
      subLinks: [],
    },
    {
      name: "Gestion des stocks",
      href: "/dashboard",
      subLinks: [
        { name: "Tout les Produits", href: "/dashboard/allProduct" },
        { name: "Catégories", href: "/dashboard/categorie" },
        { name: "Historique", href: "/dashboard/historique" },
        { name: "Nouveau Produit", href: "/dashboard/new" },
      ],
    },
    {
      name: "Comptabilité",
      href: "/Accounting",
      subLinks: [
        { name: "Compte", href: "/Accounting/account" },
        { name: "Raports", href: "/Accounting/history" },
        { name: "Profit", href: "/Accounting/profit" },
        { name: "Vente", href: "/Accounting/sale" },
      ],
    },
    {
      name: "Commande",
      href: "/orders",
      subLinks: [
        { name: "Commande en cours...", href: "/orders/activeOrders" },
        { name: "Commande anuler", href: "/orders/failedOrders" },
        {
          name: "Historique de commande",
          href: "/orders/historiqueOrders",
        },
        { name: "Commande utilisateurs", href: "/orders/userOders" },
      ],
    },
    {
      name: "Chatbot",
      href: "/chatbot",
      subLinks: [
        { name: "Id Campagne ads", href: "/chatbot/allCampagneProductId" },
        { name: "Id Poste facebook", href: "/chatbot/allPostProductId" },
        { name: "Mise a jour", href: "/chatbot/crudProduct" },
        { name: "Nouveau Produit", href: "/chatbot/newProduct" },
      ],
    },
    {
      name: "Navigtion",
      href: "/",
      subLinks: [
        { name: "App livraison", href: "/menu/livraison" },
        { name: "Équipes", href: "/menu/teams" },
        { name: "À propos", href: "/menu/about" },
        { name: "Contact", href: "/menu/contact" },
      ],
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center flex-col max-md:absolute max-md:h-[70px] max-md:bg-[#4c5459] max-md:w-full ">
        <div className="h-[70px] py-[10px]  max-mdmax-md:relativmax-md:top-4 max-md:h-full flex justify-center  items-center bg-[#4c5459] border-r-4 w-full cursor-pointer max-md:justify-between px-[20px]">
          <Image
            src="/asset/logo.png"
            width={100}
            height={100}
            alt="Picture of the author"
            className=" max-md:relative max-md:top-6 z-20"
          />
          <div
            onClick={showMenu}
            className="bg-[#4C5459] p-3 rounded-lg md:hidden max-md:relative max-md:top-6"
          >
            <FaBarsStaggered className="text-[18px] text-white" />
          </div>
        </div>
        <aside
          className={`w-[250px] h-[calc(100vh-70px)] p-[20px] bg-[#f7f7f7] md:border-r-4 max-md:relative max-md:w-full   transition-all  max-md:bg-transparent ${
            isMenuVisible
              ? "max-md:translate-x-[0%]"
              : "max-md:translate-x-[-75%]"
          } `}
        >
          <nav className="max-md:absolute max-md:z-40  max-md:bg-white max-md:shadow-lg rounded-md  max-md:w-2/3 max-md:p-8  max-md:min-h-[calc(100vh-70px)] ">
            <ul>
              {links.map((link) => (
                <li key={link.name} style={{ marginBottom: "15px" }}>
                  {/* Lien principal */}
                  <Link
                    href={link.href}
                    className={
                      pathname === link.href
                        ? "font-bold text-blue-500"
                        : "text-gray-700 hover:text-blue-500"
                    }
                  >
                    {link.name}
                  </Link>

                  {/* Sous-liens */}
                  {link.subLinks.length > 0 && (
                    <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.name} style={{ marginBottom: "10px" }}>
                          <Link
                            href={subLink.href}
                            className={
                              pathname === subLink.href
                                ? "text-blue-500"
                                : "text-gray-600 hover:text-blue-500"
                            }
                          >
                            {subLink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
