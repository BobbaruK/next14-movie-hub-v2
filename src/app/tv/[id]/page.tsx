import MainTitleCast from "@/components/MainTitle/Cast";
import MainTitleHeroSection from "@/components/MainTitle/HeroSection";
import MainTitleRecommendations from "@/components/MainTitle/Recommendations";
import MainTitleReviews from "@/components/MainTitle/Reviews";
import MainTitleCurrentSeason from "@/components/MainTitle/tv/CurrentSeason";
import MainKeywords from "@/components/Sidebar/MainTitle/MainKeywords";
import OriginalLanguage from "@/components/Sidebar/MainTitle/OriginalLanguage";
import ProductionCompanies from "@/components/Sidebar/MainTitle/ProductionCompanies";
import ProductionCountries from "@/components/Sidebar/MainTitle/ProductionCountries";
import SocialMediaLinks from "@/components/Sidebar/MainTitle/SocialMediaLinks";
import Status from "@/components/Sidebar/MainTitle/Status";
import Networks from "@/components/Sidebar/MainTitle/tv/Networks";
import Type from "@/components/Sidebar/MainTitle/tv/Type";
import {
  RQ_TVSHOW_CAST_KEY,
  RQ_TVSHOW_EXTERNAL_IDS_KEY,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_KEYWORDS_KEY,
  RQ_TVSHOW_RECOMMENDATIONS_KEY,
  RQ_TVSHOW_REVIEWS_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TvShow({ params: { id } }: Props) {
  return (
    <>
      <MainTitleHeroSection queryKey={RQ_TVSHOW_KEY(id)} />
      <div className="appContaier flex flex-col gap-8 py-20 lg:flex-row">
        <div className="flex flex-col gap-7 lg:basis-3/4">
          <MainTitleCast queryKey={RQ_TVSHOW_CAST_KEY(id)} type="tv" />
          <MainTitleCurrentSeason queryKey={RQ_TVSHOW_KEY(id)} />
          <MainTitleReviews queryKey={RQ_TVSHOW_REVIEWS_KEY(id)} type="tv" />
          <MainTitleRecommendations
            queryKey={RQ_TVSHOW_RECOMMENDATIONS_KEY(id)}
          />
        </div>
        <div className="lg:basis-1/4">
          <div className="flex flex-col gap-10">
            <SocialMediaLinks
              queryKeyMainTitle={RQ_TVSHOW_KEY(id)}
              queryKeyExternalIds={RQ_TVSHOW_EXTERNAL_IDS_KEY(id)}
            />
            <Status queryKey={RQ_TVSHOW_KEY(id)} />
            <Type queryKey={RQ_TVSHOW_KEY(id)} />
            <Networks queryKey={RQ_TVSHOW_KEY(id)} />
            <OriginalLanguage queryKey={RQ_TVSHOW_KEY(id)} />
            <ProductionCompanies queryKey={RQ_TVSHOW_KEY(id)} />
            <ProductionCountries queryKey={RQ_TVSHOW_KEY(id)} />
            <MainKeywords queryKey={RQ_TVSHOW_KEYWORDS_KEY(id)} />
          </div>
        </div>
      </div>
    </>
  );
}
