import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_MOVIE_IMAGES_ENDPOINT, RQ_MOVIE_IMAGES_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesLogos({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_MOVIE_IMAGES_KEY(id)}
          endpoint={RQ_MOVIE_IMAGES_ENDPOINT(id)}
          imagesType="logos"
          imageDetails={{
            classes: "h-20 [&>img]:object-contain",
            sizes: "238px",
            type: "backdrop",
          }}
        />
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
