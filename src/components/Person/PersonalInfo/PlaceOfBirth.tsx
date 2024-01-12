"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
}

const PlaceOfBirth = ({ endpoint, queryKey }: Props) => {
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
    <div>
      <h3 className="m-0">Place of Birth</h3>
      <p>{data?.place_of_birth}</p>
    </div>
  );
};

export default PlaceOfBirth;
