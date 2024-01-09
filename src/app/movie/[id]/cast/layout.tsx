import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function NoSidebarLayout({
  children, // will be a page or nested layout
}: Props) {
  return <section>{children}</section>;
}
