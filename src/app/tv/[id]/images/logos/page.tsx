import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function TVShowsImagesLogos({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <div>
          <h1>TVShows Images Logos</h1>
          <Link href={`/tv/${id}/images/logos/12`} scroll={false}>
            logo 12
          </Link>
          <br />
          <Link href={`/tv/${id}/images/logos/13`} scroll={false}>
            logo 13
          </Link>
          <br />
          <Link href={`/tv/${id}/images/logos/123`} scroll={false}>
            logo 123
          </Link>
        </div>
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
