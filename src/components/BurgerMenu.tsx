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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  menuItems: MainTitleMenuItem[];
  showIcon?: boolean;
  label?: string;
}

const BurgerMenu = ({ menuItems, showIcon, label, ...restProps }: Props) => {
  const router = useRouter();

  return (
    <div {...restProps} className={`${restProps.className}`}>
      <Sheet>
        <SheetTrigger className="flex flex-row items-center justify-center gap-2 text-primary-foreground hover:text-inherit" aria-label="Main Navigation">
          {(showIcon || !label) && (
            <span className="text-3xl">
              <GiHamburgerMenu />
            </span>
          )}
          {label}
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col justify-start gap-8"
        >
          <SheetHeader>
            <SheetTitle className="text-start">
              <SheetClose
              // onClick={(e) => {
              //   router.push("/");
              // }}
              >
                {label}
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
              Movie HUB APP is based on The Movie Database (TMDB) api wich is a
              popular, user editable database for movies and TV shows.
            </SheetDescription>
          </SheetHeader>
          {/* <SheetFooter className="flex-row items-center justify-between gap-8 sm:justify-between">
            <Button variant="outline" size="icon">
              <IoSearch />
            </Button>
            <SheetClose>close</SheetClose>
            <ModeToggle />
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BurgerMenu;
