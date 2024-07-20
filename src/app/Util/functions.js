import { mcCodeParse } from "@/app/Util/mc-codes";

export async function getData(uri) {
    const res = await fetch(uri)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseInventory(inventory) {
    let res = [];
    inventory.forEach((element, index) => {
        if (Object.keys(element).length !== 0) {
            res.push(`${mcCodeParse(element.tag.display.Name)}`);
        }
    }); // Constructs HTML string of player items in inventory
    return res;
}