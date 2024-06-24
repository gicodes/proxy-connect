import { formOptions } from "@/lib/utils/yupValidation";
import { Card } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const { formState, reset } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
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
            Sign up for an account
          </h2>
        </Card>
        <Card className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm px-6 py-6">
          <form action="/api/auth/sign-up" className="space-y-6" method="post">
            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-6 text-gray"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="firstName"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-6 text-gray"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="lastName"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium leading-6 text-gray"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-6 text-gray"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium leading-6 text-gray"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="block text-sm leading-6 text-white-900 mt-2">
              <label htmlFor="acceptTerms" className="font-semibold pr-2">
                Accept Terms & Conditions
              </label>
              <input
                id="acceptTerms"
                type="checkbox"
                name="acceptTerms"
                required
              />
              <div className="text-error">
                {errors.acceptTerms?.message}
              </div>
            </div>
            <div className="buttons-group">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}{" "}
                Sign Up
              </button>
              <br />
              <button
                onClick={() => reset()}
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Form
              </button>
            </div>
          </form>
          <p className="my-6 mx-auto text-sm">
            Already Own an Account?{"  "}
            <a
              href="/auth/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Return to Login
            </a>
          </p>
        </Card>
      </div>
    </>
  );
}

export default SignUpPage;