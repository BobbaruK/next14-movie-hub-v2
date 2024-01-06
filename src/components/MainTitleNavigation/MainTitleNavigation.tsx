import Link from "next/link";
import React from "react";

interface Props {
  mainTitleId: string | number;
}

const MainTitleNavigation = ({ mainTitleId: id }: Props) => {
  return (
    <div className="navbar relative z-10 flex justify-center bg-neutral align-middle text-neutral-content">
      <div className="">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Overview</summary>
              <ul className="w-48 bg-neutral p-2 shadow-md shadow-primary">
                <li>
                  <Link href={`/movie/${id}`}>Main</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/titles`}>Alternative Titles</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/cast`}>Cast & Crew</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/releases`}>Release Dates</Link>
                </li>
                <li>
                  <Link href={`/movie/${id}/translations`}>Translations</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link href={`/movie/${id}/images/backdrops`}>Backdrops</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/images/logos`}>Logos</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/images/posters`}>Posters</Link>
          </li>
          <li>
            <Link href={`/movie/${id}/videos`}>Videos</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainTitleNavigation;
