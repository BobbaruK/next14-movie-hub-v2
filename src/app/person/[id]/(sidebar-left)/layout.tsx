import BackTo from "@/components/BackTo";
import { RQ_PERSON_KEY } from "@/constants";
import { ReactNode } from "react";

interface Props {
  params: {
    id: string;
  };
  children: ReactNode;
}

export default function PersonFilteringSidebarLayout({
  children, // will be a page or nested layout
  params: { id },
}: Props) {
  return (
    <>
      <BackTo
        backTo={{
          label: "Main",
          link: `/person/${id}`,
        }}
        queryKey={RQ_PERSON_KEY(id)}
      />
      {children}
    </>
  );
}
