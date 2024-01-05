import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowsImagesPosters({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>TVShows Images Posters</h1>
          <Link href={`/tv/${id}/images/posters/12`} scroll={false}>
            posters 12
          </Link>
          <br />
          <Link href={`/tv/${id}/images/posters/13`} scroll={false}>
            posters 13
          </Link>
          <br />
          <Link href={`/tv/${id}/images/posters/123`} scroll={false}>
            posters 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
