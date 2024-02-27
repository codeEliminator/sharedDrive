import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import '../globals.css'
const monoton = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
  title: "Registration",
  description: "Shared Drive project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" data-theme="light">
        <body className={monoton.className}>
          <main>
            {children}
          </main>
        </body>
      </html>

  );
}
