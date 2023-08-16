import { formOptions } from "@/lib/utils/yupValidation";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const { formState, reset } = useForm(formOptions);
  const { errors } = formState;

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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign up for an account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="/api/auth/sign-up" className="space-y-6" method="post">
            {/* ________FIRST NAME________ */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-white-900"
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
            {/* ________LAST NAME________ */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-white-900"
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
            {/* _______USER NAME_______ */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  name="username"
                  autoComplete="username"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* ________EMAIL________ */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white-900"
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
            {/* ________PASSWORD________ */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white-900"
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
            {/* _____CONFIRM PASSWORD_____ */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* ________T & C________ */}
            <div className="block text-sm font-medium leading-6 text-white-900">
              <label htmlFor="acceptTerms" className="pr-5">
                Accept Terms & Conditions
              </label>
              <input
                id="acceptTerms"
                type="checkbox"
                name="acceptTerms"
                required
                className="mt-3"
              />
              <div className="invalid-feedback">
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
          <p className="mt-10 text-center text-sm text-white-500">
            Already Own an Account?{"  "}
            <a
              href="/auth/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Return to Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
