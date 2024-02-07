"use client";

import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import TMDBImages from "../TMDBImages";
import CustomAlert from "../CustomAlert";

interface Props {
  queryKey: string;
}

const PersonProfile = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Profile"}
        description="Loading... Please be patient"
      />
    );

  return (
    <TMDBImages
      type="profile"
      alt={data?.name!}
      src={data?.profile_path!}
      priority
      sizes={`
        (max-width: 1023px) 256px,
        330px
      `}
      className="h-96 w-64 rounded-lg lg:h-personImageHeight-lg lg:w-full xl:h-personImageHeight-xl"
    />
  );
};

export default PersonProfile;
