import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaQuoteRight } from "react-icons/fa";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

interface NavLinkProps {
  route: string;
  pathname: string;
  onClick?: () => void;
}

const Links = ["Blogs", "Users"];

const NavLink = ({ route, pathname, onClick }: NavLinkProps) => {
  const isActive = pathname.slice(1).includes(route.toLowerCase());
  const linkClass = `ml-3 px-6 py-3 text-white rounded-lg border-2 border-slate-400 hover:bg-blue-900 ${
    isActive ? "bg-blue-900" : ""
  }`;
  return (
    <Link
      legacyBehavior
      href={{ pathname: `/${route.toLowerCase()}`, query: { page: 1 } }}
    >
      <a onClick={onClick} className={linkClass}>
        {route}
      </a>
    </Link>
  );
};

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <div
      className={`bg-blue-800 py-6 fixed top-0 w-full z-50 ${rubik.className}`}
    >
      <div className="flex justify-between items-center mx-4 md:mx-48">
        <Link href="/">
          <h1 className="font-bold md:text-2xl text-white flex items-center gap-4">
            <FaQuoteRight className="fill-white" />
            Synapsis Blog
          </h1>
        </Link>
        <div>
          {Links.map((link) => (
            <NavLink key={link} route={link} pathname={pathname} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
