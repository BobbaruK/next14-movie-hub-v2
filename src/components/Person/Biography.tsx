"use client";

import MyAPIClient from "@/services/myApiClient";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  queryKey: string;
  endpoint: string;
}

const Biography = ({ endpoint, queryKey }: Props) => {
  const apiClient = new MyAPIClient<PeopleResponse>(endpoint);
  const { data, error, isLoading } = useQuery<PeopleResponse>({
    queryKey: [queryKey],
    queryFn: () => apiClient.getAll(),
  });

  const [show, setShow] = useState(false);
  const charNo = 600;

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading person name...</div>;

  if (!data?.biography)
    return <div className="alert alert-warning">No Biography for this person</div>;

  return (
    <>
      {data?.biography.length! <= 600
        ? data?.biography
        : show
          ? data?.biography
          : data.biography.substring(0, charNo)}

      {data.biography.length > 600 && (
        <>
          {!show && "..."}{" "}
          <button
            className="btn btn-outline btn-xs"
            onClick={() => {
              setShow(!show);
            }}
          >
            {show ? "show less" : "show more"}
          </button>
        </>
      )}
    </>
  );
};

export default Biography;
