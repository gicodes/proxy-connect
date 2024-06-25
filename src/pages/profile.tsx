import { useState } from "react";
import { ridersRepo } from "./api/repo";
import { GetServerSideProps } from "next";
import Spinner from "@/components/templates/spinner";
import { getSession, useSession } from "next-auth/react";
import { User } from "@/components/pages/profile/userType";
import GoToSignIn from "@/components/templates/onauthRedirect";
import ProfileCard from "@/components/pages/profile/profile-card";

// export const getServerSideProps: GetServerSideProps<{
//   user: User;
// }> = async ({ req }) => {
//   const session = await getSession({ req });
//   const data = await ridersRepo.getByEmail(session?.user?.email);
//   const user = JSON.parse(JSON.stringify(data));

//   return { 
//     props: { user }
//   }
// };

const Profile = ({
  user,
}: any) => {
  const { data: session, status } = useSession();


  const orders = user?.orders || 0;
  const name = user?.name || "Gi codes";
  const phone = user?.phone || "081-2345-6789";
  const avatar = user?.image || "/profileAvi.png";
  const email = user?.email || "reply@gicodes.dev";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am only a placeholder for your bio";

  // pending logic implementation
  const role = user?.role || "User";
  const revenue = user?.revenue || 0;
  const rating = user?.rating || 1;
  let image;

  if (status === "loading") return <Spinner />;
  if (status !== "authenticated") {
    return (
      <>
        <main className="w-full flex min-h-full flex-col justify-center">
          <ProfileCard
            address={address}
            avatar={avatar}
            bio={bio}
            email={email}
            image={image}
            name={name}
            orders={orders}
            phone={phone}
            rating={rating}
            revenue={revenue}
            role={role}
          />
        </main>
      </>
    );
  }

  return <GoToSignIn />;
}

export default Profile;