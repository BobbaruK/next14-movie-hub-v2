import BackTo from "@/components/BackTo";
import {
  RQ_COLLECTION_IMAGES_ENDPOINT,
  RQ_COLLECTION_IMAGES_KEY,
  RQ_COLLECTION_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { CollectionImagesShape } from "@/types/ImagesResponse";
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
  const apiClientImages = new MyAPIClient<CollectionImagesShape>(
    RQ_COLLECTION_IMAGES_ENDPOINT(id),
  );

  await queryClient.prefetchQuery({
    queryKey: [RQ_COLLECTION_IMAGES_KEY(id)],
    queryFn: () => apiClientImages.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BackTo
        queryKey={RQ_COLLECTION_KEY(id)}
        backTo={{ label: "Collection", link: `/collection/${id}` }}
      />
      {children}
    </HydrationBoundary>
  );
}
