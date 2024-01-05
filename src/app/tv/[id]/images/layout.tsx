import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

export default function MovieImagesLayout({ children, modal }: Props) {
  return (
    <>
      {modal}
      <div>{children}</div>
    </>
  );
}
