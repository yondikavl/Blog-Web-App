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
      className={`fixed top-0 z-50 w-full bg-blue-800 py-5 md:py-6 ${rubik.className}`}
    >
      <div className="mx-4 flex items-center justify-between md:mx-48">
        <Link href="/">
          <h1 className="flex items-center gap-4 text-xl font-bold text-white md:text-2xl">
            <FaQuoteRight className="fill-white" />
            Synap App
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
