import BackToMain from "@/components/BackToMain/BackToMain";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarBackToMainLayout({
  children, // will be a page or nested layout
}: Props) {
  return (
    <section>
      <BackToMain />
      <div>no sidebar</div>

      {children}
    </section>
  );
}
