"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import dynamic from "next/dynamic";
import { useState } from "react";

const Sorting = dynamic(() => import("./Sorting"), {
  loading: () => <p>Loading sorting...</p>,
});
const ByGenre = dynamic(() => import("./ByGenre"), {
  loading: () => <p>Loading genres...</p>,
});
const ByLanguage = dynamic(() => import("./ByLanguage"), {
  loading: () => <p>Loading languages...</p>,
});

interface Props {
  genresRQKey: string;
}

const FilteringMovies = ({ genresRQKey }: Props) => {
  const [showSorting, setShowSorting] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Collapsible>
        <CollapsibleTrigger
          className="w-full  bg-primary p-2 text-start text-2xl font-bold text-primary-foreground data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg"
          onClick={() => setShowSorting(!showSorting)}
        >
          Sorting
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-b-lg border p-2">
          {showSorting && <Sorting />}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger
          className="w-full  bg-primary p-2 text-start text-2xl font-bold text-primary-foreground data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg"
          onClick={() => setShowGenres(!showGenres)}
        >
          Genres
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-b-lg border p-2">
          {showGenres && <ByGenre queryKey={genresRQKey} />}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger
          className="w-full  bg-primary p-2 text-start text-2xl font-bold text-primary-foreground data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg"
          onClick={() => setShowLanguages(!showLanguages)}
        >
          Languages
        </CollapsibleTrigger>
        <CollapsibleContent className="rounded-b-lg border p-2">
          {showLanguages && <ByLanguage />}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilteringMovies;
