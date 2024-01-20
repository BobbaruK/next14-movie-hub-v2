import { RQ_TVSHOW_VIDEOS_ENDPOINT, RQ_TVSHOW_VIDEOS_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { VideosResponse } from "@/types/VideoResponse";
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

const TVShowVideoLayout = async ({ params: { id }, children }: Props) => {
  const queryClient = new QueryClient();

  // Translations
  const apiClientTVShowViedeos = new MyAPIClient<VideosResponse>(
    RQ_TVSHOW_VIDEOS_ENDPOINT(id),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_VIDEOS_KEY(id)],
    queryFn: () => apiClientTVShowViedeos.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default TVShowVideoLayout;
