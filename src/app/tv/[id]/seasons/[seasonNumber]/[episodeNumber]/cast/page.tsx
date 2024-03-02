import BackTo from "@/components/BackTo";
import EpisodeCastPage from "@/components/layouts/EpisodeCastPage";
import {
  RQ_TVSHOW_EPISODE_CAST_ENDPOINT,
  RQ_TVSHOW_EPISODE_CAST_KEY,
  RQ_TVSHOW_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { EpisodeCast } from "@/types/movies/tv/EpisodeCast";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface Props {
  params: {
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  };
}

const page = async ({ params: { id, seasonNumber, episodeNumber } }: Props) => {
  const queryClient = new QueryClient();

  const apiClientEpisodeCast = new MyAPIClient<EpisodeCast>(
    RQ_TVSHOW_EPISODE_CAST_ENDPOINT(id, seasonNumber, episodeNumber),
  );
  await queryClient.prefetchQuery({
    queryKey: [RQ_TVSHOW_EPISODE_CAST_KEY(id, seasonNumber, episodeNumber)],
    queryFn: () => apiClientEpisodeCast.getAll(),
  });

  return (
    <>
      <BackTo
        queryKey={RQ_TVSHOW_KEY(id)}
        backTo={{
          label: `Season ${seasonNumber} Episode ${parseInt(episodeNumber)}`,
          link: `/tv/${id}/seasons/${seasonNumber}/${episodeNumber}`,
        }}
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <EpisodeCastPage />
      </HydrationBoundary>
    </>
  );
};

export default page;
