import { alertService } from "@/components/alert/services";
import Spinner from "@/components/templates/spinner";
import { Button, Card } from "@chakra-ui/react";
import { useState } from "react";

export default function ProfileForm() {
  // states to store user data & instances
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });

  async function handleSubmitEdit() {
    await fetch("/api/riders/update");

    <Spinner />;
    alertService.success(
      "Your information has been saved",
      setOptions({ autoClose: true, keepAfterRouteChange: false })
    );
  }

  return (
    <div>
      <form
        encType="multipart/form-data"
        action="/api/riders/update"
        method="post"
      >
        <div className="mt-4">
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="firstName"
            required
            placeholder="First Name"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="lastName"
            required
            placeholder="Last Name"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="roll"
            name="roll"
            type="text"
            min-length="10"
            max-length="15"
            required
            placeholder="Phone/ Mobile"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="address"
            required
            placeholder="Region/ City, Country"
            className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <input
            id="bio"
            name="bio"
            type="textField"
            autoComplete="bio"
            required
            placeholder="Write a brief detail about yourself or your business"
            className="pl-2 text-field block w-full rounded-md border-0 py-12 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <br />
        <Button>Change Password</Button>
        <h6 className="text-yellow-100 m-3">
          Leave the following fields blank <span className="block mt-1 text-light"> ... if you do not wish to change your current password!</span>
        </h6>
        <hr />
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="mt-5 block text-sm font-medium leading-6 text-white-900"
            >
              Current Password
            </label>
          </div>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              New Password
            </label>
          </div>
          <div className="mt-1">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="newPassword"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-10 mb-5 text-center text-light">
          <p>
            Done editing?{"  "}
            <button
              type="submit"
              onClick={() => handleSubmitEdit()}
              className="pl-1 text-green-600 hover:text-indigo-500"
            >
              Save Changes
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
