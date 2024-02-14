import { RQ_PERSON_IMAGES_ENDPOINT, RQ_PERSON_IMAGES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { ImagesResponse } from "@/types/ImagesResponse";
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

export default async function MovieImagesLayout({
  params: { id },
  children,
}: Props) {
  const queryClient = new QueryClient();

  // Images
  const apiClientImages = new MyAPIClient<ImagesResponse>(
    RQ_PERSON_IMAGES_ENDPOINT(id),
  );

  await queryClient.prefetchQuery({
    queryKey: [RQ_PERSON_IMAGES_KEY(id)],
    queryFn: () => apiClientImages.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
