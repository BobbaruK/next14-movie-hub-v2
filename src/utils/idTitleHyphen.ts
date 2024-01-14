const idTitleHyphen = (id: number, title: string) => {
  const linkTitle = title
    .replace(/[^\w ]/g, "") // remove special characters
    .replace(/ /g, "-") // replace spaces with hyphens
    .toLowerCase();
  return `${id}-${linkTitle}`;
};

export default idTitleHyphen;
