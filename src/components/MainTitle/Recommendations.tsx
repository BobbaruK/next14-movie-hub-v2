"use client";

import MyAPIClient from "@/services/myApiClient";
import { RecommendationsResponse } from "@/types/movies/Recommendations";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { useQuery } from "@tanstack/react-query";
import MainCard from "../Cards/Main";

interface Props {
  queryKey: string;
  endpoint: string;
}

const MainTitleRecommendations = ({ queryKey, endpoint }: Props) => {
  const apiClient = new MyAPIClient<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >(endpoint);
  const { data, error, isLoading } = useQuery<
    RecommendationsResponse<MovieRecommendation | TVShowRecommendation>
  >({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <div className="alert alert-warning">
        Loading movie recommendations...
      </div>
    );

  const recommended = [...(data?.results || [])];
  recommended.splice(6);

  return (
    <>
      {recommended.length > 0 && (
        <div>
          <div>
            <h2>Recommendations</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6">
            {recommended.map((movie) => (
              <MainCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MainTitleRecommendations;
