import {
    ElementType,
    Element,
    SvgItem,
    Size,
    BoundingBox,
    ItemsWithBox,
} from "./parsertypes";

const vspacing = 10;
const hspacing = 30;
const char_width = 8;
const line_height = 20;

function measureString(text: string): Size {

    return {
        width: char_width * text.length,
        height: line_height,
    };
}

function moveItems(items: SvgItem[], dx: number, dy: number) {
    for (const item of items) {
        item.x += dx;
        item.y += dy;
        moveItems(item.next, dx, dy);
    }
}

function measureAndMoveItems(items: SvgItem[]): BoundingBox {
    let box: BoundingBox = {
        left: 9999999,
        top: 9999999,
        bottom: -9999999,
        right: -9999999,
    };
    let directChildren = [];

    for (const item of items) {
        box.left = Math.min(box.left, item.x);
        box.top = Math.min(box.top, item.y);
        box.right = Math.max(box.right, item.width + item.x);
        box.bottom = Math.max(item.height + item.y, box.bottom);

        if (item.next.length) {
            directChildren.push({
                items: item.next,
                box: measureAndMoveItems(item.next),
            });
        }
    }

    if (directChildren.length) {
        const allChildrenHeight =
            directChildren.reduce((prev, cur) => {
                return prev + cur.box.bottom - cur.box.top;
            }, 0) +
            (directChildren.length - 1) * vspacing;

        let moveUpDown = (box.top + box.bottom) / 2 - (allChildrenHeight / 2);
        const moveLeft = box.right + hspacing;

        for (const childGroup of directChildren) {
            moveItems(childGroup.items, moveLeft, moveUpDown);

            moveUpDown +=  vspacing + (childGroup.box.bottom - childGroup.box.top);

            const newSize = measureAll(childGroup.items);
            box.left = Math.min(box.left, newSize.left);
            box.top = Math.min(box.top, newSize.top);
            box.right = Math.max(box.right, newSize.right);
            box.bottom = Math.max(box.bottom, newSize.bottom);
        }
    }

    return box;
}

function measureAll(items: SvgItem[]) {
    const box = {
        left: 99999,
        top: 99999,
        right: -99999,
        bottom: -99999
    }

    for(const item of items)
    {
        const underling = measureAll(item.next);
        box.left = Math.min(box.left, item.x, underling.left);
        box.top = Math.min(box.top, item.y, underling.top);
        box.right = Math.max(box.right, item.x + item.width, underling.right);
        box.bottom = Math.max(box.bottom, item.y + item.height, underling.bottom);
    }

    return box;
}

function convert(x: number, y: number, elements: Element[]): ItemsWithBox {
    let items: SvgItem[] = [];
    let current_x = x;
    let current_y = y;

    for (const element of elements) {
        const size = measureString(element.text);
        let item: SvgItem = {
            text: element.text,
            type: element.type,
            x: current_x,
            y: current_y,
            width: size.width,
            height: size.height,
            next: [],
        };
        current_y += size.height;
        items.push(item);

        if (element.children) {
            if (item.type === ElementType.View) {
                const { items: subItems } = convert(
                    current_x,
                    current_y,
                    element.children,
                );
                items.push(...subItems);
            } else {
                const { items: subItems } = convert(x, y, element.children);
                item.next = subItems;
            }
        }
    }

    const box = measureAndMoveItems(items);
    return { items, box };
}

export { convert, measureAndMoveItems, hspacing, vspacing, char_width, line_height };
