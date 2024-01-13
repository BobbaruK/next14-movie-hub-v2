"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
}

const KnownFor = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<People>(endpoint);
  const { data, error, isLoading } = useQuery<People>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading personal info...</div>;

  return (
    <>
      {data?.known_for_department && (
        <div>
          <h3 className="m-0">Known for</h3>
          <p>{data.known_for_department}</p>
        </div>
      )}
    </>
  );
};

export default KnownFor;
