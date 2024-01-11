import BackToPerson from "@/components/BackToPerson";
import { RQ_PERSON_ENDPOINT, RQ_PERSON_KEY } from "@/constants";
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
      <BackToPerson
        backTo={{
          label: "Main",
          link: `/person/${id}`,
        }}
        endpoint={RQ_PERSON_ENDPOINT(id)}
        queryKey={RQ_PERSON_KEY(id)}
      />
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <aside>Person Filtering Sidebar</aside>

        {children}
      </section>
    </>
  );
}
