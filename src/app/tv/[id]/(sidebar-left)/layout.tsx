import BackToMain from "@/components/BackToMain/BackToMain";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainFilteringSidebarLayout({
  children, // will be a page or nested layout
}: Props) {
  return (
    <section>
      <BackToMain />
      {/* Include shared UI here e.g. a header or sidebar */}
      <aside>Main Movie Filtering Sidebar</aside>

      {children}
    </section>
  );
}
