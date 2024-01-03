const imageLink = <T>(secureURL: string, imageSize: T, posterPath: string) => {
  return secureURL  + imageSize + posterPath;
};

export default imageLink;
