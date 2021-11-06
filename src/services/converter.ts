import { chdir } from "process";
import {ElementType, Element, SvgItem, Size, BoundingBox} from "./parsertypes";

const vspacing = 50;
const hspacing = 100;

function measureString(text:string): Size
{
    const char_width = 10;
    const line_height = 15

    return {
        width: char_width * text.length,
        height: line_height
    };
}

function moveItems(items: SvgItem[], dx: number, dy: number)
{
    for(const item of items){
        item.x += dx;
        item.y += dy;
        moveItems(item.next, dx, dy);
    }
}

function MeasureItems(items: SvgItem[]): BoundingBox
{
    let box: BoundingBox = {
        left:    9999999,
        top:     9999999,
        width:  0,
        height: 0
    };
    let directChildren = [];

    var prevBottom = items[0]?.y ?? 0;
    for(const item of items)
    {
        box.left = Math.min(box.left, item.x);
        box.top = Math.min(box.top, item.y);
        box.width = Math.max(box.width, item.width);
        box.height += item.height + (item.y - prevBottom);
        prevBottom = item.y + item.height;

        if(item.next.length)
        {
            directChildren.push({
                items: item.next,
                box: MeasureItems(item.next)
            });
        }
    }

    if(directChildren.length)
    {
        const allChildrenHeight = directChildren.reduce((prev, cur) => {
            return prev + cur.box.height;
        }, 0) + ((directChildren.length - 1) * vspacing);

        let top = (box.top + (box.height / 2)) - (allChildrenHeight / 2);
        const moveLeft = (box.width) + hspacing;
        box.top = Math.min(box.top, top);

        for(const child of directChildren)
        {
            moveItems(child.items, moveLeft, top);
            top += child.box.height + vspacing;
        }
        box.height = Math.max(box.height, allChildrenHeight);
        box.width = box.width + directChildren.reduce((prev, cur)=> Math.max(prev, cur.box.width), 0) + hspacing;
    }

    return box;
}

function Convert(x: number, y: number, elements: Element[]) : SvgItem[]
{
    let items:SvgItem[] = [];
    let current_x = 0;
    let current_y = 0;

    for(const element of elements)
    {
        const size = measureString(element.text);
        let item : SvgItem = {
            text: element.text,
            type: element.type,
            x: current_x,
            y: current_y,
            width: size.width,
            height: size.height,
            next: []
        }
        items.push(item);
        if(element.children)
        {
            const subItems = Convert(x, y, element.children);
        }
        y += size.height;
    }

    return items;
}

export { Convert, MeasureItems };