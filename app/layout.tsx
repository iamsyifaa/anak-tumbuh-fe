import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import PwaRuntime from "@/components/features/pwa/PwaRuntime";

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
        <ReduxProvider>
          <PwaRuntime />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
