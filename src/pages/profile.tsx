import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Spinner from "@/components/templates/spinner";
import { formOptions } from "@/lib/utils/yupValidation";
import GoToSignIn from "@/components/templates/unAuthPage";
import { alertService } from "@/components/alert/services";
import ProfileComponent from "@/components/pages/profile";

/* 3+ pending functions to implement
  user session object: must be defined with db & google provider.
  default form values: fetch user and set form values if in edit mode.
  function handleSubmit: send all updated information to rider/[id] API && spinner.
  and more... e.g getServerSideProps should be uncommented to secure users Profile routing.
*/

export default function Profile() {
  // state variables user info & action
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  const [user, setUser] = useState<any>({});
  const [edit, setEdit] = useState<any>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const user = session?.user;
    setUser(user);
  }, []);

  // handling user actions on the page
  function handleToggleEdit() {
    setEdit(true);
  }
  function handleSubmitEdit() {
    alertService.success("Your information has been saved", options);
    setEdit(false);
    <Spinner />;
  }

  // handle different provider form submission
  // some code differentiating between ridersRepo crud and google

  // var user object
  const name = user?.name || "Ryder GP User";
  const email = user?.email || "email@rydergp";
  const contact = user?.phone || "012-345-6789";
  const avatar = user?.image || "/profileAvi.png";
  const location = user?.location || "Abuja, Nigeria";
  const bio = user?.bio || "I am just a placeholder for your bio";
  // implement in user logic route
  const revenue = user?.revenue || "0";
  // implement stars with react-icons
  const rating = user?.rating || "4.9";
  // implement riderUser boolean from auth
  const riderUser = true;

  const { formState } = useForm(formOptions);
  const { errors } = formState;

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    return (
      <>
        <div className="w-full flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <ProfileComponent
            bio={bio}
            name={name}
            email={email}
            avatar={avatar}
            contact={contact}
            location={location}
          />
          <div className="mt-10 flex flex-col justify-center">
            <button onClick={() => handleToggleEdit()}>
              <b>Edit your information</b>
            </button>
            {/* _________NAMES_________ */}
            {edit && (
              <>
                <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <form
                    // action={`/api/riders/edit`}
                    className="space-y-6"
                    method="POST"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-white-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          autoComplete="firstName"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-white-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          autoComplete="lastName"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {/* ______PHONE NUMBER______ */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium leading-6 text-white-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="number"
                          autoComplete="phone"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {/* ______UPLOAD BIO______ */}
                    <div>
                      <label
                        htmlFor="bio"
                        className="block text-sm font-medium leading-6 text-white-900"
                      >
                        Write Something catchy about yourself
                      </label>
                      <div className="mt-2">
                        <input
                          id="bio"
                          name="bio"
                          type="textfield"
                          required
                          className="block w-full rounded-md border-0 py-12 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-field"
                        />
                      </div>
                    </div>
                    {/* _______UPLOAD IMAGE_______ */}
                    <div>
                      <label className="mb-2 block text-sm font-medium leading-6 text-white-900">
                        Upload your Image{" "}
                      </label>
                      <input
                        className="block w-full focus:ring-2 focus:ring-inset"
                        type="file"
                        name="upload"
                      />
                    </div>
                    <hr />
                    {/* ________PASSWORD________ */}
                    <h2 className="block text-lg text-center text-2xl font-bold leading-6 text-white-900">
                      {" "}
                      Change Password{" "}
                    </h2>
                    <h3 className="mt-1 mb-5 text-yellow-100">
                      Leave blank if you do not wish to change your current
                      password!
                    </h3>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-white-900"
                        >
                          Current Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-white-900"
                        >
                          New Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </form>
                  <p className="mt-10 text-center text-lg text-white-500">
                    Done editing?{"  "}
                    <a
                      type="submit"
                      // href={"#"}
                      href={`/api/riders/edit`}
                      className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      onClick={() => handleSubmitEdit()}
                    >
                      {formState.isSubmitting && (
                        <span className="spinner-border spinner-border-sm me-1"></span>
                      )}
                      Save Changes
                    </a>
                  </p>
                </main>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
  return <GoToSignIn />;
}
