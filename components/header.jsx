"use client";

import Link from "next/link";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="bg-slate-950 p-3">
      <div className="container mx-auto  flex justify-between items-center content-center">
        <Link href={"/dashboard"}>
          <img src="/iRS-Light.svg" width="120px" />
        </Link>
        <nav>
          <Link href={"/dashboard/"}>
            <button className="text-white px-3 rounded mr-1">Dashboard</button>
          </Link>
          <Link href={"/dashboard/team"}>
            <button className="text-white px-3 rounded mr-1">Team</button>
          </Link>
          <Link href={"/dashboard/client"}>
            <button className="text-white px-3 rounded mr-1">Add Client</button>
          </Link>
          <Link href={"/dashboard/project"}>
            <button className="text-white px-3 rounded mr-1">
              Add Project
            </button>
          </Link>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <Image src="./profile.svg" width={20} height={20} alt="Profile" />
              {session?.user?.name}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <button
                  className="text-white px-3 rounded mr-1"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
