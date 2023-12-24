import BackToMain from "@/components/BackToMain/BackToMain";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainFilteringSidebarLayout({
  children, // will be a page or nested layout
}: Props) {
  return (
    <>
      <BackToMain />
      {/* Include shared UI here e.g. a header or sidebar */}
      <div className="flex gap-8">
        <aside>Main Movie Filtering Sidebar</aside>
        {children}
      </div>
    </>
  );
}
