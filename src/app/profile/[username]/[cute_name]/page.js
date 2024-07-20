require("dotenv").config()

import { getData } from "@/app/Util/functions"
import { getNetworth } from "skyhelper-networth"

export default async function Page({ params }) {
    const data = await getData(`https://api.mojang.com/users/profiles/minecraft/${params.username}`)
    const profiles = await getData(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${data.id}`)
    const selectedProfile = profiles.profiles.filter((profile) => profile.selected)[0]
    const museumData = await getData(`https://api.hypixel.net/v2/skyblock/museum?key=${process.env.HYPIXEL_API_KEY}&profile=${selectedProfile.profile_id}`)
    console.log(museumData)
    return (
        <div>My Post: {params.username} {params.cute_name} <br></br> {selectedProfile.cute_name} </div>
    )
}