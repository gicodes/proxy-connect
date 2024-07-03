import { BellIcon } from '@heroicons/react/20/solid';
import React from 'react';

const NavNotificationArea = (user: { image: string | any; name: string | null; email: string | null}) => {
    return (
        <div className="flex my-3 items-center px-5">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src={user.image}
              alt="your profile photo"
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white mb-2">
              {user.name}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400 mt-1">
              {user.email}
            </div>
          </div>
          <button
            type="button"
            className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
    )
}

export default NavNotificationArea