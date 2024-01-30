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
  if (src === noImage.src) return src + "?w=" + width;

  return (
    secureBaseUrl +
    "original" +
    src +
    `?device_width=${width}&screen_size=original`
  );
};

const posterImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

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

  return (
    secureBaseUrl +
    sizeSmallerThen780 +
    src +
    `?device_width=${width}&screen_size=${sizeSmallerThen780}`
  );
};

const profileImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

  const sizeSmallerThen45: ProfileSizes = "w45";
  const sizeSmallerThen185: ProfileSizes = "w185";
  const sizeSmallerThenH632: ProfileSizes = "h632";
  const sizeSmallerThenOriginal: ProfileSizes = "original";

  // console.log("src: " + src);

  if (width <= 45)
    return (
      secureBaseUrl +
      sizeSmallerThen45 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen45}`
    );

  if (width > 45 && width <= 185)
    return (
      secureBaseUrl +
      sizeSmallerThen185 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen185}`
    );

  if (width > 185 && width <= 632)
    return (
      secureBaseUrl +
      sizeSmallerThenH632 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThenH632}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${src}?device_width=${width}original`
  );
};

const logoImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // const srcSVG = src.replace(".png", ".svg");
  // not all logos are svgs
  const srcSVG = src;

  if (srcSVG === noImage.src) return srcSVG + "?w=" + width;

  const sizeSmallerThen45: LogoSizes = "w45";
  const sizeSmallerThen92: LogoSizes = "w92";
  const sizeSmallerThen154: LogoSizes = "w154";
  const sizeSmallerThen185: LogoSizes = "w185";
  const sizeSmallerThen300: LogoSizes = "w300";
  const sizeSmallerThen500: LogoSizes = "w500";
  const sizeSmallerThenOriginal: LogoSizes = "original";

  // console.log("src: " + src);

  if (width <= 45)
    return (
      secureBaseUrl +
      sizeSmallerThen45 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen45}`
    );

  if (width > 45 && width <= 92)
    return (
      secureBaseUrl +
      sizeSmallerThen92 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen92}`
    );

  if (width > 92 && width <= 154)
    return (
      secureBaseUrl +
      sizeSmallerThen154 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen154}`
    );

  if (width > 154 && width <= 185)
    return (
      secureBaseUrl +
      sizeSmallerThen185 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen185}`
    );

  if (width > 185 && width <= 300)
    return (
      secureBaseUrl +
      sizeSmallerThen300 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen300}`
    );

  if (width > 300 && width <= 500)
    return (
      secureBaseUrl +
      sizeSmallerThen500 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen500}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${srcSVG}?device_width=${width}original`
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

  const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
    switch (type.type) {
      case "poster":
        return posterImageLoader({ src, width, quality });

      case "profile":
        return profileImageLoader({ src, width, quality });

      case "logo":
        return logoImageLoader({ src, width, quality });

      default:
        return imageLoader({ src, width, quality });
    }
  };

  return (
    <>
      <div
        {...restProps}
        className={cn(
          `relative w-full overflow-hidden ${restProps.className || ""}`,
        )}
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
