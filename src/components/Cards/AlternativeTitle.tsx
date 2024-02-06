import { Country } from "@/types/Country";
import { AltTitle } from "@/types/movies/AlternativeTitle";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import React from "react";

interface Props {
  titles: AltTitle[];
  countries: Country[];
}

const AlternativeTitleCard = ({ titles, countries }: Props) => {
  const countryName = countries.find(
    (country) => country.iso_3166_1 === titles[0].iso_3166_1,
  );
  return (
    <Card className="overflow-hidden" id={titles[0].iso_3166_1}>
      <div className="bg-primary px-4 py-2 font-bold text-primary-foreground">
        {countryName?.english_name || titles[0].iso_3166_1}
      </div>
      <CardContent className="p-0 md:hidden">
        {titles.map((title, ind) => (
          <div
            key={title.iso_3166_1 + ind}
            className={`${ind !== titles.length - 1 && "border-b-[1px] border-primary"}`}
          >
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Title:</div>
              <div>{title.title}</div>
            </div>
            <div className="flex flex-col px-4 py-2 text-center">
              <div className="font-bold">Type:</div>
              <div>{title.type ? title.type : "-"}</div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardContent className="hidden p-0 md:block">
        <div className="flex border-b-[1px] border-primary px-4 py-2">
          <div className="basis-2/4 font-bold">Title</div>
          <div className="basis-2/4 font-bold">Type</div>
        </div>
        {titles.map((title, ind) => (
          <div className="flex px-4 py-2" key={title.iso_3166_1 + ind}>
            <div className="basis-2/4">{title.title}</div>
            <div className="basis-2/4">{title.type ? title.type : "-"}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlternativeTitleCard;
