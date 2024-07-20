// Adapted from https://jsfiddle.net/fku9gsax/12/

// // Insert method
// String.prototype.insert = function (index, string) {
//     if (index > 0) {
//         return this.substring(0, index) + string + this.substring(index, this.length);
//     }

//     return string + this;
// };

const styleMap = {
    '§0': 'color:#000000',
    '§1': 'color:#0000AA',
    '§2': 'color:#00AA00',
    '§3': 'color:#00AAAA',
    '§4': 'color:#AA0000',
    '§5': 'color:#AA00AA',
    '§6': 'color:#FFAA00',
    '§7': 'color:#AAAAAA',
    '§8': 'color:#555555',
    '§9': 'color:#5555FF',
    '§a': 'color:#55FF55',
    '§b': 'color:#55FFFF',
    '§c': 'color:#FF5555',
    '§d': 'color:#FF55FF',
    '§e': 'color:#FFFF55',
    '§f': 'color:#FFFFFF',
    '§l': 'font-weight:bold',
    '§m': 'text-decoration:line-through',
    '§n': 'text-decoration:underline',
    '§o': 'font-style:italic',
};

function parseStyle(string) {
    const codes = string.match(/§.{1}/g) || [];
    for (let i = 0, len = codes.length; i < len; i++) {
        if (i === 0) {
            string = string.replace(codes[i], `<span style="${styleMap[codes[i]]}">`);
        } else {
            string = string.replace(codes[i], `</span><span style="${styleMap[codes[i]]}">`);
        }
    }

    if (codes.length !== 0) string += "</span>";

    return string
}

export function mcCodeParse(input) {
    return parseStyle(input);
}