require("dotenv").config();

import { getData } from "@/app/Util/functions";
import { getNetworth } from "skyhelper-networth";
import * as NBT from "prismarine-nbt";
import { mcCodeParse } from "@/app/Util/mc-codes";

function capitalise(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function parseInventory(inventory) {
    let res = [];
    inventory.forEach((element, index) => {
        if (Object.keys(element).length !== 0) {
            res.push(`${mcCodeParse(element.tag.display.Name)}`);
        }
    }); // Constructs HTML string of player items in inventory
    return res;
}

export default async function Page({ params }) {
    // Gets mc player data
    const data = await getData(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    // Gets profiles
    const profiles = await getData(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.HYPIXEL_API_KEY}&uuid=${data.id}`);
    // Gets currently selected profile
    const selectedProfile = profiles.profiles.filter((profile) => profile.selected)[0];
    // Gets museum data
    const museumData = await getData(`https://api.hypixel.net/v2/skyblock/museum?key=${process.env.HYPIXEL_API_KEY}&profile=${selectedProfile.profile_id}`);

    // Gets player specific profile data (i.e. player specific data in co-op)
    const profileData = selectedProfile.members[data.id];
    const bankBalance = selectedProfile.banking?.balance;

    // Calculates player networth
    const networth = await getNetworth(profileData, bankBalance, { v2Endpoint: true, museumData });
    // Prettifies networth
    const niceNetworth = Math.round(networth.networth).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    async function getItemList(key) {
        const parsed = NBT.simplify((await NBT.parse(Buffer.from(profileData.inventory[key].data, "base64"))).parsed).i;
        return `<ul><li>${parseInventory(parsed).join("</li><li>")}</li></ul>`; // Converts the inventory to a list of item names
    }

    // console.log(Object.keys(profileData));
    console.log(profileData.leveling);

    const invs = [
        "inv_contents", // Inventory
        "ender_chest_contents", // Ender Chest contents
        // "backpack_icons", // 0: {data}, 1: {data}, etc
        // "bag_contents", // {talisman_bag, fishing_bag etc}
        "inv_armor", // Armor in inv
        "equipment_contents", // Equipment
        "personal_vault_contents", // Personal Vault
        // "wardrobe_equipped_slot", // Slot number i.e. 1
        // "backpack_contents", 0: {data}, 1: {data}, etc
        // "sacks_counts", // BONE : 0, ENDER_PEARL: 10, etc
        "wardrobe_contents" // Wardrobe contents
    ]

    let inventory_contents = "";
    for (let i = 0, len = invs.length; i < len; i++) {
        let key = invs[i];
        inventory_contents += `<h1>${key}</h1> <div>${await getItemList(key)}</div>`;
    }

    // Using dangerouslySetInnerHTML could lead to XSS / injection vunerabilities if somehow the name field of an item is editable
    // Look into sanitising before usage (i.e DOMSanitiser etc)

    return (
        <div id="profile-data">
            <h1> {params.username} on {selectedProfile.cute_name} </h1>
            <h1>Networth</h1> <div> {niceNetworth} Coins </div>
            <h1>Accesories</h1> <div>
                Selected Power: {capitalise(profileData.accessory_bag_storage.selected_power)} <br/>
                Highest Magical Power: {profileData.accessory_bag_storage.highest_magical_power} <br/>
            </div>
            <h1>Level</h1> <div>
                Level: {Math.floor(profileData.leveling.experience / 100)} <br/>
                Progress: {profileData.leveling.experience % 100} / 100 <br/>
            </div>
            <div dangerouslySetInnerHTML = {{__html: inventory_contents}}></div>
        </div>
    );
}
