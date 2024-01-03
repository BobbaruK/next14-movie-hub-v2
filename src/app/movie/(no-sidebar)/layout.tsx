import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function UnsortableMoviesLayout({
  children, // will be a page or nested layout
}: Props) {
  return <>{children}</>;
}
