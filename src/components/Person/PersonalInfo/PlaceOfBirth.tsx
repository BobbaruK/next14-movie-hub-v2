"use client";

import CustomAlert from "@/components/CustomAlert";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const PlaceOfBirth = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Place of Birth"}
        description="Loading... Please be patient"
      />
    );

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
