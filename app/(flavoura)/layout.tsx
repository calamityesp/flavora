import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

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
        <SessionProviderWrapper>
            <html lang="en" className="flavouraLayout border-4 border-green-600">
            <body className={inter.className}>{children}</body>
            </html>
        </SessionProviderWrapper>
    );
}
