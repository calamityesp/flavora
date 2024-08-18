import {Account, NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import KeycloakProvider from "next-auth/providers/keycloak";
import {jwtDecode} from "jwt-decode";
import {JWT} from "next-auth/jwt";
import {encrypt} from "@/utils/encryption";

export const options: NextAuthOptions = {
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            return true;
        },
        async redirect({url, baseUrl}) {
            console.log("redirect called", url, baseUrl);
            return `${baseUrl}/flavoura`;
            // return "https://jwt.ms";
        },
        async session({ session, token }: any) {
            // Send properties to the client
            console.log("SESSION TOKEN WAS:", token.id_token);
            session.access_token = encrypt(token.access_token); // see utils/sessionTokenAccessor.js
            session.id_token = encrypt(token.id_token);  // see utils/sessionTokenAccessor.js
            session.roles = token.decoded.realm_access.roles;
            session.error = token.error;
            return session;
        },
        //the type intersection is a bit hacky but i needed a quick fix and didn't want to do type augmentation for it
        async jwt({token, account}: {token: JWT & {expires_at: number}, account: Account} & any) {
            if (process.env.NODE_ENV === "development") {
                // console.log({token});
            }

            //todo: this did not work at all...
            const nowTimeStamp = Math.floor(Date.now() / 1000);
            if (account) {//todo: this was recommended by the video im watching
                token.decoded = jwtDecode(account.access_token as string);
                token.accessToken = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at; //|| 0;//setting a default of zero because it's safer to assume we are expired than allow an infinite token, might need to make sure that is the best default
                token.refresh_token = account.refresh_token;
                return token;
            } else if(nowTimeStamp < token.expires_at){
                return token;
            }
            console.warn("token has expired we should implement a refresh or whatever")
            return token;
        }
    },
    // pages:{
    //     signIn:"/api/auth/signin",
    //     error:"/api/auth/error"
    // },
    // secret:process.env.JWT_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text", placeholder: "username"},
                password: {label: "Password", type: "password", placeholder: "password"}
            },
            async authorize(credentials) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })

                //mocking what the user would enter into the form
                const user = {
                    id: "1",
                    username: "randi",
                    password: "password"
                };

                if (credentials?.username === user.username && credentials?.password === user.password) {
                    console.log("user success");
                    return user as User;
                }

                // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user;
                // }
                // Return null if user data could not be retrieved
                return null;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_ID || "",
            clientSecret: process.env.KEYCLOAK_SECRET || "",
            issuer: process.env.AUTH_ISSUER
        })
    ]
};