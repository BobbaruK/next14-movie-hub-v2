"use client";

import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import CustomAlert from "../CustomAlert";

interface Props {
  queryKey: string;
}

const PersonName = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Name"}
        description="Loading... Please be patient"
      />
    );

  return <h1>{data?.name}</h1>;
};

export default PersonName;
