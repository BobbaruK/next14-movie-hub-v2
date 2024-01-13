"use client";

import MyAPIClient from "@/services/myApiClient";
import { People } from "@/types/people/PeoplesResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Gender = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<People>(endpoint);
  const { data, error, isLoading } = useQuery<People>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-info">Loading personal info...</div>;

  const getGender = (gender: number) => {
    switch (gender) {
      case 0:
        return "Not specified";

      case 1:
        return "Female";

      case 2:
        return "Male";

      case 3:
        return "Non-binary";
    }
  };

  return (
    <>
      {data?.gender && (
        <div>
          <h3 className="m-0">Gender</h3>
          <p>{getGender(data.gender)}</p>
        </div>
      )}
    </>
  );
};

export default Gender;
