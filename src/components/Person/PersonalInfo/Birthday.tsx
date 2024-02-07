"use client";

import CustomAlert from "@/components/CustomAlert";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import ReleaseDateUI from "@/utils/releaseDateUI";
import { useQuery } from "@tanstack/react-query";

interface Props {
  queryKey: string;
}

const Birthday = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Birthday"}
        description="Loading... Please be patient"
      />
    );

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
