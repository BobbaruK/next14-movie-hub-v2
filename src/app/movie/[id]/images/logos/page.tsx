import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesLogos({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>Movie Images Logos</h1>
          <Link href={`/movie/${id}/images/logos/12`} scroll={false}>
            logos 12
          </Link>{" "}
          <br />
          <Link href={`/movie/${id}/images/logos/13`} scroll={false}>
            logos 13
          </Link>{" "}
          <br />
          <Link href={`/movie/${id}/images/logos/123`} scroll={false}>
            logos 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
