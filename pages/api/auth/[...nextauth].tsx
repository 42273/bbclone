import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { Response } from "../account/login";
import GoogleProvider from "next-auth/providers/google"
import Account from "../../../lib/model/account"

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    const isValid = await compare(password, hashedPassword);
    return isValid
}

export const option: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "E-Mail", type: "email", },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const response = await fetch(process.env.NEXTAUTH_URL + "api/account/login",
                        {
                            method: "post",
                            body: JSON.stringify(credentials),
                            headers: { "Content-type": "application/json" },
                        }
                    );
                    const rst: Response = await response.json();
                    if (rst.result) {
                        return {
                            ...rst.data
                        } as any;
                    } else {
                        return null;
                    }
                } catch (e: unknown) {
                    if(e instanceof Error)console.log(e.message);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    // secret: process.env.SECRET,
    // jwt: {
    // secret: process.env.SECRET,
    // },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.

    // https://next-auth.js.org/configuration/pages

    //기본 경로 페이지; 설정;
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === "credentials") return true;
            // return false
            if (account?.provider === "google") {
                const one = await Account.findOne({ email: profile?.email });
                if (!one) {
                    return `/popup/register?Login=${account.provider}&email=${user.email}&providerAccountId=${account.providerAccountId}`;
                } else if (!one.policy) {
                    return false
                } else {
                    return true;
                }
            }
            return false
        },
    }
}


export default NextAuth(option)