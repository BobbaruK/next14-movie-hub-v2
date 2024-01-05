import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function UnsortableTVShowsLayout({
  children, // will be a page or nested layout
}: Props) {
  return <>{children}</>;
}
