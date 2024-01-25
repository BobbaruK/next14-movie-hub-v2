"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
                <ul className="flex flex-grow flex-col gap-4">
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
                <ul className="flex flex-grow flex-col gap-4">
                  <ListItem href="/tv" title="Popular">
                    Popular tv shows
                  </ListItem>
                  <ListItem href="/tv/airing-today" title="Airing Today">
                    Airing Today tv shows
                  </ListItem>
                  <ListItem href="/tv/on-the-air" title="On TV">
                    Upcoming tv shows
                  </ListItem>
                  <ListItem href="/tv/top-rated" title="Top Rated">
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
                <ul className="flex flex-grow flex-col gap-4">
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
