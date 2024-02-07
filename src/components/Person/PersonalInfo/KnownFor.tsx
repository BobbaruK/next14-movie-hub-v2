"use client";

import CustomAlert from "@/components/CustomAlert";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const KnownFor = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Known for"}
        description="Loading... Please be patient"
      />
    );

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
