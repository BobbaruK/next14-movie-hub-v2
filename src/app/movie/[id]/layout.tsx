import BackToMain from "@/components/BackToMain/BackToMain";
import MainTitleNavigation from "@/components/MainTitleNavigation/MainTitleNavigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainTitleNavigationLayout({
  children, // will be a page or nested layout
}: Props) {
  return (
    <>
      <MainTitleNavigation />
      {children}
    </>
  );
}
