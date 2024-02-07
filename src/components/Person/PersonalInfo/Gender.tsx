"use client";

import CustomAlert from "@/components/CustomAlert";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Gender = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Gender"}
        description="Loading... Please be patient"
      />
    );

  const getGender = (gender: number) => {
    switch (gender) {
      case 1:
        return "Female";

      case 2:
        return "Male";

      case 3:
        return "Non-binary";

      default:
        return "Not specified";
    }
  };

  return (
    <>
      {data?.gender !== undefined && (
        <div>
          <h3 className="m-0">Gender</h3>
          <p>{getGender(data.gender)}</p>
        </div>
      )}
    </>
  );
};

export default Gender;
