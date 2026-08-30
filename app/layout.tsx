import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "anaktumbuh.id",
  description: "Sistem Pemantauan 7 Kebiasaan Anak Indonesia Hebat",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
