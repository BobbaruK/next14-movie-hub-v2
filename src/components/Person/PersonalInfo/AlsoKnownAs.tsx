"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
}

const AlsoKnownAs = ({ endpoint, queryKey }: Props) => {
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
      <h3 className="m-0">Also Known As</h3>
      <ul>
        {data?.also_known_as.map((name, index) => <li key={index}>{name}</li>)}
      </ul>
    </div>
  );
};

export default AlsoKnownAs;
