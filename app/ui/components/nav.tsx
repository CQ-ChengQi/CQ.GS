import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

import { navigation, user, userNavigation } from "@/app/lib/data";
import { classNames } from "@/app/lib/utils";

function Nav() {
  return (
    <>
      <div className="flex items-center">
        {/** Logo */}
        <div className="flex-shrink-0">
          <Image
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
            alt="Next.js Logo"
            width="32"
            height="32"
          />
        </div>

        {/** 导航 */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-indigo-700 text-white"
                    : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                  "rounded-md px-3 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function NavUser() {
  return (
    <>
      <div className="hidden md:block">
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="relative rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>

                <Image
                  className="h8 w-8 rounded-full"
                  src={user.imageUrl}
                  alt=""
                  width="32"
                  height="32"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}

export { Nav, NavUser };
