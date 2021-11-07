import { ElementType, SvgItem } from "./parsertypes"

function itemToSvg(item: SvgItem): string {
    return `<text x="${item.x}" y="${item.y}" font-size="10">${item.text}</text>`
}

function horizontalLine(x: number, y: number, width: number) {
    return `<path d="m0 12.5 h${("hello".length * 10)}" stroke="#000" stroke-width="2" fill="none"/>`;
}

function groupToSvg(items: SvgItem[]): string[] {
    const childItemGroups = [];
    let lines = [];

    if(items.length) {
        lines.push("<g>");

        for(const item of items){
            
            lines.push(itemToSvg(item));

            switch(item.type) {
                case ElementType.View: 
                    lines.push(horizontalLine(item.x, item.y + item.height - 2.5, item.width));
                break;
            }

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