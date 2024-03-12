import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../globals.css'
import Header from "./header/Header";
import CookieBanner from "./CookieBanner/CookieBanner";

const monoton = Montserrat({subsets: ['latin']});
export const metadata: Metadata = {
  title: "Home",
  description: "Shared Drive project",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en" data-theme="light">
        <head>
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAfZm8YP3fWLPMbQU8DCc0s_9TLeSwKjJE`}
            async
            defer
          ></script>  
        </head>
        <body className={monoton.className}>
          <Header />
          <CookieBanner />
          <main>
            {children}
          </main>
        </body>
      </html>
    </UserProvider>

  );
}
