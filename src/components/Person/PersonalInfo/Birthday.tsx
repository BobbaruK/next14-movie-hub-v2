"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Birthday = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<People>(endpoint);
  const { data, error, isLoading } = useQuery<People>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading personal info...</div>;

  const birthday = ReleaseDateUI(data?.birthday);
  Object.keys(birthday).length === 0;
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
    <>
      {Object.keys(birthday).length !== 0 && (
        <div>
          <h3 className="m-0">Birthday</h3>
          <p>
            {birthday.releaseDate} ({personAge} years old)
          </p>
        </div>
      )}
    </>
  );
};

export default Birthday;
