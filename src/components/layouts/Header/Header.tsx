import { MainNavigation } from "@/components/MainNavigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="relative z-20">
        <div className="appContaier flex justify-between py-8">
          <div>Logo</div>
          <MainNavigation />
          <div className="flex gap-4">
            <button className="btn btn-circle btn-ghost" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <ModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
