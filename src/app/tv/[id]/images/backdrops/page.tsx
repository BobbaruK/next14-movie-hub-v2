import MainTitleSidebarLeft from "@/components/MainTitleSidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowsImagesBackdrops({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>TVShows Images Backdrops</h1>
          <Link href={`/tv/${id}/images/backdrops/12`} scroll={false}>
            backdrop 12
          </Link>
          <br />
          <Link href={`/tv/${id}/images/backdrops/13`} scroll={false}>
            backdrop 13
          </Link>
          <br />
          <Link href={`/tv/${id}/images/backdrops/123`} scroll={false}>
            backdrop 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
