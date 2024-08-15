import Header from "@/components/header";

export const metadata = {
  title: "SP Projects Manager",
  description: "Projects management by iResearch Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="container mx-auto">{children}</div>
      </body>
    </html>
  );
}
