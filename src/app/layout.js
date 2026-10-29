import { Lora } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Sakibur Rahman | Portfolio",
  description:
    "Portfolio of Sakibur Rahman — Full Stack Web Developer building modern, user-friendly web experiences.",
  openGraph: {
    title: "Sakibur Rahman | Portfolio",
    description:
      "Portfolio of Sakibur Rahman — Full Stack Web Developer building modern, user-friendly web experiences.",
    type: "website",
    siteName: "Sakibur Rahman — Portfolio",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-lora">
        <ThemeProvider>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
