"use client";

import CustomAlert from "@/components/CustomAlert";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const AlsoKnownAs = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Also Known As"}
        description="Loading... Please be patient"
      />
    );

  return (
    <>
      {data?.also_known_as.length !== 0 && (
        <div>
          <h3 className="m-0">Also Known As</h3>
          <ul>
            {data?.also_known_as.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AlsoKnownAs;
