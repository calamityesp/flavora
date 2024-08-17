"use client";
import React, {useState} from "react";
import Image from "next/image";
import sushi from "../../sushi.jpg";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <main className="w-1/3 flex justify-center items-center flex-col gap-4">
            <Image
                className="rounded-[10%] hover:w-[525px] transition-[width,border-radius] hover:rounded-[10px]"
                src={sushi}
                alt="a picture of sushi"
                priority={true}
                width={300}
                // height={300}
            />
            <p className="text-center leading-10">
                This app lets you create, save, and share recipes with your friends, or not friends we don&apos;t care :] just be nice {"<3"}
            </p>
            <button
                className="border-4 border-slate-400 p-2 rounded-[4px] hover:bg-slate-400 hover:border-white hover:text-black"
                onClick={() => {
                    router.push("/flavoura")
                }}
            >
                Login / Signup
            </button>
        </main>
    );
}
