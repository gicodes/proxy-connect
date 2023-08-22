import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Spinner from "@/components/templates/spinner";
import { signOut, useSession } from "next-auth/react";
import { formOptions } from "@/lib/utils/yupValidation";
import GoToSignIn from "@/components/templates/unAuthPage";
import { alertService } from "@/components/alert/services";
import ProfileComponent from "@/components/pages/profileCard";
import { useColorMode } from "@chakra-ui/react";

export default function Profile() {
  // state variables user info & action
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  const [newBio, setNewBio] = useState("");
  const [user, setUser] = useState<any>({});
  const [newName, setNewName] = useState("");
  const { toggleColorMode } = useColorMode();
  const { formState } = useForm(formOptions);
  const [newImage, setNewImage] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [edit, setEdit] = useState<any>(false);
  const { data: session, status } = useSession();
  const [newPassword, setNewPassword] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const user = session?.user;
    setUser(user);
  }, []);

  // handling user actions on the page
  function handleToggleEdit() {
    setEdit(true);
  }

  function handleBackToTop() {
    (e: any) => e.preventDefault();
    setEdit(false);
  }

  function handleResetTheme() {
    (e: any) => e.preventDefault();
    alertService.warn("Cannot reset theme at this time", options);
    toggleColorMode();
  }

  async function handleSubmitEdit() {
    let body = {
      name: newName,
      phone: newPhone,
      bio: newBio,
      location: newLocation,
      image: newImage,
      password: newPassword,
    };
    await fetch(`/api/riders/edit`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    setEdit(false);
    <Spinner />;
    alertService.success("Your information has been saved", options);
  }

  // var user object
  const name = user?.name || "Fetching name...";
  const contact = user?.phone || "081-2345-6789";
  const avatar = user?.image || "/profileAvi.png";
  const email = user?.email || "Fetching email...";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am just a placeholder for your bio";
  // yet to implement logic for the following
  const revenue = user?.revenue || "0";
  const rating = user?.rating || "4.9";
  const riderUser = true;

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "authenticated") {
    return (
      <>
        <main className="w-full flex min-h-full flex-col justify-center">
          <ProfileComponent
            bio={bio}
            name={name}
            email={email}
            avatar={avatar}
            contact={contact}
            address={address}
          />
          <div className="mt-10 mb-10 flex flex-col justify-center">
            <button
              onClick={() => handleToggleEdit()}
              className="text-green-500"
            >
              <u>Edit your profile information</u>
            </button>{" "}
            {/* ______EDIT PROFILE______ */}
            {edit && (
              <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <form action="/api/riders/edit" method="post">
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
                          onChange={(e) => setNewName(e.target.value)}
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
                          max-length="20"
                          required
                          placeholder="081-2345-6789"
                          onChange={(e) => setNewPhone(e.target.value)}
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
                        address
                      </label>
                      <div className="mt-2">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          autoComplete="address"
                          required
                          placeholder="Abuja, Nigeria"
                          onChange={(e) => setNewLocation(e.target.value)}
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
                          onChange={(e) => setNewBio(e.target.value)}
                          className="pl-2 text-field block w-full rounded-md border-0 py-12 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    {/* _______UPLOAD IMAGE_______ */}
                    <div>
                      <label
                        htmlFor="imageUpload"
                        className="mt-5 mb-2 block text-sm font-medium leading-6 text-white-900"
                      >
                        Upload your Image{" "}
                      </label>
                      <input
                        id="imageUpload"
                        className="block w-full focus:ring-2 focus:ring-inset"
                        type="file"
                        name="upload"
                        onChange={(e) => setNewImage(e.target.value)}
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
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium leading-6 text-white-900"
                        >
                          Current Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="current-password"
                          name="current-password"
                          type="password"
                          autoComplete="current-password"
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium leading-6 text-white-900"
                        >
                          New Password
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          autoComplete="new-password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="mt-10 text-center text-lg text-white-500">
                      <p>
                        Done editing?{"  "}
                        <button
                          type="submit"
                          onClick={() => handleSubmitEdit()}
                          disabled={formState.isSubmitting}
                          className="pl-2 font-semibold leading-6 text-green-600 hover:text-indigo-500"
                        >
                          {formState.isSubmitting && (
                            <span className="spinner-border spinner-border-sm me-1"></span>
                          )}{" "}
                          Save Changes
                        </button>
                      </p>
                    </div>
                  </form>
                  <hr />
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
          <div className="mt-10 text-center">
            <span
              className="font-bold leading-6 text-yellow-600"
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
