import Image from "next/image";
import SVGIMG from "../../public/SkyStats.svg"
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Skystats",
  description: "Stats website for hypixels skyblock",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <header>
            <Image className="header_logo"
              src={SVGIMG}
              alt="Skystats header logo"
            />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
