"use client";

import Image from "next/image";

import Link from "next/link";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function NewHeader() {
  const { data: session } = useSession();

  return (
    <div className="navbar container mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <Image src="./iRS-Light.svg" width={120} height={60}></Image>
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/dashboard"}>Home</Link>
          </li>

          <li>
            <Link href={"/dashboard/team"}>Team</Link>
          </li>
          <li>
            <Link href={"/dashboard/client"}>Add Client</Link>
          </li>
          <li>
            <Link href={"/dashboard/project"}>Add Project</Link>
          </li>
          <li>
            <details>
              <summary>Theme</summary>
              <ul className="bg-base-100 z-50 rounded-t-none p-2">
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Default"
                    value="default"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Light"
                    value="light"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Dark"
                    value="dark"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Cyberpunk"
                    value="cyberpunk"
                  />
                </li>
              </ul>
            </details>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-7 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="./profile.svg" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
