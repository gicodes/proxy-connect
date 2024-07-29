import { businessRepo } from "../lib/api/mongodb/repo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { UserProps } from "@/components/app-routes/profile/userProps";
import ProtectedRoute from "@/components/app-routes/protectedRoute";
import ProfileCard from "@/components/app-routes/profile/profile-card";

const Profile = (
  { user }: { user: UserProps | null }
) => {
  const orders = user?.orders || [];
  const name = user?.name || "Gi codes";
  const phone = user?.phone || '0812-345-6789';
  const avatar = user?.avatar || "/profileAvi.png";
  const email = user?.email || "reply@gicodes.dev";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am only a placeholder for your bio";

  // pending logic implementation
  const rating = user?.rating || 1;
  const role = user?.userType || "Admin";
  const revenue = user?.revenue || 0;

  let image;

  return (
    <>
      <ProtectedRoute>
        <main className="w-full flex min-h-full flex-col justify-center">
          <ProfileCard
            address={address}
            avatar={avatar}
            bio={bio}
            email={email}
            name={name}
            orders={orders}
            phone={phone}
            rating={rating}
            revenue={revenue}
            userType={role}
            id={undefined} 
            socketId={undefined}          
            />
        </main>
      </ProtectedRoute>
    </>
  );
}

export default Profile;


export const getServerSideProps: GetServerSideProps<{
  user: UserProps | null;
}> = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return { props: { user: null }};
  }

  const data = await businessRepo.getByEmail(session?.user?.email);
  const user = JSON.parse(JSON.stringify(data)) || session?.user;

  return { props: { user }}
};
