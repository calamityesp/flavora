import { getServerSession } from "next-auth";
// import { authOptions } from "../app/api/auth/[...nextauth]/route";
import {options} from "@/app/api/auth/[...nextauth]/options";
import { decrypt } from "./encryption";

export async function getAccessToken() {

    const session = await getServerSession(options);
    console.log("SESSION WAS:", session);
    if(session){
        // @ts-ignore
        const accessTokenDecrypted = decrypt(session.access_token)
        return accessTokenDecrypted;
    }
    return null;
}

export async function getIdToken() {

    const session = await getServerSession(options);
    console.log("SESSION WAS:", session);

    if(session){
        // @ts-ignore
        const idTokenDecrypted = decrypt(session.id_token)
        return idTokenDecrypted;
    }
    return null;
}