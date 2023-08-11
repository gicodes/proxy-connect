import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { MdVerifiedUser } from "react-icons/md";
import { Badge, Text, VStack } from "@chakra-ui/react";

/* 3+ pending functions to implement
  state variables: user, {image, names, bio and contact}.
  default form values: fetch user and set form values if in edit mode.
  function handleSubmit: send all updated information to rider/[id] API && spinner.
  and more... e.g getServerSideProps should be uncommented to secure users Profile routing.
*/

interface User {
  username: string;
  email: string;
  image: string;
  name: string;
  bio: string;
  subscribed: boolean;
  riderUser: boolean;
  revenue: number;
  contact: number;
  rating: number;
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });
//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }
//   return {
//     redirect: {
//       permanent: false,
//       destination: `/${session.user?.email}`,
//     },
//   };
// };

export default function Profile() {
  const router = useRouter();

  // state variables to store user info
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const id = user?.id;
  const userName = user?.name || "Chizoba Sani Olawale";
  const avatar = user?.image || "/profileAvi.png";
  const bio = user?.bio || "I am just a placeholder for the bio";
  const contact = user?.balance || "+123 456 7890";
  const revenue = user?.revenue || "1000";
  const rating = user?.rating || "4.9";

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch user and set default form values if in edit mode
  }, [router]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-1 mb-7 text-center text-2xl font-normal leading-9 tracking-tight text-white-900">
            Hello,{" "}
            <span
              style={{
                color: "green",
              }}
            >
              {userName}
            </span>
          </h1>
          <a href="#">
            <img
              className="mx-auto h-20 w-auto"
              src={avatar}
              alt="profile image"
            />
          </a>
          <VStack>
            <Text className="mt-5 mb-1 text-center leading-9 profile-text  text-white-900">
              {bio}
            </Text>
            <Text className="mt-1 mb-2 text-center font-normal text-white-900">
              {contact}
            </Text>
            <div className="mt-1 mb-3">
              <MdVerifiedUser color="yellowgreen" size={"40"} />
            </div>
          </VStack>
          <hr />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action={`/api/riders/[${id}]`}
            className="space-y-6"
            method="POST"
          >
            <h1 className="mt-1 mb-7 text-center text-2xl text-silver-900">
              Edit your profile information
            </h1>
            {/* NAMES */}
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
                  type="string"
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
                  type="string"
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
                  type="string"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-12 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* _______UPLOAD IMAGE_______ */}
            <div>
              <label className="mb-2 block text-sm font-medium leading-6 text-white-900">
                Upload your Image{" "}
              </label>
              <input type="file" name="upload" />
            </div>
            <hr />
            {/* ________PASSWORD________ */}
            <h2 className="block text-lg text-center text-2xl font-bold leading-6 text-white-900">
              {" "}
              Change Password{" "}
            </h2>
            <h3 className="mt-1 mb-5 text-yellow-100">
              Leave blank if you do not wish to change your current password!
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
              // href={`/riders/[${id}]/edit`}
              href="#"
              className="pl-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Save Changes
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
