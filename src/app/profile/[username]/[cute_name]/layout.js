import Image from "next/image";
import SVGIMG from "../../../../../public/SkyStats.svg"
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "Skystats",
    description: "Stats website for hypixels skyblock",
};

export default function RootLayout({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}
