"use client";
import React, {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {getToken} from "next-auth/jwt";

export default function FlavouraHome() {
    const {data: session, status} = useSession();
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        console.log("we got a session:", session);
        if (session != null) {
            //@ts-ignore
            session.roles.forEach((role: string) => {
                if (role.toLowerCase() === "admin") {
                    setIsAdmin(true);
                }
            });
        }
    }, [session]);

    const logout = async () => {
        console.log("logout called");
        try {
            await fetch("/api/auth/logout", {method: "GET"});
        } catch (err) {
            console.error(err);
        }
    };

    const toCapitalise = (str: string | undefined | null) => {
        if (str == undefined) {//double equal to include null
            return "";
        }
        const firstLetter = str.substring(0, 1).toUpperCase();
        const rest = str.substring(1);
        return firstLetter + rest;
    };

    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        // <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
        <main className="grid items-center gap-4 p-24 place-self-center">
            ~ Welcome to flavoura {toCapitalise(session?.user?.name)} ~
            <span>
            {isAdmin && "You are logged in as an admin"}
            </span>

            <button onClick={(event) => {
                console.log("click");
                logout().then(() => signOut({callbackUrl: "/", redirect: true}));
            }}>Logout</button>
        </main>
    );
}
