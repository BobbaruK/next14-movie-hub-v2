"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  menuItems: MainTitleMenuItem[];
}

const BurgerMenu = ({ menuItems, ...restProps }: Props) => {
  const router = useRouter();

  return (
    <div {...restProps} className={`flex gap-4 ${restProps.className}`}>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger className="text-3xl hover:text-inherit">
            <GiHamburgerMenu />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col justify-start gap-8"
          >
            <SheetHeader>
              <SheetTitle className="text-start">
                <SheetClose
                  onClick={(e) => {
                    router.push("/");
                  }}
                >
                  SCSSeco&apos;s MovieHub
                </SheetClose>
              </SheetTitle>
              <Accordion type="single" collapsible className="w-full">
                {menuItems.map((menuItem, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index + 1}`}
                    className="[&>h3]:m-0"
                  >
                    {menuItem.children ? (
                      <>
                        <AccordionTrigger>{menuItem.label}</AccordionTrigger>
                        <AccordionContent className="text-start">
                          <ul className="mt-1 flex flex-col gap-4">
                            {menuItem.children.map((child) => (
                              <li key={child.label.replaceAll(" ", "-")}>
                                {child.href ? (
                                  <SheetClose
                                    onClick={(e) => {
                                      router.push(child.href!);
                                    }}
                                  >
                                    {child.label}
                                  </SheetClose>
                                ) : (
                                  child.label
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </>
                    ) : (
                      <SheetClose
                        className="block py-4 font-medium hover:underline"
                        onClick={(e) => {
                          router.push(menuItem.href!);
                        }}
                      >
                        {menuItem.label}
                      </SheetClose>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
              <SheetDescription className="text-start">
                Movie HUB APP is based on The Movie Database (TMDB) api wich is
                a popular, user editable database for movies and TV shows.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="flex-row items-center justify-between gap-8 sm:justify-between">
              <Button variant="outline" size="icon">
                <IoSearch />
              </Button>
              <SheetClose>close</SheetClose>
              <ModeToggle />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default BurgerMenu;
