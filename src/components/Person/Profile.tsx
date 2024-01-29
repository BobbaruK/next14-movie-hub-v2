"use client";

import MyAPIClient from "@/services/myApiClient";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import TMDBImages from "../TMDBImages";

interface Props {
  queryKey: string;
  endpoint: string;
}

const PersonProfile = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<PeopleResponse>(endpoint);
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading person name...</div>;

  return (
    <div className="overflow-hidden rounded-md">
      <TMDBImages
        type={{ type: "profile", size: "h632" }}
        alt={data?.name!}
        src={data?.profile_path!}
        priority
      />
    </div>
  );
};

export default PersonProfile;
