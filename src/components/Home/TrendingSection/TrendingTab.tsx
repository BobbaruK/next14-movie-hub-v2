import { MainTitleEmblaCarousel } from "@/components/MainTitleEmblaCarousel";
import { homeTrendingImageHeight } from "@/constants";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";

interface Props {
  data: (MovieRecommendation | TVShowRecommendation)[];
}

const TrendingDay = ({ data }: Props) => {
  return (
    <>
      <MainTitleEmblaCarousel
        typeOptions={{
          type: "movie-recommendation",
          arr: data,
        }}
        imageDetails={{
          classes: homeTrendingImageHeight,
          sizes: `
						(max-width: 320px) 158px,
						(max-width: 639px) 293px,
						(max-width: 767px) 237px,
						(max-width: 1023px) 241px,
						(max-width: 1279px) 223px,
						141px
					`,
          type: "other",
        }}
        slideSizes="auto-cols-[50%] sm:auto-cols-[33.33%] md:auto-cols-[25%] lg:auto-cols-[20%] xl:auto-cols-[16.66%]"
        carouselOptions={{
          showButtons: true,
        }}
      />
    </>
  );
};

export default TrendingDay;
