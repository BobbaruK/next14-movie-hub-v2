import ImagesFiltering from "@/components/Sidebar/MainTitle/ImagesFiltering";
import ImagesGrid from "@/components/layouts/ImagesGrid";
import MainTitleSidebarLeft from "@/components/layouts/MainTitle/SidebarLeft";
import { RQ_COLLECTION_IMAGES_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function CollectionImagesBackdrops({ params: { id } }: Props) {
  return (
    <MainTitleSidebarLeft
      content={
        <ImagesGrid
          queryKey={RQ_COLLECTION_IMAGES_KEY(id)}
          imagesType="backdrops"
          imageDetails={{
            classes:
              "h-backdropsImageHeight sm:h-backdropsImageHeight-sm md:h-backdropsImageHeight-md lg:h-backdropsImageHeight-lg xl:h-backdropsImageHeight-xl",
            sizes: `200px`,
            type: "backdrop",
          }}
        />
      }
      sidebar={
        <ImagesFiltering
          title="Backdrops"
          queryKey={RQ_COLLECTION_IMAGES_KEY(id)}
          imagesType="backdrops"
          titleType="collection"
        />
      }
    />
  );
}
