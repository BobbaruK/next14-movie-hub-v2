"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";
import Link from "next/link";
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
import { useRouter } from "next/navigation";

interface Props {
  menuItems: MainTitleMenuItem[];
}

const BurgerMenu = ({ menuItems }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button variant="outline" size="icon" className="hidden md:flex">
        <IoSearch />
      </Button>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger className="text-3xl hover:text-primary">
            <GiHamburgerMenu />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col justify-start gap-8"
          >
            <SheetHeader>
              <SheetTitle className="text-start">Navigation</SheetTitle>
              <Accordion type="single" collapsible className="w-full">
                {menuItems.map((menuItem, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="pb-0">
                      {menuItem.label}
                    </AccordionTrigger>
                    <AccordionContent className="text-start">
                      <ul className="mt-1 flex flex-col gap-4">
                        {menuItem.children?.map((child) => (
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
                  </AccordionItem>
                ))}
              </Accordion>
              <SheetDescription className="text-start">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis, maxime?
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
