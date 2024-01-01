import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const MovieBackdropsLayout = ({ children, modal }: Props) => {
  return (
    <>
      {modal} 
      {children}
    </>
  );
};

export default MovieBackdropsLayout;
