import Image from "next/image";
import SVGIMG from "../../public/SkyStats.svg"
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { MoonIcon } from "../../public/MoonIcon";
import { SunIcon } from "../../public/SunIcon";
import { Switch } from "@nextui-org/react";

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
            <a href="/">
              <Image className="header_logo"
                src={SVGIMG}
                alt="Skystats header logo"
              />
            </a>
            <Switch className="dark_mode_switch"
              size="lg"
              color="success"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
            />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
