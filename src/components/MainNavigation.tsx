"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function MainNavigation() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex gap-4 p-4 md:w-[400px] lg:w-[400px]">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent className="my-auto">
                    <p>Card Content</p>
                  </CardContent>
                </Card>
                <ul className="flex flex-col gap-4">
                  <ListItem href="/movie" title="Popular">
                    Popular movies
                  </ListItem>
                  <ListItem href="/movie/now-playing" title="Now Playing">
                    Now Playing movies
                  </ListItem>
                  <ListItem href="/movie/upcoming" title="Upcoming">
                    Upcoming movies
                  </ListItem>
                  <ListItem href="/movie/top-rated" title="Top Rated">
                    Top Rated movies
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>TV Shows</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex gap-4 p-4 md:w-[400px] lg:w-[400px]">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent className="my-auto">
                    <p>Card Content</p>
                  </CardContent>
                </Card>
                <ul className="flex flex-col gap-4">
                  <ListItem href="/tv" title="Popular">
                    Popular tv shows
                  </ListItem>
                  <ListItem href="/tv/airing-today" title="Airing Today">
                    Airing Today tv shows
                  </ListItem>
                  <ListItem href="/movie/upcoming" title="On TV">
                    Upcoming tv shows
                  </ListItem>
                  <ListItem href="/movie/top-rated" title="Top Rated">
                    Top Rated tv shows
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>People</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex gap-4 p-4 md:w-[400px] lg:w-[400px]">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent className="my-auto">
                    <p>Card Content</p>
                  </CardContent>
                </Card>
                <ul className="flex flex-col gap-4">
                  <ListItem href="/person" title="Popular">
                    Popular people
                  </ListItem>
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          passHref
          href={props.href!}
          ref={ref}
          className={cn(
            "hover:text-accent-foreground focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
