import { ReactNode } from "react";

interface Props {
  content: ReactNode;
  sidebar: ReactNode;
}

const MainTitleSidebarLeft = ({ content, sidebar }: Props) => {
  return (
    <>
      <div className="appContaier flex flex-col gap-8 lg:flex-row">
        <aside className="flex flex-col gap-7 lg:basis-1/4">
          <div>{sidebar}</div>
        </aside>
        <div className="lg:basis-3/4">{content}</div>
      </div>
    </>
  );
};

export default MainTitleSidebarLeft;
