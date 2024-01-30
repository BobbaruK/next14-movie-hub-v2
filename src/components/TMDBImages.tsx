"use client";

import { cn } from "@/lib/utils";
import {
  BackdropSizes,
  LogoSizes,
  PosterSizes,
  ProfileSizes,
  StillSizes,
} from "@/types/imageSizes";
import Image, { ImageLoaderProps } from "next/image";
import noImage from "../../public/noimage.svg";

const secureBaseUrl = "https://image.tmdb.org/t/p/";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src;

  return (
    secureBaseUrl +
    "original" +
    src +
    `?device_width=${width}&screen_size=original`
  );
};

const posterImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src;

  const sizeSmallerThen92: PosterSizes = "w92";
  const sizeSmallerThen154: PosterSizes = "w154";
  const sizeSmallerThen256: PosterSizes = "w185";
  const sizeSmallerThen342: PosterSizes = "w342";
  const sizeSmallerThen500: PosterSizes = "w500";
  const sizeSmallerThen780: PosterSizes = "w780";
  const sizeSmallerThenOriginal: PosterSizes = "original";

  // console.log("src: " + src);

  if (width <= 92)
    return (
      secureBaseUrl +
      sizeSmallerThen92 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen92}`
    );
  if (width > 92 && width <= 154)
    return (
      secureBaseUrl +
      sizeSmallerThen154 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen154}`
    );
  if (width > 154 && width <= 342)
    return (
      secureBaseUrl +
      sizeSmallerThen256 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen256}`
    );
  if (width > 342 && width <= 500)
    return (
      secureBaseUrl +
      sizeSmallerThen342 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen342}`
    );
  if (width > 500 && width <= 780)
    return (
      secureBaseUrl +
      sizeSmallerThen500 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen500}`
    );
  if (width > 780 && width <= 1400)
    return (
      secureBaseUrl +
      sizeSmallerThen780 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen780}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${src}?device_width=${width}original`
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type:
    | {
        type: "backdrop";
        size: BackdropSizes;
      }
    | {
        type: "logo";
        size: LogoSizes;
      }
    | {
        type: "poster";
        size: PosterSizes;
      }
    | {
        type: "profile";
        size: ProfileSizes;
      }
    | {
        type: "still";
        size: StillSizes;
      }
    | {
        type: "other";
      };
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
}

const TMDBImages = ({
  type,
  src,
  alt,
  sizes,
  priority,
  ...restProps
}: Props) => {
  // TODO: a lot of shit here

  // const apiClientConfig = new MyAPIClient<Image_Configuration>(
  //   RQ_CONFIG_ENDPOINT,
  // );

  // const { data: config } = useQuery<Image_Configuration>({
  //   queryKey: [RQ_CONFIG_KEY],
  //   queryFn: () => apiClientConfig.getAll(),
  // });

  // const secureBaseUrl = config?.images.secure_base_url
  //   ? config.images.secure_base_url
  //   : "https://image.tmdb.org/t/p/";

  // const getOuputSrc = () => {
  //   if (src && type.type !== "other") return secureBaseUrl + type.size + src;
  //   if (src && type.type === "other") return src;
  //   return noImage;
  // };

  // const outputSrc = getOuputSrc();

  const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
    switch (type.type) {
      case "poster":
        return posterImageLoader({ src, width, quality });

      default:
        return imageLoader({ src, width, quality });
    }
  };

  return (
    <>
      <div
        {...restProps}
        className={cn(`relative w-full overflow-hidden ${restProps.className}`)}
      >
        <Image
          loader={customLoader}
          src={src || noImage}
          alt={alt}
          priority={priority}
          title={alt}
          fill
          className="object-cover"
          sizes={sizes}
        />
      </div>
    </>
  );
};

export default TMDBImages;
