import BackToMain from "@/components/BackToMain/BackToMain";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PersonFilteringSidebarLayout({
  children, // will be a page or nested layout
}: Props) {
  return (
    <section>
      <BackToMain />
      {/* Include shared UI here e.g. a header or sidebar */}
      <aside>Person Filtering Sidebar</aside>

      {children}
    </section>
  );
}
