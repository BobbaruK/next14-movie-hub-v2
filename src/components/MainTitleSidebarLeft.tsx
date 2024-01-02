import React, { ReactNode } from "react";
import BackToMain from "./BackToMain/BackToMain";

interface Props {
  content: ReactNode;
  sidebar: ReactNode;
}

const MainTitleSidebarLeft = ({ content, sidebar }: Props) => {
  return (
    <>
      <BackToMain />
      <div className="flex gap-8">
        <aside>{sidebar}</aside>
        {content}
      </div>
    </>
  );
};

export default MainTitleSidebarLeft;
