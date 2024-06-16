import { Button, VStack } from "@chakra-ui/react";
import DefaultWarnAlert from "../alert/errorAlert";

const GoToSignIn = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <DefaultWarnAlert
            header={"You must be signed in!"}
            body={`Sign in to continue viewing`}
          />
          <VStack mt={"10"}>
            <a
              href="/auth/sign-in"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6"
            >
              Go to sign in
            </a>
            <Button
              mt={"5"}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-bold leading-6"
            >
              <a href="/"> Back to Home Page</a>
            </Button>
          </VStack>
        </div>
      </div>
    </>
  );
};

export default GoToSignIn;
