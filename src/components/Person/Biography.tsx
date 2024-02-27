"use client";

import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CustomAlert from "../CustomAlert";
import { Button } from "../ui/button";

interface Props {
  queryKey: string;
}

const Biography = ({ queryKey }: Props) => {
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
  });

  const [show, setShow] = useState(false);
  const charNo = 600;

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Biography"}
        description="Loading... Please be patient"
      />
    );

  if (!data?.biography)
    return (
      <CustomAlert
        variant="default"
        title={"Error"}
        description="No biography found"
      />
    );

  return (
    <div>
      {data?.biography.length! <= 600
        ? data?.biography
        : show
          ? data?.biography
          : data.biography.substring(0, charNo)}

      {data.biography.length > 600 && (
        <>
          {!show && "..."}{" "}
          <Button
            variant={"outline"}
            size={'sm'}
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "show less" : "show more"}
          </Button>
        </>
      )}
    </div>
  );
};

export default Biography;
