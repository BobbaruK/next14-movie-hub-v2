import MovieNavigation from "@/components/MovieNavigation";
import {
  RQ_COMBINED_CREDITS_ENDPOINT,
  RQ_COMBINED_CREDITS_KEY,
  RQ_PERSON_ENDPOINT,
  RQ_PERSON_EXTERNAL_IDS_ENDPOINT,
  RQ_PERSON_EXTERNAL_IDS_KEY,
  RQ_PERSON_KEY,
  RQ_POPULAR_JOBS_ENDPOINT,
  RQ_POPULAR_JOBS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ExternalIDs } from "@/types/ExternalIDs";
import { Job } from "@/types/Job";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { CombinedCredits } from "@/types/people/CombinedCredits";
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
  const apiClientPeople = new MyAPIClient<PeopleResponse>(
    RQ_PERSON_ENDPOINT(id),
  );
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

  // People External IDs
  const apiClientExternalIDs = new MyAPIClient<ExternalIDs>(
    RQ_PERSON_EXTERNAL_IDS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_PERSON_EXTERNAL_IDS_KEY(id)],
    queryFn: () => apiClientExternalIDs.getAll(),
  });

  // Jobs
  const apiClientJobs = new MyAPIClient<Job[]>(RQ_POPULAR_JOBS_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_JOBS_KEY],
    queryFn: () => apiClientJobs.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MovieNavigation menu={mainPeopleMenu} />
        {children}
      </HydrationBoundary>
    </>
  );
}
