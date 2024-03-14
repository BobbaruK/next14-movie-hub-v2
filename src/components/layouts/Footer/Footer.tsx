import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { SiAxios, SiReactquery, SiTailwindcss } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-8 py-8">
      <div className="container flex flex-col gap-8">
        <div className="flex items-center justify-center gap-4 text-slate-600">
          <Link href="https://react.dev/" target="_blank">
            <FaReact size={45} className="hover:text-react" />
          </Link>
          <Link href="https://nextjs.org/" target="_blank">
            <SiNextdotjs size={45} className="hover:text-foreground" />
          </Link>
          <Link href="https://tanstack.com/query/latest" target="_blank">
            <SiReactquery size={45} className="hover:text-react-query" />
          </Link>
          <Link href="https://tailwindcss.com/" target="_blank">
            <SiTailwindcss size={45} className="hover:text-tailwind" />
          </Link>
          <Link href="https://axios-http.com/" target="_blank">
            <SiAxios size={45} className="hover:text-axios" />
          </Link>
          <Link
            href="https://github.com/BobbaruK/next14-movie-hub-v2"
            target="_blank"
          >
            <FaGithub size={45} className="hover:text-foreground" />
          </Link>
        </div>
        <p className="flex items-center justify-center gap-2">
          SCSSeco - Movie HUB V2
        </p>
      </div>
    </footer>
  );
};

export default Footer;
