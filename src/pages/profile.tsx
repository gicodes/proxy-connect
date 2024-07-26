import { businessRepo } from "./api/repo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { User } from "@/components/routes/profile/userType";
import ProtectedRoute from "@/components/routes/protectedRoute";
import ProfileCard from "@/components/routes/profile/profile-card";

const Profile = (
  { user }: { user: User | null }
) => {
  const orders = user?.orders || [];
  const name = user?.name || "Gi codes";
  const phone = user?.phone || '0812-345-6789';
  const avatar = user?.image || "/profileAvi.png";
  const email = user?.email || "reply@gicodes.dev";
  const address = user?.address || "Abuja, Nigeria";
  const bio = user?.bio || "I am only a placeholder for your bio";

  // pending logic implementation
  const rating = user?.rating || 1;
  const role = user?.role || "Admin";
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
            image={image}
            name={name}
            orders={orders}
            phone={phone}
            rating={rating}
            revenue={revenue}
            role={role}
          />
        </main>
      </ProtectedRoute>
    </>
  );
}

export default Profile;


export const getServerSideProps: GetServerSideProps<{
  user: User | null;
}> = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return { props: { user: null }};
  }

  const data = await businessRepo.getByEmail(session?.user?.email);
  const user = JSON.parse(JSON.stringify(data)) || session?.user;

  return { props: { user }}
};
