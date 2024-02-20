"use client"
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./navbar";
import Footer from "./footer";
import ToggleBtn from "./components/toogleBtn";
import { Inter } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react"; // Adjust the import based on your actual file structure
import { Session } from 'next-auth'
const inter = Inter({ subsets: ["latin"] });

interface Props {
  session: Session | null
  children: React.ReactNode
}

 const RootLayout: React.FC<Props> = ({ children, session }) => {
  return (
    <html lang="en">
      <head>
        {/* Include any head tags or metadata here */}
      </head>
      <body className={inter.className}>
         {/* <SessionProvider session={session}> */}
            <Navbar />
            <ToggleBtn />
            {children}
            <Footer />
        {/* </SessionProvider > */}
      </body>
    </html>
  );
}
export default RootLayout;