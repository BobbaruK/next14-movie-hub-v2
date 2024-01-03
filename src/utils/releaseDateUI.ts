const ReleaseDateUI = (relDate: string | undefined) => {
  if (relDate === undefined) return {};

  const release_date = new Date(relDate);
  const month = release_date.getMonth();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = release_date.getDay() + 1;
  const monthName = monthNames[month];
  const year = release_date.getFullYear();

  const releaseDate = `${day}/${monthName}/${year}`;

  return { releaseDate, year };
};

export default ReleaseDateUI;
