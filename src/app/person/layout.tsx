import {
  RQ_POPULAR_PERSONS_ENDPOINT,
  RQ_POPULAR_PERSONS_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { PeoplesResponse } from "@/types/people/PeoplesResponse";
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

  // Recommendations
  const apiClientRecommendations = new MyAPIClient<PeoplesResponse>(
    RQ_POPULAR_PERSONS_ENDPOINT,
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_POPULAR_PERSONS_KEY],
    queryFn: () => apiClientRecommendations.getAll(),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </>
  );
}
