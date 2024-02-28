import { UserProvider } from "@/context/UserContext";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../globals.css'
import Header from "./header/Header";
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
        <body className={monoton.className}>
          <Header />
          <main>
            {children}
          </main>
        </body>
      </html>
    </UserProvider>

  );
}
