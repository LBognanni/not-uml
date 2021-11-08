import { ElementType, SvgItem } from "./parsertypes";

function itemToSvg(item: SvgItem): string {
    return `<text dominant-baseline="hanging" x="${item.x}" y="${item.y}" font-size="10">${item.text}</text>`;
}

function horizontalLine(x: number, y: number, width: number, dash: boolean) {
    return `<path d="m0 12.5 h${width}" stroke="#000"${dash ? ' stroke-dasharray="12,12"' : ""} stroke-width="2" fill="none"/>`;
}

function groupToSvg(items: SvgItem[]): string[] {
    const childItemGroups = [];
    let lines = [];
    let previousType : ElementType = ElementType.Root;

    if (items.length) {
        lines.push("<g>");

        for (const item of items) {

            switch (previousType) {
                case ElementType.View:
                    lines.push(
                        horizontalLine(
                            item.x,
                            item.y + item.height - 2.5,
                            item.width,
                            false
                        ),
                    );
                    break;
                case ElementType.Action:
                    lines.push(
                        horizontalLine(
                            item.x,
                            item.y + item.height - 2.5,
                            item.width,
                            true
                        ),
                    );
                    break;
            }

            lines.push(itemToSvg(item));
            previousType = item.type;

            if (item.next) {
                childItemGroups.push(item.next);
            }
        }

        lines.push("</g>");

        for (const childGroup of childItemGroups) {
            lines.push(...groupToSvg(childGroup));
        }
    }
    return lines;
}

function itemsToSvg(items: SvgItem[]): string {
    let arr = groupToSvg(items);
    return arr.join("\n");
}

function convertToSvg(text: string) {
    return `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`;
}

export { convertToSvg, itemsToSvg };
