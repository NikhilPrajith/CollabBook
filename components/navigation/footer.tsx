import Link from "next/link";
import Image from "next/image";
import { Settings, Company } from "@/lib/meta";

export function Footer() {
  return (
    <footer className="bg-secondary border-t shadow ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <span className="bg-background rounded-sm p-3 text-xs">GW</span>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{Company.name}</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Support</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <p className="text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            className="font-semibold"
            href="/"
          >
            {Company.name}
          </Link>
          .
        </p>
    </div>
</footer>
  );
}

/*
<footer className="w-full h-16 border-t bg-secondary">
      <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-0 w-full h-full px-2 sm:py-0 py-3 sm:px-4 lg:px-8 text-sm text-muted-foreground">
        <p className="text-center">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            className="font-semibold"
            href={Settings.siteicon}
          >
            {Company.name}
          </Link>
          .
        </p>
        {Company.branding !== false && (
          <div className="text-center hidden md:block">
            GW
          </div>
        )}
      </div>
    </footer>*/