"use client"
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function Header() {
    const pathName = usePathname();

    useEffect(() => {
        console.log("pathname",pathName.substring(1));

    },[]);

    const selectedStyles = "border-amber-50 border-2 rounded-full p-2";

    return (
        // <main className="flex min-h-screen flex-col items-center justify-between p-24">
        // <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
        <header className="min-w-full h-[50px] border-green-600 border-4 grid place-items-center absolute top-0 left-0">
            <nav className="grid place-items-center gap-4 grid-flow-col">
                <Link className={pathName === "/" ? selectedStyles : ""} href={"/"}>Home</Link>
                <Link className={pathName === "/flavoura" ? selectedStyles : ""} href={"/flavoura"}>Flavoura</Link>
                <Link className={pathName === "/anotherSimimilarRoute" ? selectedStyles : ""} href={"/anotherSimilarRoute"}>Another Similar Page</Link>
                <Link className={pathName === "/likeHome" ? selectedStyles : ""} href={"/likeHome"}>Like Home</Link>
            </nav>
        </header>
    );
}
