"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

const formSchema = z.object({
  searchQuery: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
});

interface Props {
  formButton: ReactNode;
}

// TODO: rethink form

export default function SearchForm({ formButton }: Props) {
  const router = useRouter();
  // const searchParams = useSearchParams();

  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams.toString());
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams],
  // );

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);

    // router.push(`/search?${createQueryString("query", values.searchQuery)}`);
    router.push(`/search?query=${values.searchQuery}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex grow flex-col gap-1">
              {/* <FormLabel>Search</FormLabel> */}
              <FormControl>
                <Input placeholder="Search..." {...field} />
              </FormControl>
              <FormDescription>
                Search for Movies, TV Shows, People and more.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {formButton}
        {/* <Button type="submit" className="m-0">
          Search
        </Button> */}
      </form>
    </Form>
  );
}
