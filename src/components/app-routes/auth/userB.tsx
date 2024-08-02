import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { UserAuthProps } from "./userAuthProps";
  
const UserB: React.FC<UserAuthProps> = ({
    email,
    setEmail,
    password,
    setPassword
    }) => {
    return (
        <>
            <div>
                <label
                    htmlFor="username"
                    className="text-sm font-medium leading-6 text-gray"
                >
                    E-mail
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset
                        placeholder:text-white-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    <div className="text-sm">
                        <a href="#" className="text-info hover:text-indigo-500">
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-white-900 
                        shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset
                        placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="py-6">
                    <Button 
                        w={"100%"} 
                        type="submit" 
                        onClick={() => signIn()}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UserB