import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default async function MainTitleNavigationLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  return <>{children}</>;
}
