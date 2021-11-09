enum ElementType {
    Root,
    View,
    Action,
}

interface Element {
    text: string;
    type: ElementType;
    children: Element[];
}

interface SvgItem {
    text: string;
    type: ElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    next: SvgItem[];
}

interface Size {
    width: number;
    height: number;
}

interface BoundingBox {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

interface ItemsWithBox {
    items: SvgItem[];
    box: BoundingBox;
}

export { ElementType };
export type { Element, SvgItem, Size, BoundingBox, ItemsWithBox };
