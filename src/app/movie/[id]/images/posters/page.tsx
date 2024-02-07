import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_MOVIE_IMAGES_ENDPOINT, RQ_MOVIE_IMAGES_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesPosters({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_MOVIE_IMAGES_KEY(id)}
          endpoint={RQ_MOVIE_IMAGES_ENDPOINT(id)}
          imagesType="posters"
          imageDetails={{
            classes:
              "h-postersImageHeight sm:h-postersImageHeight-sm md:h-postersImageHeight-md lg:h-postersImageHeight-lg xl:h-postersImageHeight-xl",
            sizes: `
            (max-width: 320px) 150px,
            (max-width: 767px) 285px,
            (max-width: 1023px) 312px,
            (max-width: 1279px) 210px,
            343px
          `,
            type: "poster",
          }}
        />
      }
      sidebar={<p>Main Movie Filtering Sidebar</p>}
    />
  );
}
