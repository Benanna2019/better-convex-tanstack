import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
export const auth = betterAuth({
    //...your config
    plugins: [reactStartCookies()] // make sure this is the last plugin in the array
})