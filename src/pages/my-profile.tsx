import axios from "axios";
import { useColorMode } from "@chakra-ui/react";
import Spinner from "@/components/templates/spinner";
import { signOut, useSession } from "next-auth/react";
import GoToSignIn from "@/components/templates/unAuthPage";
import { alertService } from "@/components/alert/services";
import MyProfileCard from "@/components/pages/myProfileCard";
import { useEffect, useState, useRef } from "react";

export default function Profile() {
  // state variables user info & action
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  const [user, setUser] = useState<any>({});
  const { toggleColorMode } = useColorMode();
  const [edit, setEdit] = useState<any>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const user = session?.user;
    setUser(user);
  }, []);

  const ref = useRef<HTMLInputElement>(null);
  const input = ref.current!;

  function handleToggleEdit() {
    setEdit(true);
  }

  function handleBackToTop() {
    (e: any) => e.preventDefault();
    setEdit(false);
  }

  function handleResetTheme() {
    alertService.warn("Light mode is not supported yet", options);
    return; // line break: handleResetTheme
    toggleColorMode();
  }

  async function handleSubmitEdit() {
    const formData = new FormData();
    for (const file of Array.from(input?.files ?? [])) {
      formData.append(file.name, file);
    }
    await axios.post("/api/upload", formData);
    await fetch("/api/riders/update");
    <Spinner />;
    alertService.success("Your information has been saved", options);
  }

  // var user object as User Profile
  const age = user?.age || 18;
  const name = user?.name || "fetching name..";
  const contact = user?.roll || "081-2345-6789";
  const avatar = user?.image || "/profileAvi.png";
  const email = user?.email || "fetching email...";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am just a placeholder for your bio";
  // pending logic implementation
  const revenue = user?.revenue || "0";
  const rating = user?.rating || "1.0";
  const riderUser = true;

  if (status === "loading") return <Spinner />;
  if (status === "authenticated") {
    return (
      <>
        <main className="w-full flex min-h-full flex-col justify-center">
          <MyProfileCard
            age={age}
            bio={bio}
            name={name}
            email={email}
            avatar={avatar}
            rating={rating}
            contact={contact}
            address={address}
            revenue={revenue}
          />
          <div className="mt-10 mb-10 flex flex-col justify-center">
            <button
              onClick={() => handleToggleEdit()}
              className="text-lg text-blue-500"
            >
              Edit your profile information
            </button>{" "}
            {/* ______EDIT PROFILE______ */}
            {edit && (
              <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                      <div className="mt-2">
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
                      <div className="mt-2">
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
                      <div className="mt-2">
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
                        Write Something unique about yourself
                      </label>
                      <div className="mt-2">
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
                    {/* _______UPLOAD IMAGE_______ */}
                    <div>
                      <label
                        htmlFor="image"
                        className="mt-5 mb-2 block text-sm font-medium leading-6 text-white-900"
                      >
                        Upload your Image{" "}
                      </label>
                      <input
                        id="image"
                        className="block w-full focus:ring-2 focus:ring-inset"
                        type="file"
                        name="image"
                        accept="image/*"
                        ref={ref}
                        multiple
                      />
                    </div>
                    <hr />
                    {/* ________PASSWORD________ */}
                    <h2 className="mt-10 block text-lg text-center text-2xl font-bold leading-6 text-white-900">
                      {" "}
                      Change Password{" "}
                    </h2>
                    <h3 className="mt-5 mb-5 text-yellow-100">
                      Leave blank if you do not wish to change your current
                      password!
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
                      <div className="mt-2">
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
                      <div className="mt-2">
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
                  <button
                    onClick={() => handleBackToTop}
                    type="button"
                    className="mt-5 justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6"
                  >
                    Cancel Changes
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="mt-10 mb-5 text-center">
            <span
              className="font-bold leading-6 text-gray-600"
              onClick={() => handleResetTheme()}
            >
              Reset Theme
            </span>
          </div>

          <div className="mx-auto rounded-md sign-out">
            <button onClick={() => signOut}>
              <a href="/api/auth/signout">Log out</a>
            </button>
          </div>
        </main>
      </>
    );
  }
  return <GoToSignIn />;
}
