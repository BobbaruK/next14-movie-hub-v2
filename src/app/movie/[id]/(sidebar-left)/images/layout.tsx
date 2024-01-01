import BackToMain from "@/components/BackToMain/BackToMain";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainFilteringSidebarLayout({ children }: Props) {
  return (
    <>
      <div>{children}</div>
			<div id="modal-root" />
    </>
  );
}
