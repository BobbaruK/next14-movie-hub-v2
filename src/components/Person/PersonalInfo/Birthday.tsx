"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Birthday = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<People>(endpoint);
  const { data, error, isLoading } = useQuery<People>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading personal info...</div>;

  const birthday = ReleaseDateUI(data?.birthday);
  const personDate = new Date(data?.birthday!);
  const currentDate = new Date();

  // To calculate the no. of years between two dates
  let personAge = Math.abs(
    currentDate.getFullYear() - personDate.getFullYear(),
  );

  // Adjust for potential incomplete years
  if (
    currentDate.getMonth() < personDate.getMonth() ||
    (currentDate.getMonth() === personDate.getMonth() &&
      currentDate.getDate() < personDate.getDate())
  ) {
    personAge--;
  }

  return (
    <div>
      <h3 className="m-0">Birthday</h3>
      <p>
        {birthday.releaseDate} ({personAge} years old)
      </p>
    </div>
  );
};

export default Birthday;
