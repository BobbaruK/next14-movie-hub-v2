"use client";

import CustomAlert from "@/components/CustomAlert";
import { ExternalIDs } from "@/types/ExternalIDs";
import { MovieResponse } from "@/types/movies/movie/MovieResponse";
import { TVShowResponse } from "@/types/movies/tv/TVShowResponse";
import { PeopleResponse } from "@/types/people/PeopleResponse";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaImdb, FaLink } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiWikidata } from "react-icons/si";

interface Props {
  queryKeyMainTitle: string;
  queryKeyExternalIds: string;
}

const SocialMediaLinks = ({
  queryKeyMainTitle,
  queryKeyExternalIds,
}: Props) => {
  const { data, error, isLoading } = useQuery<
    MovieResponse | TVShowResponse | PeopleResponse
  >({
    queryKey: [queryKeyMainTitle],
  });

  const {
    data: externalIds,
    error: externalIdsError,
    isLoading: externalIdsIsLoading,
  } = useQuery<ExternalIDs>({
    queryKey: [queryKeyExternalIds],
  });

  if (error) throw new Error(`${queryKeyMainTitle} - ${error.message}`);
  if (externalIdsError)
    throw new Error(`${queryKeyExternalIds} - ${externalIdsError.message}`);

  if (isLoading || externalIdsIsLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Social media links"}
        description="Loading... Please be patient"
      />
    );

  const imdbPath = (externalId: string) => {
    if (externalId.startsWith("nm")) return "name";
    return "title";
  };

  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-start gap-3">
        {externalIds?.imdb_id && (
          <Link
            href={`https://www.imdb.com/${imdbPath(externalIds.imdb_id)}/${externalIds.imdb_id}`}
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
        {externalIds?.tiktok_id && (
          <Link
            href={`https://www.tiktok.com/@${externalIds.tiktok_id}`}
            target="_blank"
            className="hover:text-tiktok"
          >
            <FaTiktok size="1.8em" />
          </Link>
        )}
        {externalIds?.youtube_id && (
          <Link
            href={`https://www.youtube.com/@${externalIds.youtube_id}`}
            target="_blank"
            className="hover:text-youtube"
          >
            <FaYoutube size="1.8em" />
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
