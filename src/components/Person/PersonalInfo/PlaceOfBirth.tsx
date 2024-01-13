"use client";

import MyAPIClient from "@/services/myApiClient";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const PlaceOfBirth = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<PeopleResponse>(endpoint);
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading personal info...</div>;

  return (
    <>
      {data?.place_of_birth && (
        <div>
          <h3 className="m-0">Place of Birth</h3>
          <p>{data?.place_of_birth}</p>
        </div>
      )}
    </>
  );
};

export default PlaceOfBirth;
