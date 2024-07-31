import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { classNames } from "./tailwind-classes";
import { userNavigation } from "./user-navigation";
import NavNotificationArea from "./nav-user-tab";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";


export default function Header(
  { children }: { children: React.ReactNode }
) {
  const router = useRouter();
  const [ nav, setNav ] = useState(false);
  const { data: session, update } = useSession();
  const [navOptions, setNavOption] = useState([
    { name: "Home", href: "/", current: true },
    { name: "Console", href: "/console", current: false },
    { name: "Connect", href: "/connect", current: false },
    { name: "Learn More", href: "/learn-more", current: false },
  ]);

  useEffect(() => {
    async function updateSession() {
      update({
        ...session,
        user: {
          ...session?.user,
        },
      });
    }

    updateSession();
  }, []);

  const handleOpenMenu = ()=> {
    setNav(!nav)
  }

  useEffect(() => {
    const updateCurrentNavigation = () => {
      setNavOption((prevNavOption) =>
        prevNavOption.map((item) =>
          item.href === router.pathname
            ? { ...item, current: true }
            : { ...item, current: false }
        )
      );
    };

    updateCurrentNavigation();
  }, [router.pathname]);

  // Handle navigation click
  const handleNavigationClick = (href: string) => {
    router.push(href);
  };

  
  const user = {
    name: session?.user.name || "John Doe",
    email: session?.user.email || "johndoe@test",
    image: session?.user.image || "/profileAvi.png",
  };

  return (
    <>
      <div className="min-h-full min-w-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-10">
                        {/* navbar menu options for `lg` breakpoint */}
                        {navOptions.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => handleNavigationClick(item.href)}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
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
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* profile dropdown for mobile breakpoint */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={"/profileAvi.png"}
                              alt="your profile photo"
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
                            {userNavigation
                              .filter(item => {
                                if (item.name === "Sign in" && session) return false;
                                if (item.name === "Sign out" && !session) return false;
                                return true;
                              }).map((item) => (
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

                  {/* Mobile menu button */}
                  <div className="min-w-full md:hidden">
                    <div className="flex justify-around....">
                      <div className="flex-1">
                        <a href="/">
                          <img
                            className="h-8 w-8"
                            src="/RyderGP bold/favicon-32x32.png"
                            alt="rydergp.logo"
                          />
                        </a>
                      </div>
                      <div>
                        <Disclosure.Button 
                          onClick={handleOpenMenu}
                          className="rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 my-3 px-3 pb-3 sm:px-3">
                  {/* navbar menu options for `lg` breakpoint */}
                  {navOptions.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={() => handleNavigationClick(item.href)}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <NavNotificationArea 
                    image={user.image} name={user.name} email={user.email} 
                  />
                  <br/>
                  <hr/>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation
                      .filter(item => {
                        if (item.name === "Sign in" && session) return false;
                        if (item.name === "Sign out" && !session) return false;
                        return true;
                      })
                      .map(item => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          onClick={item.onClick}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        
        <Disclosure>
          <div className={nav ? `hidden` : ""}>
            {children}
          </div>
        </Disclosure>
      </div>
    </>
  );
}
