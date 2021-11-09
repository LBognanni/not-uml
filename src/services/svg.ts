import { convert } from "./converter";
import { extractElements } from "./parser";
import { ElementType, SvgItem } from "./parsertypes";

function itemToSvg(item: SvgItem): string {
    return `<text class="${item.type === ElementType.View ? "view" : "action" }" dominant-baseline="hanging" x="${item.x}" y="${item.y}" font-size="10">${item.text}</text>`;
}

function horizontalLine(x: number, y: number, width: number, dash: boolean) {
    return `<path d="m${x} ${y} h${width}" stroke="#000"${dash ? ' stroke-dasharray="5,5"' : ""} stroke-width="2" fill="none"/>`;
}

function arrow(x1: number, y1: number, x2: number, y2: number){
    return `<path d="m${x1} ${y1} l${x2-x1} ${y2-y1}" stroke="#000" stroke-width="2" fill="none" marker-end="url(#arrowhead)" />`;
}

function groupToSvg(items: SvgItem[]): string[] {
    const childItemGroups = [];
    let lines = [];
    let previousType : ElementType = ElementType.Root;
    const lineWidth = items.reduce((prev, x)=>Math.max(prev, x.width), 0);

    if (items.length) {
        lines.push("<g>");

        for (const item of items) {

            switch (previousType) {
                case ElementType.View:
                    lines.push(
                        horizontalLine(
                            item.x,
                            item.y - 10,
                            lineWidth,
                            false
                        ),
                    );
                    break;
                case ElementType.Action:
                    lines.push(
                        horizontalLine(
                            item.x,
                            item.y - 10,
                            lineWidth,
                            true
                        ),
                    );
                    break;
            }

            lines.push(itemToSvg(item));
            previousType = item.type;

            if (item.next) {
                var nextView =item.next.find(x=>x.type === ElementType.View);
                if(nextView)
                {
                    lines.push(arrow(item.x + lineWidth + 10, item.y + 10, nextView.x - 10, nextView.y + 10));
                }
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
    const elements = extractElements(text);
    const {items, box} = convert(elements);
    const resultText = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box.left} ${box.top} ${box.right - box.left} ${box.bottom - box.top}">
<style>
text { 
    font: 10pt monospace;
}
.view {
    font-weight: bold;
}
</style>
<defs>
<marker id="arrowhead" markerWidth="10" markerHeight="7" 
refX="9" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" />
</marker>
</defs>
${itemsToSvg(items)}
</svg>`;

    return { svg: resultText, box: box}
}

export { convertToSvg, itemsToSvg };
