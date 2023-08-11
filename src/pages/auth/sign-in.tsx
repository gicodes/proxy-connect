import { signIn, getProviders } from "next-auth/react";
import type { InferGetServerSidePropsType } from "next";

/*
  1 pending implementation: forgot password protocol  
*/

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
}

export default function AuthPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="#">
            <img
              className="mx-auto h-20 w-auto"
              src="/Ryder-GP/android-chrome-512x512.png"
              alt="rydergp.badge"
            />
          </a>
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="/api/auth/sign-in" // not required
            className="space-y-6"
            method="POST"
          >
            {/* ________USERNAME________ */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="string"
                  autoComplete="username"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* ________PASSWORD________ */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                  <button
                    // the following code is not in use... may cause conflict. See [...nextauth].ts > authOptions > providers > authorize
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   signIn(provider.id);
                    // }}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              ))}
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-white-500">
            Not a member?{"  "}
            <a
              href="/auth/sign-up"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start registration process
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
