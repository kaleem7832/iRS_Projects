import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SP Projects Manager",
  description: "Projects management by iResearch Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800 text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
