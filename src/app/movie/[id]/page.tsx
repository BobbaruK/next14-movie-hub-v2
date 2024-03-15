import MainTitleCast from "@/components/MainTitle/Cast";
import MainTitleHeroSection from "@/components/MainTitle/HeroSection";
import MainTitleRecommendations from "@/components/MainTitle/Recommendations";
import MainTitleReviews from "@/components/MainTitle/Reviews";
import MainKeywords from "@/components/Sidebar/MainTitle/MainKeywords";
import OriginalLanguage from "@/components/Sidebar/MainTitle/OriginalLanguage";
import ProductionCompanies from "@/components/Sidebar/MainTitle/ProductionCompanies";
import ProductionCountries from "@/components/Sidebar/MainTitle/ProductionCountries";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import Status from "@/components/Sidebar/MainTitle/Status";
import Budget from "@/components/Sidebar/MainTitle/movie/Budget";
import Revenue from "@/components/Sidebar/MainTitle/movie/Revenue";
import {
  RQ_MOVIE_CAST_KEY,
  RQ_MOVIE_EXTERNAL_IDS_KEY,
  RQ_MOVIE_KEY,
  RQ_MOVIE_KEYWORDS_KEY,
  RQ_MOVIE_RECOMMENDATIONS_KEY,
  RQ_MOVIE_REVIEWS_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function Movie({ params: { id } }: Props) {
  return (
    <>
      <MainTitleHeroSection queryKey={RQ_MOVIE_KEY(id)} />
      <div className="container flex flex-col gap-8 py-20 lg:flex-row">
        <div className="flex flex-col gap-7 lg:basis-3/4">
          <MainTitleCast queryKey={RQ_MOVIE_CAST_KEY(id)} type="movie" />
          <MainTitleReviews queryKey={RQ_MOVIE_REVIEWS_KEY(id)} type="movie" />
          <MainTitleRecommendations
            queryKey={RQ_MOVIE_RECOMMENDATIONS_KEY(id)}
          />
        </div>
        <div className="lg:basis-1/4">
          <div className="flex flex-col gap-10">
            <SocialMediaLinks
              queryKeyMainTitle={RQ_MOVIE_KEY(id)}
              queryKeyExternalIds={RQ_MOVIE_EXTERNAL_IDS_KEY(id)}
            />
            <Status queryKey={RQ_MOVIE_KEY(id)} />
            <Budget queryKey={RQ_MOVIE_KEY(id)} />
            <Revenue queryKey={RQ_MOVIE_KEY(id)} />
            <OriginalLanguage queryKey={RQ_MOVIE_KEY(id)} />
            <ProductionCompanies queryKey={RQ_MOVIE_KEY(id)} />
            <ProductionCountries queryKey={RQ_MOVIE_KEY(id)} />
            <MainKeywords queryKey={RQ_MOVIE_KEYWORDS_KEY(id)} />
          </div>
        </div>
      </div>
    </>
  );
}
