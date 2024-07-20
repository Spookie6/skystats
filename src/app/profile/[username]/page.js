require("dotenv").config();

import { redirect } from "next/navigation";
import { getData } from "@/app/Util/functions";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const data = await getData(`https://api.mojang.com/users/profiles/minecraft/${params.username}`)
    const profiles = await getData(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${data.id}`)
    if (!profiles.profiles?.length) return notFound()
    const selectedProfile = profiles.profiles.filter((profile) => profile.selected)[0]
    redirect(`/profile/${params.username}/${selectedProfile.cute_name}`)
}