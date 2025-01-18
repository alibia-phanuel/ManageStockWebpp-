"use client";
import { FaBarsStaggered } from "react-icons/fa6";
import Link from "next/link";
import { FaBox, FaMoneyBill, FaRobot, FaMap } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FaHome, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname(); // Récupère le chemin actif
  const [activeParent, setActiveParent] = useState(""); // État pour le parent actif
  const [activeChild, setActiveChild] = useState(""); // État pour l'enfant actif
  // Gestion de l'état pour afficher ou cacher le menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showMenu = () => {
    setIsMenuVisible((prev) => !prev); // Inverser l'état actuel
  };

  const handleParentClick = (parentHref: string) => {
    setActiveParent(parentHref); // Définit le parent actif
    setActiveChild(""); // Réinitialise l'enfant actif
  };

  const handleChildClick = (childHref: string, parentHref: string) => {
    setActiveParent(parentHref); // Définit le parent actif
    setActiveChild(childHref); // Définit l'enfant actif
  };

  const links = [
    {
      name: "Dashboard",
      href: "/admin/",
      icon: <FaHome />,
      subLinks: [],
    },
    {
      name: "Gestion des stocks",
      href: "/admin/dashboard",
      icon: <FaBox />,
      subLinks: [
        { name: "Tout les Produits", href: "/admin/dashboard/allProduct" },
        { name: "Catégories", href: "/admin/dashboard/categorie" },
        { name: "Historique", href: "/admin/dashboard/historique" },
        { name: "Nouveau Produit", href: "/admin/dashboard/new" },
      ],
    },

    {
      name: "Chatbot",
      href: "/admin/chatbot",
      icon: <FaRobot />,
      subLinks: [
        {
          name: "Id Campagne ads",
          href: "/admin/chatbot/allCampagneProductId",
        },
        { name: "Id Poste facebook", href: "/admin/chatbot/allPostProductId" },
        { name: "Mise a jour", href: "/admin/chatbot/crudProduct" },
        { name: "Nouveau Produit", href: "/admin/chatbot/newProduct" },
      ],
    },
    {
      name: "Comptabilité",
      href: "/admin/Accounting",
      icon: <FaMoneyBill />,
      subLinks: [
        { name: "Compte", href: "/admin/Accounting/account" },
        { name: "Raports", href: "/admin/Accounting/history" },
        { name: "Profit", href: "/admin/Accounting/profit" },
        { name: "Vente", href: "/admin/Accounting/sale" },
      ],
    },
    {
      name: "Commande",
      href: "/admin/orders",
      icon: <FaShoppingCart />,
      subLinks: [
        { name: "Commande en cours...", href: "/admin/orders/activeOrders" },
        { name: "Commande anuler", href: "/admin/orders/failedOrders" },
        {
          name: "Historique de commande",
          href: "/admin/orders/historiqueOrders",
        },
        { name: "Commande utilisateurs", href: "/admin/orders/userOders" },
      ],
    },
    {
      name: "Navigation",
      href: "/admin/",
      icon: <FaMap />,
      subLinks: [
        { name: "App livraison", href: "/admin/menu/livraison" },
        { name: "Équipes", href: "/admin/menu/teams" },
        { name: "À propos", href: "/admin/menu/about" },
        { name: "Contact", href: "/admin/menu/contact" },
      ],
    },
  ];
  return (
    <>
      <div className="flex justify-center items-center flex-col max-md:absolute max-md:h-[70px] max-md:bg-[#4c5459] max-md:w-full">
        <div className="h-[70px] py-[10px] flex justify-center items-center bg-[#4c5459] border-r-4 w-full cursor-pointer max-md:justify-between px-[20px] z-30">
          <Image
            src="/asset/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="max-md:relative max-md:top-6 z-20"
          />
          <div
            onClick={showMenu}
            className="bg-[#4C5459] p-3 rounded-lg md:hidden max-md:relative max-md:top-6"
          >
            <FaBarsStaggered className="text-[18px] text-white" />
          </div>
        </div>
        <aside
          className={`w-[250px] max-md:top-[25px] z-50  p-[20px] md:border-r-4 max-md:relative max-md:w-full transition-all  ${
            isMenuVisible
              ? "max-md:translate-x-[0%]"
              : "max-md:translate-x-[-100%]"
          }`}
        >
          <nav className="max-md:absolute max-md:z-40 max-md:bg-white max-md:shadow-lg rounded-md max-md:w-2/3 max-md:p-8 max-md:min-h-[calc(100vh-70px)] ">
            <ul>
              {links.map((link) => (
                <li
                  key={link.name}
                  style={{
                    marginBottom: "15px",
                    backgroundColor:
                      activeParent === link.href ? "#e5e7eb" : "transparent",
                    borderRadius: 10,
                  }}
                >
                  {/* Lien principal */}
                  <Link
                    href={link.href}
                    onClick={() => handleParentClick(link.href)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      pathname === link.href
                        ? "font-bold text-blue-500"
                        : "text-gray-700 hover:text-blue-500 "
                    }`}
                  >
                    {link.icon} {/* Affichage de l'icône */}
                    {link.name}
                  </Link>

                  {/* Sous-liens */}
                  {link.subLinks.length > 0 && (
                    <ul style={{ marginLeft: "20px", marginTop: "10px" }}>
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.name} style={{ marginBottom: "10px" }}>
                          <Link
                            href={subLink.href}
                            onClick={() =>
                              handleChildClick(subLink.href, link.href)
                            }
                            className={`block px-3 py-1 rounded-md ${
                              activeChild === subLink.href
                                ? "text-blue-500 font-semibold"
                                : "text-gray-600 hover:text-blue-500"
                            }`}
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
