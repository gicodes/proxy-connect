import "@/app/components/error.css";
import { useForm } from "react-hook-form";
import { formOptions, onSubmit } from "@/lib/utils/yupValidation";

export default function SignUpPage() {
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="" alt="Tsaron.gps.logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            method="POST"
          >
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
                  type="text"
                  {...register("firstName")}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  type="text"
                  {...register("lastName")}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="block text-sm font-medium leading-6 text-white-900">
              <label htmlFor="acceptTerms" className="pr-5">
                Accept Terms & Conditions
              </label>
              <input
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
                className={`mt-3 ${errors.acceptTerms ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </div>

            <div>
              <button
                // Disabled onClick event. Auth requires ClientId set up
                // onClick={handleSubmit(onSubmit)}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}{" "}
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white-500">
            Already Own an Account?{"  "}
            <a
              href="/auth"
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
