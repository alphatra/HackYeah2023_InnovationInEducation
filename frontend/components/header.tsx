"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HeaderProps = {
  variant?: "dark" | "light";
};

export function Header({ variant }: HeaderProps) {
  return (
    <div
      className={cn(
        "fixed top-0 z-20 left-0 w-full",
        variant === "light" ? "text-black" : "text-white"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/">
          <Logo className="h-8" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/faq" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg")}
                >
                  FAQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about-us" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "text-lg")}
                >
                  O nas
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
