import { alertService } from "@/components/alert/services";
import Spinner from "@/components/templates/spinner";
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
    <>
      <form
        encType="multipart/form-data"
        action="/api/riders/update"
        method="post"
      >
        {/* _________NAMES_________ */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-white-900"
          >
            First & Last Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Ryder GP"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* ______PHONE NUMBER______ */}
        <div>
          <label
            htmlFor="roll"
            className="mt-3 block text-sm font-medium leading-6 text-white-900"
          >
            Phone Number
          </label>
          <div className="mt-1">
            <input
              id="roll"
              name="roll"
              type="text"
              min-length="10"
              max-length="15"
              required
              placeholder="081-2345-6789"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* ______LOCATION______ */}
        <div>
          <label
            htmlFor="address"
            className="mt-3 block text-sm font-medium leading-6 text-white-900"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="address"
              required
              placeholder="Abuja, Nigeria"
              className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* ______UPLOAD BIO______ */}
        <div>
          <label
            htmlFor="bio"
            className="mt-3 block text-sm font-medium leading-6 text-white-900"
          >
            Update your bio
          </label>
          <div className="mt-1">
            <input
              id="bio"
              name="bio"
              type="textField"
              autoComplete="bio"
              required
              placeholder="I am just a placeholder for your bio. Please write something unique about yourself."
              className="pl-2 text-field block w-full rounded-md border-0 py-12 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <hr />
        {/* ________PASSWORD________ */}
        <h2 className="mt-10 block text-lg text-center text-2xl font-bold leading-6 text-white-900">
          {" "}
          Change Password{" "}
        </h2>
        <h3 className="mt-5 mb-5 text-yellow-100">
          Leave blank if you do not wish to change your current password!
        </h3>
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
        <div className="mt-10 mb-5 text-center text-lg text-white-500">
          <p>
            Done editing?{"  "}
            <button
              type="submit"
              onClick={() => handleSubmitEdit()}
              className="pl-2 font-semibold leading-6 text-green-600 hover:text-indigo-500"
            >
              Save Changes
            </button>
          </p>
        </div>
      </form>
    </>
  );
}
