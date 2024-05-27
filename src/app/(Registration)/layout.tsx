import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../globals.css'
import { UserProvider } from "@/context/UserContext";
const monoton = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Auth",
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
          <main>
            {children}
          </main>
        </body>
      </html>
    </UserProvider>
      

  );
}
