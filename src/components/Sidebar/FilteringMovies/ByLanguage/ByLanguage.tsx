"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { RQ_LANGUAGES_ENDPOINT, RQ_LANGUAGES_KEY } from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Language } from "@/types/movies/Language";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ByLanguage = () => {
  const [isPending, startTransition] = useTransition();

  const apiClient = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);

  const { data, error, isLoading } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClient.getAll(),
  });

  const params = useSearchParams();
  const genreParams = params.get("with_genres");
  const sortByParams = params.get("sort_by");

  const paramsString = (lang: string): string =>
    `?page=1${
      genreParams ? "&with_genres=" + genreParams : ""
    }&with_original_language=${lang}${
      sortByParams ? "&sort_by=" + sortByParams : ""
    }`;

  const router = useRouter();

  if (error) throw new Error(`${RQ_LANGUAGES_KEY} - ${error.message}`);

  if (isLoading)
    return <div className="alert alert-warning">Loading languages...</div>;

  const languages = [...(data || [])];

  languages.sort((a, b) => {
    if (a.english_name < b.english_name) {
      return -1;
    }
    if (a.english_name > b.english_name) {
      return 1;
    }
    return 0;
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div>
      <h3 className="flex items-center gap-4">
        <label htmlFor="byLanguage">By Language</label>
        {isPending && <LoadingSpinner size="md" />}
      </h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[270px] justify-between"
          >
            {value
              ? languages.find((language) => language.iso_639_1 === value)
                  ?.english_name
              : "Select Language..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-[300px] w-[270px] p-0">
          <Command>
            <CommandInput placeholder="Search language by iso code..." />
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto">
              {languages.map((framework) => (
                <CommandItem
                  key={framework.iso_639_1}
                  value={framework.iso_639_1}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    console.log(currentValue);
                    startTransition(() =>
                      router.push(paramsString(currentValue)),
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.iso_639_1
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {framework.english_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ByLanguage;
