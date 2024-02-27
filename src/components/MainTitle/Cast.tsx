"use client";

import { mainTitleCastImageHeight } from "@/constants";
import { MediaType } from "@/types/MediaType";
import { CastAndCrew } from "@/types/movies/CastAndCrew";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import CustomAlert from "../CustomAlert";
import { MainTitleEmblaCarousel } from "../MainTitleEmblaCarousel";

interface Props {
  queryKey: string;
  type: MediaType;
}

const MainTitleCast = ({ queryKey, type }: Props) => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery<CastAndCrew>({
    queryKey: [queryKey],
  });

  if (error) throw new Error(`${queryKey} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Cast"}
        description="Loading... Please be patient"
      />
    );

  const cast = [...(data?.cast || [])];
  cast.splice(9);

  return (
    <div>
      <h2>{type === "movie" ? "Top Billed Cast" : "Series Cast"}</h2>
      <MainTitleEmblaCarousel
        typeOptions={{ type: "cast", arr: cast }}
        slideSizes="auto-cols-[50%] grid-flow-col sm:auto-cols-[33.33333333333333%] md:auto-cols-[33.33%] lg:auto-cols-[25%] xl:auto-cols-[20%]"
        imageDetails={{
          classes: mainTitleCastImageHeight,
          sizes: `
            (max-width: 320px) 50px,
            (max-width: 639px) 50px,
            (max-width: 767px) 236px,
            (max-width: 1023px) 321px,
            (max-width: 1279px) 50px,
            250px
          `,
          type: "other",
        }}
      />
      <div className="py-4">
        <Link href={`/${type}/${id}/cast`}>View full cast & crew</Link>
      </div>
    </div>
  );
};

export default MainTitleCast;
