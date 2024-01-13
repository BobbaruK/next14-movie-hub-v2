import MainTitleNavigation from "@/components/MainTitle/Navigation";
import {
  RQ_COMBINED_CREDITS_ENDPOINT,
  RQ_COMBINED_CREDITS_KEY,
  RQ_PERSON_ENDPOINT,
  RQ_PERSON_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
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
  const queryClient = new QueryClient();

  const mainPeopleMenu: MainTitleMenuItem[] = [
    // {
    //   label: "Main",
    //   href: `/person/${id}`,
    // },
    {
      label: "Translations",
      href: `/person/${id}/translations`,
    },
    {
      label: "Images",
      href: `/person/${id}/images/profiles`,
    },
  ];

  // People
  const apiClientPeople = new MyAPIClient<PeopleResponse>(RQ_PERSON_ENDPOINT(id));
  await queryClient.prefetchQuery({
    queryKey: [RQ_PERSON_KEY(id)],
    queryFn: () => apiClientPeople.getAll(),
  });

  // People Combined Credits
  const apiClientCombinedCredits = new MyAPIClient<CombinedCredits>(
    RQ_COMBINED_CREDITS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_COMBINED_CREDITS_KEY(id)],
    queryFn: () => apiClientCombinedCredits.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MainTitleNavigation mainTitleMenu={mainPeopleMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
