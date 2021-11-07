import { SvgItem } from "./parsertypes"

function itemToSvg(item: SvgItem): string {
    return `<text x="${item.x}" y="${item.y}" font-size="10">${item.text}</text>`
}

function groupToSvg(items: SvgItem[]): string[] {
    const childItemGroups = [];
    let lines = [];

    if(items.length) {
        lines.push("<g>");
        for(const item of items){
            lines.push(itemToSvg(item));
            if(item.next) {
                childItemGroups.push(item.next);
            }
        }
        lines.push("</g>");

        for(const childGroup of childItemGroups){
            lines.push(... groupToSvg(childGroup))
        }
    }
    return lines;
}

function itemsToSvg(items: SvgItem[]): string {
    let arr = groupToSvg(items);
    return arr.join("\n");
}

function convertToSvg(text:string) {
    return `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`
}

export { convertToSvg, itemsToSvg }