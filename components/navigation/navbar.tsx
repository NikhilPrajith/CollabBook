import Link from "next/link";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { Logo } from "./logo";

import { ModeToggle } from "@/components/navigation/theme-toggle";
import { SheetLeft } from "@/components/navigation/sidebar";
import Search from "@/components/navigation/search";
import Anchor from "@/components/navigation/anchor";
import { Navigations} from "@/settings/navigation";
import { buttonVariants } from "@/components/ui/button";
import AuthButton from "../header-auth";
import { SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b backdrop-filter bg-background md:px-4 px-2">
      <div className="mx-auto flex h-full items-center justify-between p-1 sm:p-3 md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeft />
          <div className="flex items-center gap-6">
            <div className="hidden md:flex">
              <Logo />
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center sm:ml-0 gap-2">
            <AuthButton />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavMenu({ isSheet = false }) {
  return (
    <>
      {Navigations.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="font-bold text-primary"
            absolute
            className="flex items-center gap-1 text-sm"
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
          >
            {item.title}{" "}
            {item.external && (
              <LuArrowUpRight
                className="w-3 h-3 align-super"
                strokeWidth={3}
              />
            )}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
