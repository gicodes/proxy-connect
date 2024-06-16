import { useState, useRef } from "react";
import { useColorMode } from "@chakra-ui/react";
import Spinner from "@/components/templates/spinner";
import GoToSignIn from "@/components/templates/onauthRedirect";
import { alertService } from "@/components/alert/services";
import MyProfileCard from "@/components/pages/profile/myProfileCard";
import { getSession, signOut, useSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ridersRepo } from "./api/repo";
import ProfileForm from "@/components/pages/profile/profileForm";

type User = {
  bio: string;
  name: string;
  roll: string;
  email: string;
  image: string;
  address: string;
  orders: number;
  rating: number;
  revenue: number;
};

export const getServerSideProps: GetServerSideProps<{
  user: User;
}> = async ({ req }) => {
  const session = await getSession({ req });
  const data = await ridersRepo.getByEmail(session?.user.email);
  const user = JSON.parse(JSON.stringify(data));
  return { props: { user } };
};

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // states to store user data & instances
  const [options, setOptions] = useState({
    autoClose: false,
    keepAfterRouteChange: false,
  });
  const { toggleColorMode } = useColorMode();
  const [edit, setEdit] = useState<any>(false);
  const { data: session, status } = useSession();

  function handleToggleEdit() {
    setEdit(true);
  }

  function handleBackToTop() {
    (e: any) => e.preventDefault();
    setEdit(false);
  }

  function handleResetTheme() {
    alertService.warn(
      "Light mode is not supported yet",
      setOptions({ autoClose: true, keepAfterRouteChange: false })
    );
    return; // line break: handleResetTheme
    toggleColorMode();
  }

  // var user object as User Profile
  const orders = user?.orders || 0;
  const name = user?.name || "fetching name..";
  const contact = user?.roll || "081-2345-6789";
  const avatar = user?.image || "/profileAvi.png";
  const email = user?.email || "fetching email...";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am just a placeholder for your bio";
  // pending logic implementation
  const revenue = user?.revenue || 0;
  const rating = user?.rating || 0.5;
  const riderUser = true;

  if (status === "loading") return <Spinner />;
  if (status === "authenticated") {
    return (
      <>
        <main className="w-full flex min-h-full flex-col justify-center">
          <MyProfileCard
            orders={orders}
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
                  <ProfileForm />
                  <button
                    onClick={() => handleBackToTop()}
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
