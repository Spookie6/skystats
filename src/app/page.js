"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <main>
      <Input
        onChange={(event) => setInputValue(event.target.value)}
        type="text" label="Username" />
      <Button
        onClick={() => console.log(inputValue)}
      >Show Stats</Button>
    </main >
  );
}
