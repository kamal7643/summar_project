import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ParentProvider from "./ParentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Alpha second",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
            <script src="https://accounts.google.com/gsi/client" async></script>
            </head>
            <body className={inter.className}>
                <ParentProvider>
                    <div className="min-h-screen bg-gray-300">
                        <Header />
                        {children}
                    </div>
                </ParentProvider>

            </body>
        </html>
    );
}
