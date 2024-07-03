import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Card } from "@chakra-ui/react";
import UserB from "@/components/routes/auth/userB";
import type { InferGetServerSidePropsType } from "next";
import AuthAlert from "../../components/routes/auth/authAlert";
import { ClientSafeProvider, getProviders, signIn, useSession } from "next-auth/react";

const SignInPage = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [userB, setUserB] = useState(false);
  const [password, setPassword] = useState("");

  const handleBusinessAcc = () => {
    setUserB(true)
  }
  const handleIndividualAcc = () => {
    setUserB(false)
  }

  const handleSignIn = (provider: ClientSafeProvider)=> {
    if (session) {
      alert("You are signed in already!");
      router.push("/profile")
      return;
    } else {
      signIn(provider.name, {callbackUrl: '/'})
      alert(`You are being redirected to ${provider.name}'s origin for secure sign-in!`)
    }  
  }

  return (
    <div className="flex-col px-6 py-12 lg:px-8">
      <Card className="sm:mx-auto sm:w-full sm:max-w-sm pb-6">
        <a href="#">
          <img
            className="mx-auto h-20 w-auto"
            src="/Ryder-GP/android-chrome-512x512.png"
            alt="rydergp.badge"
          />
          <hr className="w-50 mx-auto mb-4"/>
        </a>
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          Sign in to Proxyconnect
        </h2>
      </Card>
      <Card className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-6">
        <form className="space-y-6">
          <p className="py-3">Select Account Type</p>
          <div className="flex flex-1">
            <div 
              id="userA" 
              className="w-100 p-3" 
              onClick={handleIndividualAcc}
            >
              <Button variant={userB ? `outline` : `solid`}>Individual</Button>
            </div>
            <div
              id="userB" 
              className="w-100 p-3" 
              onClick={handleBusinessAcc}
            >
              <Button variant={userB ? `solid` : `outline`}>Business</Button>
            </div>
          </div>
          { userB && 
            <UserB 
              email={email} 
              setEmail={setEmail} 
              password={password} 
              setPassword={setPassword}
            />
          }
          <div>
          { !userB &&
            <>
              { Object.values(providers).map((provider) => (
                <div key={provider.id}>
                  <button
                    type="submit"
                    onClick={() => handleSignIn(provider)}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5"
                  >
                    Sign in with {provider.id}
                  </button>
                  <hr />
                </div>
              ))}
              <AuthAlert />
            </>
            }
          </div>
        </form>
        <p className="mt-5 mb-10 text-center text-sm text-white-500">
          Not a member?{" "}
          <a
            href="/auth/sign-up"
            className="pl-2 font-semibold leading-6 text-warning hover:text-indigo-500"
          >
            Go to Sign up
          </a>
        </p>
      </Card>
    </div>
  );
};

export default SignInPage;


export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}