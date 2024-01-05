import { FaHome } from "react-icons/fa";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-neutral px-16 md:px-0">
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-accent px-4 py-8 shadow-2xl md:px-8 lg:px-24">
          <p className="text-6xl font-bold tracking-wider text-primary-content md:text-7xl lg:text-9xl">
            404
          </p>
          <p className="mt-4 text-2xl font-bold tracking-wider text-primary-content md:text-3xl lg:text-5xl">
            Page Not Found
          </p>
          <p className="mt-4 border-b-2 pb-4 text-center text-primary-content">
            Sorry, the page you are looking for could not be found.
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="mt-6 flex items-center space-x-2 rounded bg-neutral px-4 py-2 text-neutral-content transition duration-150 hover:bg-primary-content"
              title="Return Home"
            >
              <FaHome />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
