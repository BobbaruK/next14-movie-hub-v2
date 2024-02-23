"use client";

import { RQ_LANGUAGES_KEY } from "@/constants";
import { Language } from "@/types/movies/Language";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import CustomAlert from "@/components/CustomAlert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ByLanguage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [isPending, startTransition] = useTransition();

  const { data, error, isLoading } = useQuery<Language[]>({
    queryKey: [RQ_LANGUAGES_KEY],
  });

  const searchParams = useSearchParams();
  const pageParams = searchParams.get("page");

  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page") || pageParams !== "1") params.set("page", "1");
      params.set(name, value);

      return params.toString();
    },
    [searchParams, pageParams],
  );

  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!params.has("page") || pageParams !== "1") params.set("page", "1");
      params.delete(name);

      return params.toString();
    },
    [searchParams, pageParams],
  );

  if (error) throw new Error(`${RQ_LANGUAGES_KEY} - ${error.message}`);

  if (isLoading)
    return (
      <CustomAlert
        variant="default"
        title={"Filter by Language"}
        description="Loading... Please be patient"
      />
    );

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

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        Filter by language
        {isPending && <small> Loading...</small>}
      </div>
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

                    startTransition(() => {
                      if (currentValue === value) {
                        router.push(
                          "?" + deleteQueryString("with_original_language"),
                        );
                        return;
                      }

                      router.push(
                        "?" +
                          createQueryString(
                            "with_original_language",
                            currentValue,
                          ),
                      );
                    });
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
