import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesPosters({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>Movie Images Posters</h1>
          <Link href={`/movie/${id}/images/posters/12`} scroll={false}>
            poster 12
          </Link>{" "}
          <br />
          <Link href={`/movie/${id}/images/posters/13`} scroll={false}>
            poster 13
          </Link>{" "}
          <br />
          <Link href={`/movie/${id}/images/posters/123`} scroll={false}>
            poster 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
