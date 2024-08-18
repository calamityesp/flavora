import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Flavoura",
    description: "The best flavoura you've ever had-a",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <html lang="en">
            <body className={inter.className + " w-full h-dvh flex justify-center items-center"}>
            {children}
            </body>
            </html>
        </SessionProvider>
    );
}
