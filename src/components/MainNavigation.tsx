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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MainTitleMenuItem } from "@/types/movies/MainMovieMenuItem";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  menuItems: MainTitleMenuItem[];
}

export function MainNavigation({ menuItems, ...restProps }: Props) {
  return (
    <NavigationMenu className={`${restProps.className}`}>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label.replaceAll(" ", "-")}>
            {item.children ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex gap-4 p-4 md:w-[400px] lg:w-[400px]">
                    {/* <Card className="flex flex-col">
               <CardHeader>
                 <CardTitle>Card Title</CardTitle>
                 <CardDescription>Card Description</CardDescription>
               </CardHeader>
               <CardContent className="my-auto">
                 <p>Card Content</p>
               </CardContent>
             </Card> */}
                    <ul className="flex flex-grow flex-col gap-4">
                      {item.children.map((child) => (
                        <ListItem
                          key={child.label.replaceAll(" ", "-")}
                          href={child.href}
                          title={child.label}
                        >
                          {child.descriptionLabel}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href!} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
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
