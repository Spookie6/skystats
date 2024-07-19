require("dotenv").config()

import { getData } from "@/app/Util/functions"

export default async function Page({ params }) {
    const data = await getData(`https://api.mojang.com/users/profiles/minecraft/${params.username}`)
    const sbData = await getData(`https://api.hypixel.net/v2/player?key=${process.env.HYPIXEL_API_KEY}&uuid=${data.id}`)
    const guild = await getData(`https://api.hypixel.net/v2/guild?key=${process.env.HYPIXEL_API_KEY}&player=${data.id}`)
    const first_date = new Date(sbData.player.firstLogin).toDateString()
    const last_date = new Date(sbData.player.lastLogin)

    return (
        <div>My Post: {params.username} {params.profile} <br></br> {first_date} <br></br> {last_date.toDateString()} - {last_date.getHours()}:{last_date.getMinutes()}:{last_date.getSeconds()} <br></br> {guild.guild.name} </div>
    )
}