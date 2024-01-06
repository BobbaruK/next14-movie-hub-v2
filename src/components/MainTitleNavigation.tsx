import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import Link from "next/link";
import React from "react";

interface Props {
  mainTitleMenu: MainTitleMenuItem[];
}

const MainTitleNavigation = ({ mainTitleMenu }: Props) => {
  return (
    <>
      <div className="navbar relative z-10 flex justify-center bg-neutral align-middle text-neutral-content">
        <ul className="menu menu-horizontal px-1">
          {mainTitleMenu.map((menuItem) => (
            <li key={menuItem.href}>
              {menuItem.children?.length ? (
                <details>
                  <summary>{menuItem.label}</summary>
                  <ul className="w-48 bg-neutral p-2 shadow-md shadow-primary">
                    {menuItem.children.map((childMenuItem) => (
                      <li key={childMenuItem.href}>
                        <Link href={childMenuItem.href}>
                          {childMenuItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link href={menuItem.href}>{menuItem.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MainTitleNavigation;
