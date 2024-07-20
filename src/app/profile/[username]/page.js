require("dotenv").config();

import { redirect } from "next/navigation";
import { getData } from "@/app/Util/functions";

export default async function Page({ params }) {
    const data = await getData(`https://api.mojang.com/users/profiles/minecraft/${params.username}`)
    const profiles = await getData(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${data.id}`)
    const selectedProfile = profiles.profiles.filter((profile) => profile.selected)[0]
    // console.log(selectedProfile)
    redirect(`/profile/${params.username}/${selectedProfile.cute_name}`)
}