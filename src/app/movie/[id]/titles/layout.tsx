import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieTitlesLayout = ({ children }: Props) => {
  return (
    <>
      <MainTitleSidebarLeft
        content={children}
        sidebar={<p>Main Movie Filtering Sidebar</p>}
      />
    </>
  );
};

export default MovieTitlesLayout;
