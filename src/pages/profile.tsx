import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { businessRepo } from "../lib/api/mongodb/repo";
import { UserProps } from "@/components/app-routes/profile/userProps";
import ProtectedRoute from "@/components/app-routes/protectedRoute";
import ProfileCard from "@/components/app-routes/profile/profile-card";

const Profile = (
  { user }: { user: UserProps | null }
) => {
  return (
    <>
      <ProtectedRoute>
        <main className="w-full flex min-h-full flex-col justify-center">
          <ProfileCard
            address={user?.address || "Nigeria"}
            age={user?.age}
            avatar={user?.avatar || "/profileAvi.png"}
            bio={user?.bio || "update your bio"}
            company={user?.company || "Ryder-GP"}
            email={user?.email}
            name={user?.name}
            orders={user?.orders}
            phone={user?.phone}
            rating={user?.rating || 1}
            revenue={user?.revenue || 1}
            socketId={undefined} 
            userType={user?.userType || "Demo"}          
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
