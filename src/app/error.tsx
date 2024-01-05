"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log(error);

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-neutral px-16 md:px-0">
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-accent px-4 py-8 shadow-2xl md:px-8 lg:px-24">
          <p className="text-6xl font-bold tracking-wider text-primary-content md:text-7xl lg:text-9xl">
            {error.name}
          </p>
          <p className="mt-4 border-b-2 pb-4 text-center text-primary-content">
            {error.message}
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 ">
            <Link
              href="/"
              className="flex items-center space-x-2 rounded bg-neutral px-4 py-2 text-neutral-content transition duration-150 hover:bg-primary-content"
              title="Return Home"
            >
              <FaHome />
              <span>Return Home</span>
            </Link>
            <button
              className="flex items-center space-x-2 rounded bg-neutral px-4 py-2 text-neutral-content transition duration-150 hover:bg-primary-content"
              onClick={() => reset()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
