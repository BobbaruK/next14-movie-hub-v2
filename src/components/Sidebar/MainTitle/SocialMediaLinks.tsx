"use client";

import MyAPIClient from "@/services/myApiClient";
import { MainTitleExternalIds } from "@/types/movies/MainTitleExternalIds";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaImdb, FaLink } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";

interface Props {
  queryKeyMainTitle: string;
  endpointMainTitle: string;
  queryKeyExternalIds: string;
  endpointExternalIds: string;
}

const SocialMediaLinks = ({
  queryKeyMainTitle,
  endpointMainTitle,
  queryKeyExternalIds,
  endpointExternalIds,
}: Props) => {
  const apiClientMainTitle = new MyAPIClient<MovieResponse | TVShowResponse>(
    endpointMainTitle,
  );
  const { data, error, isLoading } = useQuery<MovieResponse | TVShowResponse>({
    queryKey: [queryKeyMainTitle],
    queryFn: () => apiClientMainTitle.getAll(),
  });

  const apiClientExternalIds = new MyAPIClient<MainTitleExternalIds>(
    endpointExternalIds,
  );
  const {
    data: externalIds,
    error: externalIdsError,
    isLoading: externalIdsIsLoading,
  } = useQuery<MainTitleExternalIds>({
    queryKey: [queryKeyExternalIds],
    queryFn: () => apiClientExternalIds.getAll(),
  });

  if (error) throw new Error(`${queryKeyMainTitle} - ${error.message}`);
  if (externalIdsError)
    throw new Error(`${queryKeyExternalIds} - ${externalIdsError.message}`);

  if (isLoading || externalIdsIsLoading)
    return <div className="alert alert-info">Loading Link(s)...</div>;

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-start gap-6">
        {externalIds?.imdb_id && (
          <Link
            href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
            target="_blank"
            className="hover:text-imdb"
          >
            <FaImdb size="2em" />
          </Link>
        )}
        {externalIds?.facebook_id && (
          <Link
            href={`https://www.facebook.com/${externalIds.facebook_id}`}
            target="_blank"
            className="hover:text-facebook"
          >
            <FaFacebook size="1.8em" />
          </Link>
        )}
        {externalIds?.instagram_id && (
          <Link
            href={`https://www.instagram.com/${externalIds.instagram_id}`}
            target="_blank"
            className="hover:text-instagram"
          >
            <FaInstagram size="2em" />
          </Link>
        )}
        {externalIds?.twitter_id && (
          <Link
            href={`https://twitter.com/${externalIds.twitter_id}`}
            target="_blank"
            className="hover:text-twitter"
          >
            <FaXTwitter size="1.8em" />
          </Link>
        )}
        {externalIds?.wikidata_id && (
          <Link
            href={`https://www.wikidata.org/wiki/${externalIds.wikidata_id}`}
            target="_blank"
            className="hover:text-primary"
          >
            <SiWikidata size="2em" />
          </Link>
        )}
        {data?.homepage && (
          <Link
            href={data.homepage}
            target="_blank"
            className="hover:text-primary"
          >
            <FaLink size="1.8em" />
          </Link>
        )}
      </div>
    </>
  );
};

export default SocialMediaLinks;
