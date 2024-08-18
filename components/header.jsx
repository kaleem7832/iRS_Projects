"use client";

import Link from "next/link";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  return (
    <div className="bg-slate-800 p-3">
      <div className="container mx-auto  flex justify-between items-center content-center">
        <Link href={"/dashboard"}>
          <img
            src="https://www.iresearchservices.com/wp-content/themes/iResearch/img/iresearchLogoLight.svg"
            width="120px"
          />
        </Link>
        <nav>
          <Link href={"/dashboard/client"}>
            <button className="text-white px-3 rounded mr-1">Add Client</button>
          </Link>
          <Link href={"/dashboard/project"}>
            <button className="text-white px-3 rounded mr-1">
              Add Project
            </button>
          </Link>
          <button
            className="text-white px-3 rounded mr-1"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
