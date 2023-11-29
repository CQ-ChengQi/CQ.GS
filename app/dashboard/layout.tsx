"use client";

import { Fragment } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { user, userNavigation } from "../lib/data";
import { classNames } from "../lib/utils";
import { Nav, NavUser } from "../ui/components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-indigo-600">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Nav></Nav>
              <NavUser></NavUser>
            </div>
          </div>
        </Disclosure>
        <header className="bg-white shadow-sm">
          <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold leading-6 text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main className="min-h-full">
          <div className="min-h-full mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
