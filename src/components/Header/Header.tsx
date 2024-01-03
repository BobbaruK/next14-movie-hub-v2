import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="relative z-20">
        <div className="appContaier">
          <div className="navbar bg-base-100 px-0">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                  aria-label="Menu Button"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64">
                  <li>
                    <details>
                      <summary>Movies</summary>
                      <ul className="p-2 z-10  w-48">
                        <li>
                          <Link href="/movie">Popular</Link>
                        </li>
                        <li>
                          <Link href="/movie/now-playing">Now Playing</Link>
                        </li>
                        <li>
                          <Link href="/movie/upcoming">Upcoming</Link>
                        </li>
                        <li>
                          <Link href="/movie/top-rated">Top Rated</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>TV Shows</summary>
                      <ul className="p-2 z-10  w-48">
                        <li>
                          <Link href="/tv">Popular</Link>
                        </li>
                        <li>
                          <Link href="/tv/airing-today">Airing Today</Link>
                        </li>
                        <li>
                          <Link href="/tv/on-the-air">On TV</Link>
                        </li>
                        <li>
                          <Link href="/tv/top-rated">Top Rated</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <details>
                      <summary>People</summary>
                      <ul className="p-2 z-10  w-48">
                        <li>
                          <Link href="/person">Popular</Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
              <Link href="/" className="btn btn-ghost text-xl">
                daisyUI
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary>Movies</summary>
                    <ul className="p-2 z-10  w-48">
                      <li>
                        <Link href="/movie">Popular</Link>
                      </li>
                      <li>
                        <Link href="/movie/now-playing">Now Playing</Link>
                      </li>
                      <li>
                        <Link href="/movie/upcoming">Upcoming</Link>
                      </li>
                      <li>
                        <Link href="/movie/top-rated">Top Rated</Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>TV Shows</summary>
                    <ul className="p-2 z-10  w-48">
                      <li>
                        <Link href="/tv">Popular</Link>
                      </li>
                      <li>
                        <Link href="/tv/airing-today">Airing Today</Link>
                      </li>
                      <li>
                        <Link href="/tv/on-the-air">On TV</Link>
                      </li>
                      <li>
                        <Link href="/tv/top-rated">Top Rated</Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <details>
                    <summary>People</summary>
                    <ul className="p-2 z-10  w-48">
                      <li>
                        <Link href="/person">Popular</Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
