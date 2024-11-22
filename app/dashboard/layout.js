import Header from "@/components/header";
import NewHeader from "@/components/HeaderNew";

import Footer from "@/components/Footer";

export const metadata = {
  title: "SP Projects",
  description: "Projects management by iResearch Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <NewHeader />
        <div className="container mx-auto min-h-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
