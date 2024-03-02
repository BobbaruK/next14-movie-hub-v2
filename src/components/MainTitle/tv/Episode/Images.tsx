import { MainTitleEmblaCarousel } from "@/components/MainTitleEmblaCarousel";
import { Badge } from "@/components/ui/badge";
import { imagesSizesEpisodeImages } from "@/constants";
import { ImagesResponse } from "@/types/ImagesResponse";
import { EpisodeResponse } from "@/types/movies/tv/EpisodeResponse";
import idTitleHyphen from "@/utils/idTitleHyphen";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  episodeResponse: EpisodeResponse | undefined;
  episodeImagesResponse: ImagesResponse | undefined;
}

const EpisodeImages = ({ episodeResponse, episodeImagesResponse }: Props) => {
  const { id, seasonNumber, episodeNumber } = useParams<{
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  }>();

  const images = [...episodeImagesResponse?.stills!];
  images.length = 8;

  return (
    <div>
      <h2 className="flex items-center justify-between gap-8">
        <span className="flex items-center gap-4">
          Images
          <Badge>{episodeImagesResponse?.stills.length}</Badge>
        </span>
        <Link
          className="text-sm font-light"
          href={`/tv/${id}/seasons/${seasonNumber}/${idTitleHyphen(
            episodeResponse?.episode_number!,
            episodeResponse?.name!,
          )}/images/backdrops`}
        >
          View All Episode Images
        </Link>
      </h2>
      <MainTitleEmblaCarousel
        typeOptions={{
          type: "image",
          arr: images,
          showBody: false,
        }}
        imageDetails={{
          classes: imagesSizesEpisodeImages,
          sizes: `
						(max-width: 320px) 158px,
						(max-width: 639px) 293px,
						(max-width: 767px) 237px,
						(max-width: 1023px) 241px,
						(max-width: 1279px) 223px,
						141px
					`,
          type: "backdrop",
        }}
      />
    </div>
  );
};

export default EpisodeImages;
