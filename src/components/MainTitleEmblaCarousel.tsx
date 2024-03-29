import { cn } from "@/lib/utils";
import { ImageDetails } from "@/types/ImageDetails";
import { ImageShape, ImagesResponse } from "@/types/ImagesResponse";
import { TheCast } from "@/types/movies/CastAndCrew";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import {
  CombinedCreditsMovieCast,
  CombinedCreditsTVCast,
} from "@/types/people/CombinedCredits";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import dynamic from "next/dynamic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "./ui/button";
const DynamicCastPersonCard = dynamic(() => import("./Cards/CastPerson"));
const DynamicMainCard = dynamic(() => import("./Cards/Main"));
const DynamicImageCard = dynamic(() => import("./Cards/Image"));

interface Props {
  typeOptions:
    | {
        type: "cast";
        arr: TheCast[];
      }
    | {
        type: "movie-recommendation";
        arr: (MovieRecommendation | TVShowRecommendation)[];
      }
    | {
        type: "known-for";
        arr: (CombinedCreditsMovieCast | CombinedCreditsTVCast)[];
      }
    | {
        type: "image";
        arr: ImageShape[];
        showBody: boolean;
      };

  emblaCarouselOptions?: EmblaOptionsType;
  slideSizes?: string;
  carouselOptions?: {
    showButtons?: boolean;
  };
  imageDetails: ImageDetails;
}

export function MainTitleEmblaCarousel({
  typeOptions,
  emblaCarouselOptions,
  slideSizes,
  carouselOptions,
  imageDetails,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    align: "start",
    skipSnaps: true,
    // loop: true,
    // slidesToScroll: 3,
    // startIndex: 4
    ...emblaCarouselOptions,
  });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const cardRender = (arrItem: any) => {
    switch (typeOptions.type) {
      case "cast":
        const cast = arrItem as TheCast;
        return (
          <DynamicCastPersonCard
            cast={cast}
            key={cast.id}
            imageDetails={{ ...imageDetails, type: "profile" }}
          />
        );

      case "movie-recommendation":
        const recommendation = arrItem as
          | MovieRecommendation
          | TVShowRecommendation;
        return (
          <DynamicMainCard
            movie={recommendation}
            imageDetails={{ ...imageDetails, type: "poster" }}
          />
        );

      case "known-for":
        const knownForMovies = arrItem as
          | CombinedCreditsMovieCast
          | CombinedCreditsTVCast;
        return (
          <DynamicMainCard
            movie={knownForMovies}
            imageDetails={{ ...imageDetails, type: "poster" }}
          />
        );

      case "image":
        const image = arrItem as ImageShape;
        return (
          <DynamicImageCard
            image={image}
            imageDetails={{ ...imageDetails, type: "backdrop" }}
            showBody={typeOptions.showBody}
          />
        );

      default:
        break;
    }
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div
          className={cn(
            `embla__container grid auto-cols-[100%] grid-flow-col gap-x-4 sm:auto-cols-[50%] md:auto-cols-[33.33%] lg:auto-cols-[25%] xl:auto-cols-[20%] ${slideSizes}`,
          )}
        >
          {typeOptions.arr.map((arrItem, index) => (
            <div
              key={
                "id" in arrItem ? arrItem.id : arrItem.file_path + "" + index
              }
              className="embla__slide min-w-0"
            >
              {cardRender(arrItem)}
            </div>
          ))}
        </div>
      </div>
      {carouselOptions?.showButtons && (
        <div className="flex gap-2 py-2">
          <Button
            className="embla__prev rounded-full"
            onClick={scrollPrev}
            size="icon"
            aria-label="Previous"
          >
            <FaChevronLeft />
          </Button>
          <Button
            className="embla__next rounded-full"
            onClick={scrollNext}
            size="icon"
            aria-label="Next"
          >
            <FaChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
