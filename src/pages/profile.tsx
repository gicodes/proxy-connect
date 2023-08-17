import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdVerifiedUser } from "react-icons/md";
import Spinner from "@/components/templates/spinner";
import { formOptions } from "@/lib/utils/yupValidation";
import GoToSignIn from "@/components/templates/unAuthPage";
import { alertService } from "@/components/alert/services";
import { Button, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/rx";

/* 3+ pending functions to implement
  state variables: user, {image, names, bio and contact}.
  default form values: fetch user and set form values if in edit mode.
  function handleSubmit: send all updated information to rider/[id] API && spinner.
  and more... e.g getServerSideProps should be uncommented to secure users Profile routing.
*/

// Defining User
interface User {
  id: string;
  bio: string;
  name: string;
  email: string;
  avatar: string;
  subscribed: boolean;
  riderUser: boolean;
  revenue: number;
  contact: number;
  rating: number;
}

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
  const id = user?.id;
  const name = user?.name;
  const email = user?.email;
  const contact = user?.phone || "+123 456 7890";
  const avatar = user?.image || "/profileAvi.png";
  const location = user?.location || "Abuja FCT, Nigeria";
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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <VStack border={"1px solid gray"} className="rounded-md">
              <Card className="w-full">
                <Text className="m-2 text-center text-lg font-normal leading-9">
                  Hello... <span className="profile-name">{name}</span>
                </Text>
              </Card>
              <a href="#">
                <img
                  className="mt-2 mx-auto h-20 w-auto profile-image"
                  src={avatar}
                  alt="profile image"
                />
              </a>
              <div className="profile-verified mb-2">
                <MdVerifiedUser color="yellowgreen" size={"20"} />
              </div>
              <Card className="w-full">
                <Text className="m-1 text-center leading-9 profile-text">
                  {bio}
                </Text>
                <hr />
                <HStack className="m-3 flex-1 flex-col justify-center">
                  <RxDotFilled color="#707070" />
                  <Text className="profile-location">{location}</Text>
                </HStack>
                <Text className="mb-3 text-center font-bold">{contact}</Text>
              </Card>
            </VStack>
          </div>
          <div className="mt-10 flex flex-col justify-center">
            <Button onClick={() => handleToggleEdit()}>
              Edit your information
            </Button>
            {/* _________NAMES_________ */}
            {edit && (
              <>
                <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                  <form
                    action={`/api/riders/edit`}
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
