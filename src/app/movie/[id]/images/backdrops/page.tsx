import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesBackdrops({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>Movie Images Backdrops</h1>
          <Link href={`/movie/${id}/images/backdrops/12`} scroll={false}>
            backdrop 12
          </Link>
          <br />
          <Link href={`/movie/${id}/images/backdrops/13`} scroll={false}>
            backdrop 13
          </Link>
          <br />
          <Link href={`/movie/${id}/images/backdrops/123`} scroll={false}>
            backdrop 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
